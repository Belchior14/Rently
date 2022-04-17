const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const {authenticate} = require("./middlewares/jwt.middleware")
const cors = require("cors");
dotenv.config();


mongoose.connect(process.env.MONGO_DB_URL);

const app = express();

app.use(cors());

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const productRoutes = require("./routes/product.routes");
app.use("/product", productRoutes);

const profileRoutes = require("./routes/profile.routes");
app.use("/profile",authenticate, profileRoutes);

app.listen(process.env.PORT);