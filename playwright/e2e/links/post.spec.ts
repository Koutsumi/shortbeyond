import { test, expect } from '../../support/fixtures/index.ts';
import { getUser } from '../../support/factories/user';
import { IUser } from '../../support/services/repository/user.types';
import { IAuth } from '../../support/services/repository/auth.types';
import { getLink } from '../../support/factories/links';

test.describe("POST /api/links", () => {
    let token : string;
    const linksData = getLink();
    
    const user : IUser = getUser();

    const userCredentials : IAuth = {
        email: user.email,
        password: user.password
    };

    test.beforeEach( async ( { auth } ) => {
        // Pre-request to create the user first
        await auth.createUser(user);
        token = await auth.getToken(userCredentials);
    });

    test("Deve encurtar um novo link com sucesso", async ({link}) => {
        
        const res = await link.createLink(linksData, token);

        expect(res.status()).toBe(201);

        const {data, message} = await res.json();
        expect(data).toHaveProperty('id');
        expect(data).toHaveProperty('original_url', linksData.original_url);
        expect(data).toHaveProperty('title', linksData.title);
        expect(data.short_code).toMatch(/^[a-zA-Z0-9]{5}$/);
        expect(message).toBe('Link criado com sucesso')
    });

    test("Nao deve encurtar um link sem o campo original_url", async ({link}) => {
        const res = await link.createLink({...linksData, original_url: ''}, token);

        expect(res.status()).toBe(400);

        const {message} = await res.json();
        expect(message).toBe("O campo 'OriginalURL' é obrigatório");
    });

    test("Nao deve encurtar um link sem o campo title", async ({link}) => {
        const res = await link.createLink({...linksData, title: ''}, token);

        expect(res.status()).toBe(400);

        const {message} = await res.json();
        expect(message).toBe("O campo 'Title' é obrigatório");
    });

    test("Nao deve encurtar um link com original_url inválida", async ({link}) => {
        const res = await link.createLink({...linksData, original_url: 'teste@teste.com'}, token);

        expect(res.status()).toBe(400);

        const {message} = await res.json();
        expect(message).toBe("O campo 'OriginalURL' deve ser uma URL válida");
    });
});