import db from '$lib/db';

export async function get({ locals, params }) {
	let { user } = locals;
	const { rows } = await db.query(
		`
		WITH productos AS (
            SELECT  array_agg(a) products
            FROM    order_product_v a
            WHERE   order_id = $2
        ),  factura AS 
        (
            SELECT  array_agg(c.*) sale
            FROM    "order" a
            JOIN    "sale" b  USING (order_id)
            JOIN    "bussiness" c ON c.bussiness_id = b.bussiness_id
            WHERE   b.order_id = $2
        ), final AS 
        (
            SELECT  "a".*, 
                    COALESCE("b"."products", '{}') "products",
                    COALESCE("c"."sale", '{}') "sale"
            FROM    "order" a,
                    "productos" "b",
                    "factura" "c"
            WHERE   "user_id" = $1
            AND     "order_id" = $2
        )
        SELECT  to_jsonb("a") as "order"
        FROM    "final" "a"
 
	`,
		[user.user_id, params.order_id]
	);

	return {
		body: {
			order: rows[0].order
		}
	};
}

export async function post({ locals, params, request }) {
	let { user } = locals;
	let { sale_type, bussiness } = await request.json();
	let { order_id } = params;
	let datos;
	let verificate = await db.query(
		`
    SELECT 			order_id
    FROM 			order_product a
    WHERE 			order_id = $1
    GROUP BY 		order_id
    HAVING 			count(*) > 0`,
		[order_id]
	);

	if (verificate.rows.length) {
		if (sale_type == 'Factura') {
			let { rows } = await db.query(
				`
                WITH insertar_negocio AS 
                (
                    INSERT INTO         "bussiness"(name,rut,type,address)
                    SELECT              $1,$2,$3,$4
                    ON CONFLICT         (rut)
                    DO UPDATE SET       name=EXCLUDED.name 
                    RETURNING           bussiness_id
                ), registersale AS 
                (

                    INSERT INTO "sale"( order_id,total,bussiness_id)
                    SELECT       $5, sum(b.price * b.amount), a.bussiness_id
                    FROM        insertar_negocio a,
                                order_product_v b
                    WHERE       NOT EXISTS 
                    (
                        SELECT  true
                        FROM    "sale"
                        WHERE   order_id = $5
                        )
                    GROUP BY $5 ,a.bussiness_id
                        RETURNING   *
                )
                UPDATE  "order"
                SET      completed = true,
                            updated_at = NOW()
                FROM    registersale 
                WHERE   "order"."order_id" = registersale.order_id
                RETURNING *

    `,
				[bussiness.name, bussiness.rut, bussiness.type, bussiness.address, order_id]
			);
			datos = rows;
		} else {
			let { rows } = await db.query(
				`
            WITH insertsale AS 
            (
                INSERT INTO "sale"( order_id,total)
                SELECT       $1, sum(b.price * b.amount)
                FROM        order_product_v b
                WHERE       NOT EXISTS 
                (
                    SELECT  true
                    FROM    "sale"
                    WHERE   order_id = $1
                    )
                GROUP BY $1
                    RETURNING   *
            )
            UPDATE      "order"
            SET         completed = true,
            updated_at = NOW()
            FROM        insertsale
            WHERE       "order"."order_id" = insertsale.order_id
            RETURNING   *


    `,
				[order_id]
			);
			datos = rows;
		}
	} else {
		return {
			body: {
				order: []
			}
		};
	}

	return {
		body: {
			order: datos
		}
	};
}
