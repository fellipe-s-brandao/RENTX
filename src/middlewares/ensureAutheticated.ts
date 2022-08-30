import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UserRepository";

interface IPayload {
    sub: string
}


export async function ensureAuthenticated(request: Request,  response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(! authHeader){
        throw new Error("Token missing");
    }

    const [, token] =authHeader.split(" ");
    try {
        const { sub: user_id } = verify(token, "as65sa4d1x5s5s4aa1152ss") as IPayload;

        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);

        if(! user){
            throw new Error("User does not exists");
        }

        next();

    } catch (error) {
        throw new Error("Invalid token!");
    }
}