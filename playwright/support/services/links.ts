import {  APIRequestContext } from "@playwright/test"
import { ILink } from "./repository/links.types";

export const linksService = (request :  APIRequestContext) =>{

    const createLink = async (payload : ILink, token : string) => {
        return await request.post("/api/links", {
            data: payload,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    const createAndReturnLink = async (payload : ILink, token : string) => {
        const response = await createLink(payload, token);
        const {data} =  await response.json();
        return data.id;
    }

    const getLinks = async (token : string) => {
        return await request.get("/api/links", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };

    const removeLink = async (id: string, token: string) => {
        return await request.delete(`/api/links/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };

    return { createLink, getLinks, createAndReturnLink, removeLink };
}