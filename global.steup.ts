const {cleanupTestData} = require('./playwright/support/database/db');
module.exports = async () => {
    console.log('Iniciando limpeza de dados de teste...');
    await cleanupTestData();
}