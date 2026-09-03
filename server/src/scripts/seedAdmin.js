import "dotenv/config";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import User from "../models/User.js";

const ADMIN_EMAIL = "abiynahom570@gmail.com";
const ADMIN_PASS = "GODMODEFOREVER4etttid";

export async function ensureAdminExists() {
  try {
    let admin = await User.findOne({ email: ADMIN_EMAIL });
    const passwordHash = await bcrypt.hash(ADMIN_PASS, 10);

    if (admin) {
      admin.role = "admin";
      admin.passwordHash = passwordHash;
      if (!admin.name) admin.name = "Nahom (Supreme Architect)";
      await admin.save();
      console.log(`[GOD MODE] Master admin (${ADMIN_EMAIL}) verified and updated.`);
    } else {
      admin = await User.create({
        name: "Nahom (Supreme Architect)",
        email: ADMIN_EMAIL,
        passwordHash,
        role: "admin",
        level: 1,
        xp: 0,
        streak: 1,
      });
      console.log(`[GOD MODE] Master admin (${ADMIN_EMAIL}) created successfully.`);
    }
  } catch (err) {
    console.error("[GOD MODE] Error initializing admin:", err.message);
  }
}

// If executed directly: node src/scripts/seedAdmin.js
if (process.argv[1]?.includes("seedAdmin.js")) {
  await connectDB();
  await ensureAdminExists();
  process.exit(0);
}
