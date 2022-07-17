export async function get({ request, locals, url }) {
	console.log(process.env.DB_PASSWORD);
	let user = url.searchParams.get('user');

	return { body: { hello: 'world' } };
}
