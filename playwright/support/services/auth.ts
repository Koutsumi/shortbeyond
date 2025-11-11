import {  APIRequestContext } from "@playwright/test"
import { IAuth } from "./repository/auth.types";
import { IUser } from "./repository/user.types";

export const authService = (request :  APIRequestContext) =>{

    const createUser = async (user : IUser) => {
        return await request.post("/api/auth/register", {
            data: user
        });
    }

    const login = async (auth : IAuth) => {
        return await request.post("/api/auth/login", {
            data: auth
        });
    }

    const getToken = async (auth : IAuth) => {
        const res = await login(auth);
        const body = await res.json();

        return body.data.token;
    }

    return { createUser, login, getToken };
}