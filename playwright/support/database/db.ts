import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER ,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
});

// Função para remover links e usuários com domínio Fernanda.dev
async function cleanupTestData() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const query = `
      WITH usuarios_para_remover AS (
        SELECT id FROM users WHERE email ILIKE '%@fernanda.dev'
      ),
      links_removidos AS (
        DELETE FROM links
        WHERE user_id IN (SELECT id FROM usuarios_para_remover)
      )
      DELETE FROM users
      WHERE id IN (SELECT id FROM usuarios_para_remover);
    `;

    await client.query(query);
    await client.query('COMMIT');
    console.log('Limpeza concluída com sucesso.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Erro durante a limpeza:', err);
  } finally {
    client.release();
  }
}

module.exports = {
  cleanupTestData,
};