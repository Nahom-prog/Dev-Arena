import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const createToken = (user) => {
  return jwt.sign(
    { id: user._id.toString(), email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const assignedRole = role && ["developer", "teacher", "student", "admin"].includes(role)
      ? role
      : "developer";

    const normalizedEmail = email.toLowerCase();

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: normalizedEmail,
      passwordHash,
      role: assignedRole,
    });

    const token = createToken(newUser);

    return res.status(201).json({
      message: "Registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        xp: newUser.xp,
        level: newUser.level,
        streak: newUser.streak,
        quizzesTaken: newUser.quizzesTaken,
        quizzesCreated: newUser.quizzesCreated,
        badges: newUser.badges,
        canCreateQuiz: false,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(user);

    const canCreateQuiz =
      (user.level || 1) >= 3 ||
      (user.quizzesTaken || 0) >= 3 ||
      user.role === "admin" ||
      user.role === "teacher";

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        xp: user.xp || 0,
        level: user.level || 1,
        streak: user.streak || 1,
        quizzesTaken: user.quizzesTaken || 0,
        quizzesCreated: user.quizzesCreated || 0,
        badges: user.badges || [],
        canCreateQuiz,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate dynamic global rank
    const higherXpCount = await User.countDocuments({ xp: { $gt: user.xp || 0 } });
    const rank = higherXpCount + 1;

    // Calculate accuracy percentage
    const accuracy =
      user.totalQuestionsAttempted > 0
        ? ((user.totalScore / user.totalQuestionsAttempted) * 100).toFixed(1)
        : "0.0";

    // Creator eligibility gate (Level 3+ OR 3+ quizzes completed OR admin/teacher)
    const canCreateQuiz =
      (user.level || 1) >= 3 ||
      (user.quizzesTaken || 0) >= 3 ||
      user.role === "admin" ||
      user.role === "teacher";

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      xp: user.xp || 0,
      level: user.level || 1,
      streak: user.streak || 1,
      quizzesTaken: user.quizzesTaken || 0,
      quizzesCreated: user.quizzesCreated || 0,
      totalScore: user.totalScore || 0,
      totalQuestionsAttempted: user.totalQuestionsAttempted || 0,
      accuracyRating: `${accuracy}%`,
      arenaRank: `#${rank}`,
      canCreateQuiz,
      country: user.country || "",
      affiliation: user.affiliation || "",
      badges: user.badges || [],
      recentAttempts: (user.recentAttempts || []).slice(-10).reverse(),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { country, affiliation } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (country !== undefined) user.country = country ? country.trim() : "";
    if (affiliation !== undefined) user.affiliation = affiliation ? affiliation.trim() : "";

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      country: user.country,
      affiliation: user.affiliation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to update profile" });
  }
};