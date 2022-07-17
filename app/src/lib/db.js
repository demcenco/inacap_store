import pkg from 'pg';
const { Pool } = pkg;
const db = new Pool({
	user: 'postgres',
	port: process.env.DB_PORT || 5444,
	host: process.env.DB_HOST || '129.151.101.49',
	database: process.env.DB_DATABASE || 'bazar',
	password: process.env.DB_PASSWORD || 'inacap123'
});
export default db;
