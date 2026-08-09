const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
dotenv.config();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res) => {
    res.send("Hello world");
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
   .then(() => { console.log("MongoDB connected successfully")})
   .catch((error) => { console.log("MongoDB connection failed:", error)})

app.listen(port,()=> {
    console.log(`Example app listening on port ${port}`);
});