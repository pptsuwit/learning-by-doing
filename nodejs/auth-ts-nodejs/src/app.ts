// import "rootpath";
import "dotenv/config";
const express = require("express");
// import cookieParser from "cookie-parser";
// const cors = require("cors");
import errorHandler from "./middlewares/error-handler";
import userControllerRouter from "./controllers/user.controller";
import authControllerRouter from "./controllers/auth.controller";
// import swaggerRouter from "./_helpers/swagger";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
//       callback(null, true);
//     },
//     credentials: true,
//   })
// );

app.use("/api", userControllerRouter);
app.use("/api", authControllerRouter);
// app.use("/api-docs", swaggerRouter);

app.use(errorHandler);

const port: number = process.env.NODE_ENV === "production" ? (process.env.PORT ? parseInt(process.env.PORT) : 80) : 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
