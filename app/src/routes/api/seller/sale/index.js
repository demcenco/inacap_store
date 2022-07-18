import db from '$lib/db';

export async function get({ locals, url }) {
	let { user } = locals;
	if (user) {
		let { rows } = await db.query(
			`
		
		WITH current_shift AS 
		(
			SELECT     *
			FROM       "shift"
			WHERE      active = true
		), contar AS 
		(
			SELECT 		count(*) total
			FROM 		"order" a
			JOIN 		current_shift USING (shift_id)
			WHERE 		a.user_id = $1 
		), obtener AS 
		(
			SELECT 		*
			FROM 		"order" a
			JOIN 		current_shift USING (shift_id)
			WHERE 		a.user_id = $1
			ORDER BY 	a.created_at
			DESC
			LIMIT $2
			OFFSET ($3 - 1) * $2
		)
		SELECT 	jsonb_agg(obtener) orders,
				total
		FROM 	contar,
				obtener
		GROUP BY total


	`,
			[user.user_id, url.searchParams.get('per_page'), url.searchParams.get('page')]
		);

		return {
			body: rows[0]
		};
	}
	return { body: {} };
}

export async function post({ locals }) {
	let { user } = locals;
	if (user) {
		let { rows } = await db.query(
			`
			INSERT INTO "order" ("user_id","shift_id")
			SELECT      b.user_id, a.shift_id
			FROM        "shift" a
			JOIN        "user" b ON b.user_id = $1
			WHERE       a.active = true
			AND         b.active = true
			RETURNING   order_id
			`,
			[user.user_id]
		);

		return {
			body: {
				order_id: rows[0].order_id
			}
		};
	}
	return { body: {} };
}
