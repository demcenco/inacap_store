import db from '$lib/db';

export async function get() {
	let { rows } = await db.query(`
    SELECT  name,last_name,email,rut, user_type, active
    FROM    "user"
	ORDER BY created_at
	DESC
    `);

	return {
		body: {
			users: rows
		}
	};
}

export async function put({ request }) {
	let data = await request.json();

	await db.query('UPDATE "user" SET active = $1, user_type = $2 WHERE rut = $3', [
		data.active,
		data.user_type,
		data.rut
	]);
	return {
		body: {
			data: 1
		}
	};
}
