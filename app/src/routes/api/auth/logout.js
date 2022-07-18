import { serialize, parse } from 'cookie';

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
