import app from "./src/app.js";
import connectDB from "./src/database/db.js";
import { config } from "./src/configs/config.js";

const port = config.PORT;

connectDB();

app.listen(port, (req, res) => {
  console.log(`Server is Running at ${port}`);
});
