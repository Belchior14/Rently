const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const {authenticate} = require("./middlewares/jwt.middleware")
const cors = require("cors");
const upload = require('./config/cloudstorage')
dotenv.config();


mongoose.connect(process.env.MONGO_DB_URL);

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world!')
})

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const productRoutes = require("./routes/product.routes");
app.use("/product", productRoutes);

const profileRoutes = require("./routes/profile.routes");
app.use("/profile",authenticate, profileRoutes);

app.post('/upload', upload.single('myFile'), (req, res) => {
    res.json(req.file)
  })

app.listen(process.env.PORT);