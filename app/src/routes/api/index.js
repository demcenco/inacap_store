import db from '$lib/db';

export async function get({ request, locals, url }) {
	let suma = 2 + 45;
	let wea = url;
	let user = url.searchParams.get('user');

	let { rows } = await db.query(`SELECT * FROM "user" WHERE name  = $1`, [user]);
	return { body: { locals, suma, rows } };
}
