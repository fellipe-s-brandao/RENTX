import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsReposistoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {

    beforeEach(() => {
        carsReposistoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsReposistoryInMemory, specificationsRepositoryInMemory);
    })

    it("should not be able to add a new specification to the a now-existent car", async () => {
        expect(async () => {
            const car_id = "12340";
            const specifications_id = ["151515244"];
            await createCarSpecificationUseCase.execute({car_id, specifications_id});
        }).rejects.toBeInstanceOf(AppError);
    })

    it("should be able to add a new specification to the car", async () => {
        const car = await carsReposistoryInMemory.create({
            name: "name car",
            description: "description",
            daily_rate: 100,
            license_plate: "abc-1234",
            fine_amount: 60,
            brand: "brand",
            category_id: "category"
        });

        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name: "test"
        })

        const specifications_id = [specification.id];
        await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id});
    })
})