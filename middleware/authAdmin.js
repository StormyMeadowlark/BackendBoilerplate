// middleware/authAdmin.js

module.exports = function authorizeAdmin(allowedRoles = []) {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !user.role || !user.tenantType) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isAllowed =
      allowedRoles.includes(user.role) ||
      allowedRoles.includes(user.tenantType);

    if (!isAllowed) {
      return res.status(403).json({ message: "Forbidden: Admin access only" });
    }

    next();
  };
};
