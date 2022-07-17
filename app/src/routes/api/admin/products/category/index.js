import db from '$lib/db';

export async function get() {
	const { rows } = await db.query('SELECT * FROM product');

	return { body: { category: rows } };
}
