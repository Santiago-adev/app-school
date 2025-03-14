import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'colegios',
    password: process.env.DB_PASSWORD || '1234',
    port: Number(process.env.DB_PORT) || 5433,
});

export default pool;
