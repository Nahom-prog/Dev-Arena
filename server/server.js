import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { ensureAdminExists } from "./src/scripts/seedAdmin.js";

const PORT = process.env.PORT || 5000;

await connectDB();
await ensureAdminExists();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});