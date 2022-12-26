import { IRentalsRepository } from "@modules/rentasls/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_reutn_date: Date
}

class CreateRentalUseCase {
    constructor(
        private rentalsRepository: IRentalsRepository
    ){}

    async execute({car_id, user_id}: IRequest): Promise<void> {
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if(carUnavailable) {
            throw new AppError("Car is unvailable");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

        if(rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user");
        }
    }
}

export { CreateRentalUseCase }