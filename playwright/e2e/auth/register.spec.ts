import { expect, test } from '@playwright/test';
import { getUser } from '../../support/factories/user';
import { authService } from '../../support/services/auth';

test.describe("POST /auth/register", () => {

    let auth : any;

    test.beforeEach( ( { request } ) => {
        auth = authService(request);
    });

    test("Deve registrar um novo usuário com sucesso", async ( { request } ) => {

        const user = getUser();

        const res = await auth.createUser(user);

        expect(res.status()).toBe(201);
        const body = await res.json();
        expect(body).toHaveProperty("message", "Usuário cadastrado com sucesso!");
        expect(body.user).toHaveProperty("id");
        expect(body.user).toHaveProperty("name", user.name);
        expect(body.user).toHaveProperty("email", user.email);
        expect(body.user).not.toHaveProperty("password");
    });

    test("Não deve registrar um usuário com email já existente", async ( { request } ) => {
        const user = getUser();

        // Pre-request to create the user first

        await auth.createUser(user);

        const res = await auth.createUser(user);

        expect(res.status()).toBe(400);
        const body = await res.json();
        expect(body).toHaveProperty("message", "Este e-mail já está em uso. Por favor, tente outro.");
    });

    test("Não deve registrar um usuário quando e-mail incorreto", async ( { request } ) => {
        const user = {
            name: `Fernanda Bacarini`,
            email: "fernanda&bacarini.dev",
            password: "pwd123"  
        }

        const res = await request.post("http://localhost:3333/api/auth/register", {
            data: user
        });

        expect(res.status()).toBe(400);
        const body = await res.json();
        expect(body).toHaveProperty("message", "O campo \'Email\' deve ser um email válido");
    });

    test("Não deve registrar um usuário quando name não é informado", async ( { request } ) => {
        const user = {
            ////name: `Fernanda Bacarini`,
            email: "fernanda@bacarini.dev",
            password: "pwd123"  
        }

        const res = await auth.createUser(user);

        expect(res.status()).toBe(400);
        const body = await res.json();
        expect(body).toHaveProperty("message", "O campo \'Name\' é obrigatório");
    });

    test("Não deve registrar um usuário quando password não é informado", async ( { request } ) => {
        const user = {
            name: `Fernanda Bacarini`,
            email: "fernanda@bacarini.dev",
            ////password: "pwd123"  
        }

        const res = await auth.createUser(user);

        expect(res.status()).toBe(400);
        const body = await res.json();
        expect(body).toHaveProperty("message", "O campo \'Password\' é obrigatório");
    });

    test("Não deve registrar um usuário quando email não é informado", async ( { request } ) => {
        const user = {
            name: `Fernanda Bacarini`,
            ////email: "fernanda&bacarini.dev",
            password: "pwd123"  
        }

        const res = await auth.createUser(user);

        expect(res.status()).toBe(400);
        const body = await res.json();
        expect(body).toHaveProperty("message", "O campo \'Email\' é obrigatório");
    });
});