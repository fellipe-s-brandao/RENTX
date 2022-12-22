import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepositoy";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

@injectable()
class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute(data: IRequest): Promise<Car> {
        const carAlreadyExists = await this.carsRepository.findByLicensePlate(data.license_plate);

        if(carAlreadyExists) {
            throw new AppError("Car already exists!");
        }

        const car = await this.carsRepository.create(data);
        return car;
    }
}

export {CreateCarUseCase}