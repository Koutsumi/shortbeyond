import { expect, test } from '../../support/fixtures/index.ts';
import { getUserWithLinks } from '../../support/factories/user.ts';
import { IUser } from '../../support/services/repository/user.types.ts';

test.describe("GET /links", () => {
    
    test("Deve retornar uma lista de links pré-encurtadas", async ({ link, auth }) => {
        const user = getUserWithLinks(5);

        const userCredentials : IUser = {
            email: user.email,
            password: user.password,
            name: user.name
        };

        await auth.createUser(userCredentials);
        const token = await auth.getToken({ email: user.email, password: user.password });

        for (const linkData of user.links) {
            await link.createLink(linkData, token);
        }

        const response = await link.getLinks(token);
        expect(response.status()).toBe(200);
        
        const { count, data, message } = await response.json();
        
        expect(message).toBe("Links Encurtados");
        expect(count).toBe(user.links.length);
        expect(data).toHaveLength(user.links.length);

        for(const [index, link] of data.entries()) {
            expect(link).toHaveProperty('id');
            expect(link).toHaveProperty('original_url', user.links[index].original_url);
            expect(link).toHaveProperty('short_code');
            expect(link.short_code).toMatch(/^[a-zA-Z0-9]{5}$/);
            expect(link).toHaveProperty('title', user.links[index].title);
        }
    });

    test("Deve retornar uma lista vazia quando o usuário não tiver links encurtados", async ({ link, auth }) => {
        const user = getUserWithLinks(0);

        const userCredentials : IUser = {
            email: user.email,
            password: user.password,
            name: user.name
        };

        await auth.createUser(userCredentials);
        const token = await auth.getToken({ email: user.email, password: user.password });

        for (const linkData of user.links) {
            await link.createLink(linkData, token);
        }

        const response = await link.getLinks(token);
        expect(response.status()).toBe(200);
        
        const { count, data, message } = await response.json();
        
        expect(message).toBe("Links Encurtados");
        expect(count).toBe(user.links.length);
        expect(data).toHaveLength(user.links.length);
    });
});