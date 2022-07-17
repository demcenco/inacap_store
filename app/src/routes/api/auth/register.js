import db from '$lib/db';
import bcryptjs from 'bcryptjs';
import * as yup from 'yup';
import { validate } from 'rut.js';

const schema = yup.object().shape({
	name: yup
		.string()
		.matches(/^[aA-zZ\s]+$/, 'El nombre no puede incluir numeros')
		.min(1, 'Su nombre debe tener minimo 1 caracter')
		.max(40, 'Su nombre no puede exceder 40 caracteres')
		.required('Su nombre es obligatorio')
		.trim(),
	second_name: yup
		.string()
		.matches(/^[aA-zZ\s]+$/, 'El apellido no puede incluir numeros')
		.min(1)
		.max(40)
		.required()
		.trim(),
	email: yup.string().email(),
	rut: yup.string().test('rut-valido', 'El RUT es invalido', function (value) {
		const { path, createError } = this;
		return validate(value) || createError({ path, message: 'El RUT es invalido' });
	}),
	password: yup.string().min(6).max(40).required(),
	repeat_password: yup.string().min(6).max(40).required()
});

export async function post({ request }) {
	try {
		let { user } = await request.json();

		const value = await schema.validate(user);

		let {
			rows: [credentials]
		} = await db.query(
			`
		SELECT  *
		FROM    "user"
		WHERE   email    = $1
		OR      rut      = $2
		`,
			[user.email, user.rut]
		);
		let encrypted_password = await bcryptjs.hash(user.password, 10);
		if (credentials) {
			return { status: 400, body: { errors: ['Correo o RUT ya registrado'] } };
		}
		let rows = await db.query(
			`
		INSERT INTO "user" (name, last_name, password, email, rut,user_type)
		SELECT  $1,$2,$3,$4,$5 ,'seller'
		`,
			[user.name, user.second_name, encrypted_password, user.email, user.rut]
		);
		return {
			body: { user: 'hola' }
		};
	} catch (error) {

		return {
			body: { errors: error.errors }
		};
	}
}
