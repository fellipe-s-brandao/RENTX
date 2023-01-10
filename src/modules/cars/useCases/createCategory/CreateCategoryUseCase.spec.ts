import { AppError } from "@shared/errors/AppError";
import { CategoryRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoryRepositoryInMemory

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoryRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    })

    it("Should be able to create a new category", async () => {
        const category = {
            name: "Category test",
            description: "Category description Test"
        }
        await createCategoryUseCase.execute(category);

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");
    })

    it("Should not be able to create a new category with name exists", async () => {
        const category = {
            name: "Category test",
            description: "Category description Test"
        }

        await createCategoryUseCase.execute(category);

       await expect(createCategoryUseCase.execute(category)).rejects.toEqual(new AppError("Category already exists!"))
    })
})