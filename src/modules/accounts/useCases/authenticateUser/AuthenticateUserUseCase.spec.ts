import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "1651651",
            email: "test@tes.com",
            password: "123465",
            name: "test"
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user",async () => {
        await expect( authenticateUserUseCase.execute({
                email: 'false@email.com',
                password: '1555'
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    })

    it("should not be able to authenticate with incorrect password", async () => {
        const user: ICreateUserDTO = {
            driver_license: "1651651",
            email: "test@tes.com",
            password: "123465",
            name: "test"
        };

        await createUserUseCase.execute(user);

        await expect(authenticateUserUseCase.execute({
                email: 'test@tes.com',
                password: '1'
            })
        ).toEqual(new AppError("Email or password incorrect!"));
    })
})