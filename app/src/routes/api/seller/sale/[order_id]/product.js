import db from '$lib/db';

export async function post({ request, locals, params }) {
	let { item } = await request.json();

	let { rows } = await db.query(
		`
            WITH insert_product AS 
            (
                INSERT INTO     order_product(order_id,product_id, amount,price)
                SELECT          $1, $2, $3, a.price
				FROM 			"product" a
                WHERE NOT EXISTS (SELECT 1 FROM order_product WHERE order_id = $1 AND product_id = $2 )
				AND 			a.product_id = $2
                RETURNING       *
            )
            SELECT  a.*,b.*
            FROM    insert_product b
            JOIN    product a ON a.product_id = b.product_id


        

    `,
		[params.order_id, item.product_id, item.amount]
	);

	return { body: { product: rows[0] } };
}
export async function put({ request, locals, params }) {
	let { item } = await request.json();

	let { rows } = await db.query(
		`
        UPDATE  order_product AS a
        SET     amount = $1
		FROM 	"order" AS b
		WHERE 	a.order_id = b.order_id
        AND   	order_product_id = $2
		AND		b.completed = false
	`,
		[item.amount, item.order_product_id]
	);

	return { body: { product: '1' } };
}
export async function del({ request, locals, url }) {
	// let data = await request.json();

	const id = url.searchParams.get('id');
	let { rows } = await db.query(
		`
        DELETE  FROM order_product
        WHERE   order_product_id = $1

	`,
		[id]
	);
	return { body: '' };
}
