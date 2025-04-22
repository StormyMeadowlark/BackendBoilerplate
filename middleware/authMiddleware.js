const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // includes tenantId, tenantType, tier, etc.

    let user;
    try {
      user = await User.findById(decoded.id);
    } catch (dbError) {
      console.error("🔥 Database error in authMiddleware:", dbError);
      return res
        .status(500)
        .json({ message: "Authentication failed due to a database error." });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.status !== "Active") {
      return res.status(403).json({ message: "Account is not active." });
    }

    // ✅ Merge token info + latest DB info
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
      tenantIds: user.tenantIds, // fresh from DB
      tenantId: decoded.tenantId, // from token
      tenantType: decoded.tenantType, // from token
      tier: decoded.tier || "Basic", // from token
    };

    next();
  } catch (error) {
    console.error("❌ Token validation error:", error);
    res.status(401).json({ message: "Unauthorized access." });
  }
};
