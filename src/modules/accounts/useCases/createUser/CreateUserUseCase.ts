import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from 'bcrypt'

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ){}

    async execute(data: ICreateUserDTO): Promise<void> {

        const userAlreadyExists = await this.userRepository.findByEmail(data.email);

        if(userAlreadyExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(data.password, 8);

        await this.userRepository.create({
            name: data.name,
            email: data.email,
            driver_license: data.driver_license,
            password: passwordHash
        })
    }
}

export { CreateUserUseCase }