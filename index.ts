import express from "express";
import createMongoConnection from "./context/MongoConnection";
createMongoConnection();

import userRouter from "./usuarios/infrastructure/rest/user.route";

const app = express();
const port = 8080;

app.use(express.json());
app.use("/usuarios", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
