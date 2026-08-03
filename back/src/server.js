import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import Db_CONTIONE from "./db/index.js";

Db_CONTIONE();

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running on ${process.env.PORT || 8000}`);
});