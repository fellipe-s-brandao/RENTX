import auth from "@config/auth"
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"
import { sign, verify } from "jsonwebtoken" 
import { inject } from "tsyringe"

interface IPayload {
    sub: string,
    email: string
}

class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUserTokensRepository,

        @inject("DayJsDateProvider")
        private dayJsDateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<string> {
        const { sub, email } = verify(token, auth.secret_refresh_token) as IPayload;
        
        const user_id = sub;

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

        if(!userToken) {
            throw new AppError("Refresh Token does not exists!")
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token
        })

        const refresh_token_expires_date = this.dayJsDateProvider.addDays(auth.expires_in_refresh_token_days);

        await this.usersTokensRepository.create({
            user_id: sub,
            refresh_token,
            expires_date: refresh_token_expires_date,
        })

        return refresh_token;

    }
}

export { RefreshTokenUseCase }