require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes/route');
const expenseRouter = require('./routes/expense_route');
const connectDB = require('./db/db');

const port = process.env.PORT || 5000;

app.use(cors({}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/route", router);
app.use("/api/expenses", expenseRouter);

app.get("/", (req, res) => {
    res.send("Backend is running successfully!");
});

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server started");
    });
});