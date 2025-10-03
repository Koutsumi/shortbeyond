import { expect, test } from '@playwright/test';
import { authService } from '../../support/services/auth';
import { IAuth } from '../../support/services/repository/auth.types';
import { getUser } from '../../support/factories/user';
import { IUser } from '../../support/services/repository/user.types';

test.describe("POST /auth/login", () => {

    let auth : any;

    test.beforeEach( ( { request } ) => {
        auth = authService(request);
    });

    test("Deve autenticar um usuário com sucesso", async () => {
        const user : IUser = getUser();

        const userCredentials : IAuth = {
            email: user.email,
            password: user.password
        };

        // Pre-request to create the user first
        await auth.createUser(user);

        const res = await auth.login(userCredentials);

        expect(res.status()).toBe(200);
        const body = await res.json();
        expect(body).toHaveProperty("message", "Login realizado com sucesso");
        expect(body.data).toHaveProperty("token");
        expect(body.data).toHaveProperty("user");
        expect(body.data.user).toHaveProperty("id");
        expect(body.data.user).toHaveProperty("name", user.name);
        expect(body.data.user).toHaveProperty("email", user.email);
    });

    test("Não deve autenticar um usuário com senha incorreta", async () => {
        const user : IUser = getUser();

        const userCredentials : IAuth = {
            email: user.email,
            password: "senhaIncorreta123"
        };

        // Pre-request to create the user first
        await auth.createUser(user);

        const res = await auth.login(userCredentials);

        expect(res.status()).toBe(401);
        const body = await res.json();
        expect(body).toHaveProperty("message", "Credenciais inválidas");
    });

    test("Não deve autenticar um usuário com email não cadastrado", async () => {
        const userCredentials : IAuth = {
            email: "email@naocadastrado.com",
            password: "pwd123"
        };

        const res = await auth.login(userCredentials);

        expect(res.status()).toBe(401);
        const body = await res.json();
        expect(body).toHaveProperty("message", "Credenciais inválidas");
    });

    test("Não deve autenticar um usuário quando email não é informado", async () => {

        const userCredentials : IAuth = {
            ////email: user.email,
            password: "senhaIncorreta123"
        };

        const res = await auth.login(userCredentials);

        expect(res.status()).toBe(400);
        const body = await res.json();
        expect(body).toHaveProperty("message", "O campo 'Email' é obrigatório");
    });

    test("Não deve autenticar um usuário quando password não é informado", async () => {

        const userCredentials : IAuth = {
            email: "fernanda@bacarini.dev",
            ////password: "senhaIncorreta123"
        };

        const res = await auth.login(userCredentials);

        expect(res.status()).toBe(400);
        const body = await res.json();
        expect(body).toHaveProperty("message", "O campo 'Password' é obrigatório");
    });

});
