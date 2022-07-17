import db from '$lib/db';

export async function get({ locals, url }) {
	let { user } = locals;
	let search = url.searchParams.get('search');

	let { rows } = await db.query(
		`
            SELECT *, 1 as amount
            FROM   product a
            WHERE  SIMILARITY(a.name,$1) > 0.2
            OR     SIMILARITY("desc",$1) > 0.2
            OR    SIMILARITY(brand,$1) > 0.2
    `,
		[search]
	);

	return {
		body: {
			products: rows
		}
	};
}

