import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UserRepository";

interface IPayload {
    sub: string
}


export async function ensureAuthenticated(request: Request,  response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(! authHeader){
         new AppError("Token missing", 401);
    }

    const [, token] =authHeader.split(" ");
    try {
        const { sub: user_id } = verify(token, "as65sa4d1x5s5s4aa1152ss") as IPayload;

        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);

        if(! user){
            throw new AppError("User does not exists", 401);
        }

        next();

    } catch (error) {
        throw new AppError("Invalid token!", 401);
    }
}