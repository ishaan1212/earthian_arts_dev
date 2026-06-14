import "dotenv/config";
import { app } from "./app.js";
import { connectDb } from "./config/db.js";

const port = process.env.PORT || 5001;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`API running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
