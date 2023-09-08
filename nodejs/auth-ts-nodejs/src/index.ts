import "dotenv/config";
// import cookieParser from "cookie-parser";
// const cors = require("cors");
// import swaggerRouter from "./_helpers/swagger";
import createServer from "./utils/server";
const app = createServer();

// app.use(cookieParser());

// app.use(
//   cors({
//     origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
//       callback(null, true);
//     },
//     credentials: true,
//   })
// );

// app.use("/api-docs", swaggerRouter);

const port: number = process.env.NODE_ENV === "production" ? (process.env.PORT ? parseInt(process.env.PORT) : 80) : 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
