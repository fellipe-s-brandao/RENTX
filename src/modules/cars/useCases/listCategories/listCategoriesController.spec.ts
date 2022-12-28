import { app } from "@shared/infra/http/app";
import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import request from "supertest";
import { Connection, createConnection } from "typeorm";

let connection: Connection;

describe("List Categories controller", () => {

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

    it("Should be able to list all categories", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@admin.com",
            password: "admin"
        });

        const { token } = responseToken.body;

        await request(app).post("/categories")
        .send({
            name: "category supertest",
            description: "category supertest",
        }).set({
            Authorization: `Bearer ${token}`
        });

        const response = await request(app).get("/categories");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toHaveProperty("category supertest");
    });
});