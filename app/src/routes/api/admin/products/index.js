import db from '$lib/db';

export async function post({ request, locals }) {
	try {
		const { producto } = await request.json();
	
		db.query(
			`
		INSERT INTO "product"("name","brand","desc","price")
		SELECT $1,$2,$3,$4
		`,
			[producto.nombre, producto.marca, producto.descripcion, producto.precio]
		);
		return { body: { hello: 'world' } };
	} catch (error) {
		return { body: { hello: 'world' } };
	}
}

export async function put({ locals, url, request }) {
	const { product } = await request.json();
	const { name, desc, brand, price, product_id } = product;
	await db.query(
		`
			UPDATE 		"product" a
			SET 		"name" 	= $1,
						"desc" 	= $2,
						"brand" = $3,
						"price" = $4
			WHERE 		a.product_id = $5
	`,
		[name, desc, brand, price, product_id]
	);
	return {
		body: {
			product: '1'
		}
	};
}
export async function del({ locals, url }) {
	let product_id = url.searchParams.get('product_id');

	await db.query(
		`
			DELETE FROM "product" WHERE product_id = $1
	`,
		[product_id]
	);
	return {
		body: {
			product: 'asd'
		}
	};
}
