import dotenv from "dotenv";
dotenv.config();

 import crcreateSuperAdmin from './seeds/createSuperAdmin.js'
 import createDefaultRole from "./seeds/createDefaultRole.js";
 
import app from "./app.js";
import Db_CONTIONE from "./db/index.js";

Db_CONTIONE();
    await createDefaultRole();



   await crcreateSuperAdmin();


app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running on ${process.env.PORT || 8000}`);
});