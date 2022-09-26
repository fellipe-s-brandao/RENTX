import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })
    
    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "name car",
            description: "description",
            daily_rate: 100,
            license_plate: "abc-1234",
            fine_amount: 60,
            brand: "brand",
            category_id: "category"
        });

        expect(car).toHaveProperty("id");
    })

    it("should not be able to create a car with exists license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "name 1car",
                description: "1description",
                daily_rate: 1100,
                license_plate: "abc-1234",
                fine_amount: 160,
                brand: "1brand",
                category_id: "1category"
            });

            await createCarUseCase.execute({
                name: "name 2car",
                description: "2description",
                daily_rate: 2100,
                license_plate: "abc-1234",
                fine_amount: 260,
                brand: "2brand",
                category_id: "2category"
            });
        }).rejects.toBeInstanceOf(AppError);
    })

    it("should be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "car available",
            description: "description",
            daily_rate: 100,
            license_plate: "zxc-1234",
            fine_amount: 60,
            brand: "brand",
            category_id: "category"
        });

        expect(car.available).toBe(true);
    })
})