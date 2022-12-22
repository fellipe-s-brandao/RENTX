import { ICarsRepository } from "@modules/cars/repositories/ICarsRepositoy";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carsReposistory: ICarsRepository,

        private specificationsRepository: ISpecificationsRepository
    ){}

    async execute({ car_id, specifications_id }: IRequest): Promise<void> {
        const carExists =await this.carsReposistory.findById(car_id);

        if(!carExists) {
            throw new AppError("Car dos not exists!");
        }

        const specifications = await this.specificationsRepository.findByIds(specifications_id);

        carExists.specifications = specifications;

        await this.carsReposistory.create(carExists);
        console.log(carExists);
        
    }

}

export { CreateCarSpecificationUseCase }