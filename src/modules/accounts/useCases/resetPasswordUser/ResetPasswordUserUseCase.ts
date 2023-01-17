import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

interface IRequest {
    token: string;
    password: string
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUserTokensRepository,

        @inject("DayJsDateProvider")
        private dayJsDateProvider: IDateProvider,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    async execute({token, password}: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(token);

        if(!userToken) {
            throw new AppError("Token invalid!")
        };

        if(this.dayJsDateProvider.compareIfBefore(userToken.expires_date, this.dayJsDateProvider.dateNow())){
            throw new AppError("Token expired!");
        }

        const user = await this.usersRepository.findById(userToken.user_id);
        
        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.usersTokensRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUserUseCase }