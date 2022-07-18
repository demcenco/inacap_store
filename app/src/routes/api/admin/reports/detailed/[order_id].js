import db from '$lib/db';

export async function get({ request, params, locals }) {
	if (locals.user) {
		const { rows } = await db.query(
			`
        WITH productos AS 
        (

            SELECT      b.product_id, 
            a.amount, 
            a.price,
            b.name
            FROM        "order_product_v" a 
            JOIN        "product" b USING (product_id)
            WHERE       order_id = $1
        ), empresa AS 
        (
            SELECT      a.*
            FROM        sale c
            JOIN        bussiness a USING (bussiness_id)
            JOIN        "order" d USING (order_id)
            WHERE       d.order_id = $1
        )
        SELECT      
        array_agg(to_json(a)) products,
        to_jsonb(b) bussiness
        FROM        productos  a
        LEFT JOIN   empresa b ON 1 = 1
        GROUP BY    b.*

        `,
			[params.order_id]
		);

		return { body: { data: rows } };
	}
	return { body: {} };
}
