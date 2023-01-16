import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { resolve } from "path";

@injectable()
class SendForgotPasswordMailUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUserTokensRepository,

        @inject("DayJsDateProvider")
        private dayJsDateProvider: IDateProvider,

        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider
    ) { }

    async execute(email: string) {
        const user = await this.usersRepository.findByEmail(email);

        const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs")

        if (!user) {
            throw new AppError("User does not exists!");
        }

        const token = uuidV4();

        const expires_date = this.dayJsDateProvider.addHours(3);

        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date,
        });

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_PASSWORD}${token}`
        };

        await this.mailProvider.sendEmail(
                email, 
                "Recuperação de senha",
                variables,
                templatePath
            );

    }
}

export { SendForgotPasswordMailUseCase }