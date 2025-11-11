import { expect, test } from '@playwright/test';

test('Deve verificar se a API está online', async ({ request }) => {
  const response = await request.get('/health');

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.service).toBe('shortbeyond-api');
  expect(body.status).toBe('healthy');
});
