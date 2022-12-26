import { RentalsRepositoryInMemory } from "@modules/rentasls/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./createRentalUseCase"

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
    })

    it("should be able to create a new rental", async  () => {
        const rental = await createRentalUseCase.execute({
            car_id: "12345",
            user_id: "12345",
            expected_reutn_date: new Date()
        });

        console.log(rental);
        
       expect(rental).toHaveProperty("id");
       expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to the same user", async  () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "12345",
                user_id: "12345",
                expected_reutn_date: new Date()
            });

            await createRentalUseCase.execute({
                car_id: "12345",
                user_id: "12345",
                expected_reutn_date: new Date()
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new rental if there is another open to the same car", async  () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "123",
                user_id: "test",
                expected_reutn_date: new Date()
            });

            await createRentalUseCase.execute({
                car_id: "321",
                user_id: "test",
                expected_reutn_date: new Date()
            });
        }).rejects.toBeInstanceOf(AppError);
    });
})
