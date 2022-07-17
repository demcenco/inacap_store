import db from '$lib/db';
import bcryptjs from 'bcryptjs';
import { serialize, parse } from 'cookie';
import jwt from 'jsonwebtoken';

let mi_secreto = 'ElBenjaSeLaComeConLosPlatosRotos420_no_scope';

// // Deserializo los datos que trae el formulario

// let cookies = await parse(request.headers.get('cookie'))

// let verify = await jwt.verify(cookies.session_bazar, mi_secreto)


export async function post({ request }) {
	return {
		headers: {
			'Set-Cookie': serialize(
				'session_bazar',
				{},
				{
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					maxAge: -1
				}
			)
		},
		body: {}
	};
}
