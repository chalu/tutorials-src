import express from "express";
import cors from "cors";
import { searchFlightsHandler } from "./flights.controller";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("Lets improve type safety and DX for express API handlers!");
});

app.get("/flights", searchFlightsHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});