import db from '$lib/db';
async function getShift() {
	let { rows } = await db.query('SELECT * FROM shift WHERE active = true LIMIT 1');
	return rows;
}

export async function get() {
	let data = await getShift();
	return {
		body: {
			shift: data
		}
	};
}

export async function post({ locals }) {
	let { user } = locals;
	if (user) {
		let { rows } = await db.query(
			`
			INSERT INTO "shift"("user_id")
			SELECT       user_id
			FROM        "user"
			WHERE       user_type = 'admin'
			AND         user_id = $1
			RETURNING *

	    `,
			[user.user_id]
		);
		let data = await getShift();

		return { body: { data } };
	}
	return { body: {} };
}

export async function put({ request, locals }) {
	let { shift_id } = await request.json();
	if (locals.user) {
		let { rows } = await db.query(
			`
			UPDATE "shift"
			SET     active = false,
			updated_at = NOW()
			WHERE   shift_id = $1
			RETURNING *

			`,
			[shift_id]
		);
		let data = await getShift();
		return { body: { data } };
	}
	return { body: {} };
}
