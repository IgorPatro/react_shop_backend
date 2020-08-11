const router = require("express").Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  adminRegisterValidation,
  adminLoginValidation,
} = require("../validation");

// Adding new admin
router.post("/add", async (req, res) => {
  // Validation
  const { error } = adminRegisterValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking exist in database
  const loginExist = await Admin.findOne({ login: req.body.login });
  if (loginExist)
    return res.status(400).send("There is an admin with this login");

  // Hashing password
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

  // Creating new admin
  const admin = new Admin({
    login: req.body.login,
    password: hashedPassword,
  });

  // Adding new admin to database
  try {
    const savedAdmin = await admin.save();
    res.send({ admin: savedAdmin._id });
  } catch (err) {
    res.send(err);
  }
});

// Logging as admin
router.post("/login", async (req, res) => {
  // Validete the data before login admin
  const { error } = adminLoginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the admin is already in DB
  const admin = await Admin.findOne({ login: req.body.login });
  if (!admin) return res.status(400).send("There is no admin with this login");

  // Checking is password is correct
  const validPassword = await bcrypt.compare(req.body.password, admin.password);
  if (!validPassword) return res.status(400).send("Password is wrong");

  // Create and assign token
  const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
