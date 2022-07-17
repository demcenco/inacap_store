import db from '$lib/db';
function queryData(params) {
	let object = {};
	for (const [key, value] of params.entries()) {
		object[key] = value;
	}
	return object;
}
export async function get({ request, url }) {
	const query = queryData(url.searchParams);

	const { rows } = await db.query(
		`
    SELECT      a.order_id, 
                d.closed_at::date,
                b.name || ' ' || b.last_name seller,  
                d.bussiness_id,
                SUM(c.price * c.amount) total_sale
    FROM        "order" a
    JOIN        "user" b USING(user_id)
    JOIN        "order_product_v" c USING (order_id)
    JOIN        "sale" d USING (order_id)
    WHERE       d.closed_at::date = $1
    AND         completed = true
    AND         CASE WHEN $2::int != 0 THEN b.user_id = $2 ELSE true END
    GROUP BY    a.order_id, 
                b.name, 
                b.last_name,
                d.closed_at::date,
                d.bussiness_id
    `,
		[query.date, query.seller_id]
	);

	return { body: { data: rows } };
}
// SELECT      a.order_id,
//             a.sale_type,
//             b.name || ' ' || b.last_name seller,
//             SUM(c.price * c.amount)
// FROM        "order" a
// JOIN        "users" b USING(user_id)
// JOIN        "order_product" c USING (order_id)
// WHERE       created_at::date = '2022-07-13T04:00:00.000Z'
// AND         completed = true
// GROUP BY    a.order_id,
//             b.name,
//             b.last_name,
//             a.sale_type

// SELECT       b.name || ' ' || b.last_name nombre,
// b.user_id,
// count(a.*) FILTER ( WHERE completed = true) total_ventas,
// count(a.*) FILTER ( WHERE sale_type = 'factura') facturas,
// count(a.*) FILTER ( WHERE sale_type = 'boleta') boletas,
// a.created_at::date
// FROM        "order" a
// JOIN        "users"  b USING (user_id)
// WHERE       a.completed = true
// GROUP BY    b.user_id, a.created_at::date
