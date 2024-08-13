import express from "express";
import cors from "cors";
import { searchFlightsHandler } from "./flights.controller";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("Lets lean how to create/use pagination links!");
});

app.get("/flights", searchFlightsHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});