import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./listCarsUseCase"

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    })

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "car A7",
            "description": "car teste",
            "daily_rate": 140,
            "license_plate": "ACD-1212",
            "fine_amount": 100,
            "brand": "Audi",
            "category_id": "70e92ef7-d70b-4b83-9bfd-b6c61a31d71c"
        });

        const cars = await listCarsUseCase.execute({});
        expect(cars).toEqual([car])
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "car A2",
            "description": "car teste1",
            "daily_rate": 141,
            "license_plate": "ACD-1512",
            "fine_amount": 101,
            "brand": "Audi1",
            "category_id": "70e92ef7-d70b-4b83a31d71c"
        });

        const cars = await listCarsUseCase.execute({
            brand: "Audi1"
        });

        expect(cars).toEqual([car])
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "car A3",
            "description": "car teste13",
            "daily_rate": 111,
            "license_plate": "ACD-1517",
            "fine_amount": 1101,
            "brand": "Audi1",
            "category_id": "11111-d70b-4b83a31d71c"
        });

        const cars = await listCarsUseCase.execute({
            name: "car A3"
        });

        expect(cars).toEqual([car])
    });

    it("should be able to list all available cars by category_id", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "car A113",
            "description": "car teste113",
            "daily_rate": 11221,
            "license_plate": "ACD-1817",
            "fine_amount": 11018,
            "brand": "Aud51i1",
            "category_id": "111515111-d70b-4b83a31d71c"
        });

        const cars = await listCarsUseCase.execute({
            category_id: "111515111-d70b-4b83a31d71c"
        });

        expect(cars).toEqual([car])
    });

    
})