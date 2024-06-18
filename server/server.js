import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./db/db.js";
import memberRoutes from "./routes/memberRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use("/api/members", memberRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});
app.use(errorHandler);

app.listen(port, () => console.log(`Server running  on port ${port}`));
