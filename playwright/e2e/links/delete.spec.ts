import { expect, test } from '../../support/fixtures/index.ts';
import { getUserWithLinks } from '../../support/factories/user.ts';
import { IUser } from '../../support/services/repository/user.types.ts';
import { gerarULID } from '../../support/utils/generateULID.ts';

test.describe("DELETE /links/:id", () => {

    const user = getUserWithLinks(1);
    let token : string;

    test.beforeEach( async ({auth}) => {
        const userCredentials : IUser = {
            email: user.email,
            password: user.password,
            name: user.name
        };
        
        await auth.createUser(userCredentials);
        token = await auth.getToken({ email: user.email, password: user.password });
    });

    test("Deve deletar um link encurtado com sucesso", async ({ link, auth }) => {
        const linkId = await link.createAndReturnLink(user.links[0], token);

        const response = await link.removeLink(linkId, token);
        expect(response.status()).toBe(200);

        const { message } = await response.json();
        expect(message).toBe("Link excluído com sucesso");

    });

    test("Nao deve deletar um link com id inválido", async ({ link, auth }) => {
        const linkId = gerarULID();

        const response = await link.removeLink(linkId, token);
        expect(response.status()).toBe(404);

        const { message } = await response.json();
        expect(message).toBe("Link não encontrado");
    });
});