import { mi_secreto } from '$lib/constants';
import * as cookie from 'cookie';
import jwt from 'jsonwebtoken';

export async function handle({ event, resolve }) {
	try {
		const cookies = cookie.parse(event.request.headers.get('cookie') || '');
		const token = cookies.session_bazar && (await jwt.verify(cookies.session_bazar, mi_secreto));
		event.locals.user = token ? token : null;
	} catch (error) {
		event.locals.user = null;
	}

	return await resolve(event);
}

export function getSession({ locals }) {
	return {
		user: locals.user && {
			username: locals.user.username,
			user_id: locals.user.user_id,
			user_type: locals.user.user_type
		}
	};
}
