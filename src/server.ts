import express, { request, response }  from "express";

const app = express();

app.get("/courses", (request, responde) => {
    const { name } = request.body;
    
    return response.json({ name });
    
})

app.listen(3333, ()=> console.log("Server is running!"));