import db from '$lib/db';
import * as yup from 'yup';
const insertSchema = yup.object().shape({
	nombre: yup.string().required('Debe ingresar el nombre del producto').max(100),
	marca: yup.string().required('Debe ingresar la marca del producto').max(100),
	descripcion: yup.string().required('Debe ingresar la descripcion del producto').max(100),
	precio: yup
		.number('El precio debe ser un numero')
		.min(10, 'Valor minimo es de 10 pesos')
		.positive('El precio debe ser un numero positivo')
		.integer('El Precio debe ser un numero entero')
		.required('Debe ingresar el precio')
		.typeError('El precio debe ser un numero entero')
});
export async function post({ request, locals }) {
	const { producto } = await request.json();

	try {
		await insertSchema.validateSync(producto);
		if (await locals.user) {
			db.query(
				`
		INSERT INTO "product"("name","brand","desc","price")
		SELECT $1,$2,$3,$4
		`,
				[producto.nombre, producto.marca, producto.descripcion, producto.precio]
			);
			return { body: { hello: 'world' } };
		}
		return { body: {} };
	} catch (error) {
		return { body: { error: error.errors[0] } };
	}
}

export async function put({ locals, url, request }) {
	const { product } = await request.json();
	try {
		const { name, desc, brand, price, product_id } = product;
		await insertSchema.validateSync({
			nombre: name,
			marca: brand,
			descripcion: desc,
			precio: price
		});
		if (locals.user) {
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
		return { body: {} };
	} catch (error) {
		return { body: { error: error.errors[0] } };
	}
}
export async function del({ locals, url }) {
	if (locals.user) {
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
	return { body: {} };
}
