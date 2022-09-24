import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";


class UsersRepository implements IUsersRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User);
    }
    
    async create(data: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name: data.name,
            email: data.email,
            driver_license: data.driver_license,
            password: data.password,
            avatar: data.avatar,
            id: data.id
        });
        
        await this.repository.save(user);
    }
    
    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        return user;
    }
}

export { UsersRepository };