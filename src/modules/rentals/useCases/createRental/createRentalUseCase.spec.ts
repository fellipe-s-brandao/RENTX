import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { CreateRentalUseCase } from "./createRentalUseCase"

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        dayJsDateProvider = new DayJsDateProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider, carsRepositoryInMemory);
    })

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "test",
            description: "car test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "123",
            brand: "brand"
        });

        const rental = await createRentalUseCase.execute({
            car_id: car.id,
            user_id: "12345",
            expected_return_date: dayAdd24Hours
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {

        await rentalsRepositoryInMemory.create({
            car_id: "11111",
            user_id: "12345",
            expected_return_date: dayAdd24Hours
        });

        await expect(createRentalUseCase.execute({
            car_id: "2555",
            user_id: "12345",
            expected_return_date: dayAdd24Hours
        })
        ).rejects.toEqual(new AppError("There's a rental in progress for user"));
    });

    it("should not be able to create a new rental if there is another open to the same car", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "11111",
            user_id: "12345",
            expected_return_date: dayAdd24Hours
        });

        await expect(createRentalUseCase.execute({
            car_id: "11111",
            user_id: "test",
            expected_return_date: dayAdd24Hours
        })
        ).rejects.toEqual(new AppError("Car is unavailable"));
    });

    it("should not be able to create a new rental with invalid return time", async () => {
        expect(createRentalUseCase.execute({
            car_id: "123",
            user_id: "test",
            expected_return_date: dayjs().toDate()
        })
        ).rejects.toEqual(new AppError("Invalid return time!"));
    });
})
