import db from '$lib/db';
function queryData(params) {
	let object = {};
	for (const [key, value] of params.entries()) {
		object[key] = value;
	}
	return object;
}
export async function get({ url }) {
	const query = queryData(url.searchParams);

	const { rows } = await db.query(
		/*sql*/ `
        WITH main_data AS 
        (
            SELECT      b.closed_at::date,
                        count(a.*) FILTER ( WHERE completed = true) total_ventas,
                        count(a.*) FILTER ( WHERE b.bussiness_id IS NOT NULL) facturas,
                        count(a.*) FILTER ( WHERE b.bussiness_id IS NULL) boletas
            FROM        "order" a
            JOIN        "sale"  b USING (order_id)
            WHERE       a.completed = true
            AND         CASE WHEN $1::int != 0 THEN a.user_id = $1 ELSE true END
            AND         b.closed_at::date BETWEEN $4::date AND $5::date
            GROUP BY    b.closed_at::date
            ORDER BY    b.closed_at::date        DESC
            LIMIT       $2
            OFFSET      ($3 - 1) * $2
        ), main_agg AS 
        (
            SELECT  jsonb_agg(main_data) orders 
            FROM    main_data
        ), total_data AS 
        (
			SELECT 		count(*) total
            FROM        (
                SELECT      b.closed_at::date
                FROM        "order" a
                JOIN        "sale"  b USING (order_id)
                WHERE       a.completed = true
                AND         CASE WHEN $1::int != 0 THEN a.user_id = $1 ELSE true END
                AND         b.closed_at::date BETWEEN $4::date AND $5::date
                GROUP BY    b.closed_at::date
            ) t
        ), sellers AS 
        (
            SELECT          jsonb_agg(
                            jsonb_build_object(
                                'user_id', user_id,
                                'seller', b.name || ' ' || b.last_name 
                            )) data
            FROM            "user" b
            WHERE           user_type = 'seller'
        )
		SELECT 	orders,
                total::int total_items,
                data sellers
		FROM 	total_data,
                main_agg,
                sellers
        


    `,
		[
			query.seller_id,
			query.per_page,
			query.page,
			new Date(query.start_date).toISOString(),
			new Date(query.end_date).toISOString()
		]
	);

	return { body: { data: rows } };
}

// SELECT       b.first_name || ' ' || b.second_name nombre,
// b.user_id,
// count(a.*) FILTER ( WHERE completed = true) total_ventas,
// count(a.*) FILTER ( WHERE sale_type = 'factura') facturas,
// count(a.*) FILTER ( WHERE sale_type = 'boleta') boletas,
// a.created_at::date
// FROM        "order" a
// JOIN        "users"  b USING (user_id)
// WHERE       a.completed = true
// GROUP BY    b.user_id, a.created_at::date
