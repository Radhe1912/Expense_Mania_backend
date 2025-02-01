require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes/route');
const expenseRouter = require('./routes/expense_route');
const connectDB = require('./db/db');

app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend to make requests to the backend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    credentials: true, // Allow cookies to be sent with requests
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/route", router);
app.use("/api/expenses", expenseRouter);

connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Server started");
    });
});