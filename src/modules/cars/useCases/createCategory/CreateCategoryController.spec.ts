import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("Create Category controller", () => {
    
    it("Should be able to create a new category", async () => {
        await request(app).get("/cars/available").expect(201)
    })
});