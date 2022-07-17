import db from '$lib/db';
import * as yup from 'yup';
let insertSchema = yup.object().shape({
	order_id: yup.number().positive('El ID debe ser positivo').integer(),
	amount: yup
		.number('Solo puede ingresar numeros')
		.typeError('Debe ingresar un numero')
		.integer('Solo se permiten numeros enteros')
		.positive('La cantidad debe ser positiva')
		.min(1, 'La cantidad minima es de 1 unidad')
		.max(99999, 'La cantidad maxima es de 99.999 unidades')
		.required('Debe indicar una cantidad'),
	price: yup.number().required().positive('El precio debe ser positivo').integer()
});


let updateSchema = yup.object().shape({
	order_product_id: yup.number().required().positive('El ID debe ser positivo').integer(),
	amount: yup
		.number('Solo puede ingresar numeros')
		.typeError('Debe ingresar un numero')
		.integer('Solo se permiten numeros enteros')
		.positive('La cantidad debe ser positiva')
		.min(1, 'La cantidad minima es de 1 unidad')
		.max(99999, 'La cantidad maxima es de 99.999 unidades')
		.required('Debe indicar una cantidad')
});
export async function post({ request, locals, params }) {
	let item = await request.json();

	try {
		await insertSchema.validateSync(item);

		let { rows } = await db.query(
			`
				WITH insert_product AS 
				(
					INSERT INTO     order_product(order_id,product_id, amount,price)
					SELECT          $1, $2, $3, a.price
					FROM 			"product" a
					WHERE NOT EXISTS (SELECT 1 FROM order_product WHERE order_id = $1 AND product_id = $2 )
					AND 			a.product_id = $2
					RETURNING       *
				)
				SELECT  a.*,b.*
				FROM    insert_product b
				JOIN    product a ON a.product_id = b.product_id
	
	
			
	
		`,
			[params.order_id, item.product_id, item.amount]
		);

		return { body: { product: rows[0] } };
	} catch (error) {
		return { body: { error: error.errors[0] } };
	}
}
export async function put({ request, locals, params }) {
	let item = await request.json();

	console.log(item);
	try {
		const isValid = await updateSchema.validateSync(item);

		let { rows } = await db.query(
			`
        UPDATE  order_product AS a
        SET     amount = $1
		FROM 	"order" AS b
		WHERE 	a.order_id = b.order_id
        AND   	order_product_id = $2
		AND		b.completed = false
	`,
			[item.amount, item.order_product_id]
		);

		return { body: { product: '1' } };
	} catch (error) {
		return { body: { error: error.errors[0] } };
	}
}
export async function del({ request, locals, url }) {
	// let data = await request.json();

	const id = url.searchParams.get('id');
	let { rows } = await db.query(
		`
        DELETE  FROM order_product
        WHERE   order_product_id = $1

	`,
		[id]
	);
	return { body: '' };
}
