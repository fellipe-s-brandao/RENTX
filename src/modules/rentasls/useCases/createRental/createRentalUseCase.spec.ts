import { RentalsRepositoryInMemory } from "@modules/rentasls/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./createRentalUseCase"

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
    })

    it("should be able to create a new rental", async  () => {
        await createRentalUseCase.execute({
            car_id: "12345",
            user_id: "12345",
            expected_reutn_date: new Date()
        });
    })
})
