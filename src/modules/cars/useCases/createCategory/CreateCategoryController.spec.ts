import { app } from "@shared/infra/http/app";
import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import request from "supertest";
import { Connection, createConnection } from "typeorm";

let connection: Connection;

describe("Create Category controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4()
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
                values('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'xxxxxxxx')`
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@admin.com",
            password: "admin"
        });

        const { refresh_token } = responseToken.body;

        const response = await request(app).post("/categories")
        .send({
            name: "category supertest",
            description: "category supertest",
        }).set({
            Authorization: `Bearer ${refresh_token}`
        })

        expect(response.status).toBe(201);
    });

    it("Should not be able to create a new category with name exists", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@admin.com",
            password: "admin"
        });

        const { refresh_token } = responseToken.body;

        const response = await request(app).post("/categories")
        .send({
            name: "category supertest",
            description: "category supertest",
        }).set({
            Authorization: `Bearer ${refresh_token}`
        })

        expect(response.status).toBe(400);
    });
});