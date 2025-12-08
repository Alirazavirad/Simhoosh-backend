import express, { Application } from "express";
import dotenv from "dotenv";
import { ConnectToDB } from "./configs/db";
import greenhouseRoutes from "./routes/greenhouse.routes";
import companyRoutes from "./routes/company.routes";
import organizationRoutes from "./routes/Organization.routes";
import ProvinceRoutes from "./routes/province.routes";
import UserRoutes from "./routes/user.routes";
import CityRoutes from "./routes/city.routes";
import cors from 'cors'
dotenv.config();
const app: Application = express()
const PORT =  4000
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
app.use("/province",ProvinceRoutes)
app.use("/user",UserRoutes)
app.use("/city",CityRoutes)
app.listen(PORT);
