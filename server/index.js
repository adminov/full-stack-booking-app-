require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT = process.env.MONGO;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);

app.use((err, reg, res, next) => {
   const errorStatus = err.status || 500;
   const errorMessage = err.message || "Something went wrong!";
   return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack
   })
});

//-------------------------------------------------
const connect = async () => {
   try {
      await mongoose.connect(PORT);
   } catch (er) {
      console.log('disconnected to MongoDB ');
      throw er
   }
};

mongoose.connection.on("disconnected", () => {
   console.log('disconnected to MongoDB ')
});

app.listen(8800, () => {
   connect();
   console.log('connected to backend', PORT)
});