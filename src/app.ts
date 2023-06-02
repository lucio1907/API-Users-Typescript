import express from "express";
import cors from "cors";
import connectionMongoDB from "./config/mongoDBConnection.config";
import routerLogin from "./routes/login.routes";
import routerUsers from "./routes/users.routes";
import "dotenv/config"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectionMongoDB()

app.use('/api/v1', routerLogin, routerUsers);

const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => console.log("Server up!"));