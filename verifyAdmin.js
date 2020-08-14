const jwt = require("jsonwebtoken");
const Admin = require("./models/Admin");

module.exports = async (req, res, next) => {
  const adminToken = req.header("admin-token");
  if (!adminToken) return res.status(401).send("Access denied");

  try {
    const veryfied = jwt.verify(adminToken, process.env.TOKEN_SECRET);
    const adminId = veryfied._id;

    const veryfiedAdmin = await Admin.find({ _id: adminId });

    req.adminId = veryfiedAdmin[0]._id;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
