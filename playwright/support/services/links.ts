import {  APIRequestContext } from "@playwright/test"
import { ILink } from "./repository/links.types";

export const linksService = (request :  APIRequestContext) =>{

    const createLink = async (payload : ILink, token : string) => {
        return await request.post("http://localhost:3333/api/links", {
            data: payload,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return { createLink };
}