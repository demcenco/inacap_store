import pkg from 'pg';
const { Pool } = pkg;
const db = new Pool({
	user: 'postgres',
	port: 5444,
	host: '129.151.101.49',
	database: 'bazar',
	password: 'inacap123'
});
export default db;