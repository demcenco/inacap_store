import db from '$lib/db';

export async function get({ request, locals }) {
	const { user } = locals;

	let { rows } = await db.query(
		`
		WITH current_shift AS 
		(
			SELECT     *
			FROM       	"shift" a
			JOIN 		"user" b USING (user_id)
			WHERE      	a.active = true
		), total_sales AS 
		(
			SELECT 		count(*) total, count(*) FILTER ( WHERE completed = true) completed
			FROM 		"order" a
			JOIN 		current_shift b USING (shift_id)
			WHERE 		a.user_id = $1
		)
			SELECT 	to_jsonb(a) shift,
					to_jsonb(b) sales
			FROM 	total_sales b
			LEFT JOIN current_shift a ON true
    `,
		[user.user_id]
	);

	return { body: { shift: rows } };
}
