import { expect, test } from '@playwright/test';
import { authService } from '../../support/services/auth';
import { linksService } from '../../support/services/links';
import { getUser } from '../../support/factories/user';
import { IUser } from '../../support/services/repository/user.types';
import { IAuth } from '../../support/services/repository/auth.types';
import { faker } from '@faker-js/faker';

test.describe("POST /api/links", () => {
    let token : string;
    let auth : any;
    let link: any;
    
    const user : IUser = getUser();

    const userCredentials : IAuth = {
        email: user.email,
        password: user.password
    };

    test.beforeEach( async ( { request } ) => {
        auth = authService(request);
        link = linksService(request);
        
        // Pre-request to create the user first
        await auth.createUser(user);
        token = await auth.getToken(userCredentials);
    });

    test("Deve encurtar um novo link com sucesso", async () => {

        const linksData = {
            original_url: `${faker.internet.url()}`,
            title: `${faker.music.songName()}`
        }
        
        const res = await link.createLink(linksData, token);

        expect(res.status()).toBe(201);

        const {data, message} = await res.json();
        expect(data).toHaveProperty('id');
        expect(data).toHaveProperty('original_url', linksData.original_url);
        expect(data).toHaveProperty('title', linksData.title);
        expect(data.short_code).toMatch(/^[a-zA-Z0-9]{5}$/);
        expect(message).toBe('Link criado com sucesso')
    });
});