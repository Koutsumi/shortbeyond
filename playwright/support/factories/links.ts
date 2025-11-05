import { faker } from "@faker-js/faker";
import { ILink } from "../services/repository/links.types";

export const getLink = () : ILink => {
    return {
            original_url: `${faker.internet.url()}`,
            title: `${faker.music.songName()}`
    }
}