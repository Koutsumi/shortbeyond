import {  APIRequestContext } from "@playwright/test"
import { IAuth } from "./repository/auth.types";
import { IUser } from "./repository/user.types";

export const authService = (request :  APIRequestContext) =>{

    const createUser = async (user : IUser) => {
        return await request.post("http://localhost:3333/api/auth/register", {
            data: user
        });
    }

    const login = async (auth : IAuth) => {
        return await request.post("http://localhost:3333/api/auth/login", {
            data: auth
        });
    }

    return { createUser, login };
}