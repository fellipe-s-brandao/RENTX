import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { getRepository, Repository } from "typeorm";
import { CarImage } from "../entities/CarImage";

class CarsImagesRepository implements ICarsImagesRepository{
    private repoistory: Repository<CarImage>;

    constructor() {
        this.repoistory = getRepository(CarImage);
    }
    
    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = this.repoistory.create({
            car_id,
            image_name,
        });

        await this.repoistory.save(carImage);

        return carImage;
    }

}

export { CarsImagesRepository }