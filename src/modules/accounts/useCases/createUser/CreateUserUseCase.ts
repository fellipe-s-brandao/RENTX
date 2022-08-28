import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ){}

    async execute(data: ICreateUserDTO): Promise<void> {
        await this.userRepository.create({
            name: data.name,
            username: data.username,
            email: data.email,
            driver_license: data.driver_license,
            password: data.password
        })
    }
}

export { CreateUserUseCase }