import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";

class UserTokensRepository implements IUserTokensRepository{
    private repository: Repository<UserTokens>

    constructor() {
        this.repository = getRepository(UserTokens);
    }

    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
       const userToken = this.repository.create({
        expires_date,
        refresh_token,
        user_id
       });

       await this.repository.save(userToken);

       return userToken;
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        const users_token = await this.repository.findOne({
            user_id,
            refresh_token
        });

        return users_token;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }

}

export { UserTokensRepository }