import User from "../models/User.js";

export async function requireAdmin(req, res, next) {
  try {
    // Verify role from DB instead of trusting potentially stale JWT claims
    const dbUser = await User.findById(req.user.id).select("role").lean();
    if (!dbUser || dbUser.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. God Mode clearance required.",
      });
    }
    // Update req.user.role so downstream controllers use the fresh value
    req.user.role = dbUser.role;
    next();
  } catch (err) {
    console.error("Admin auth check error:", err);
    return res.status(500).json({ message: "Authorization verification failed" });
  }
}
