import express, { Application } from "express";
import dotenv from "dotenv";
import { ConnectToDB } from "./configs/db";
import greenhouseRoutes from "./routes/greenhouse.routes";
import companyRoutes from "./routes/company.routes";
import organizationRoutes from "./routes/Organization.routes";
import cors from 'cors'
dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3000
app.use(cors({
    origin: '*',
    credentials: true
}))
ConnectToDB();
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/greenhouse', greenhouseRoutes);
app.use('/company', companyRoutes);
app.use('/organization', organizationRoutes);
app.listen(PORT);
