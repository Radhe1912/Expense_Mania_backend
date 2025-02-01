const mongoose = require('mongoose');

const categories = ['Food', 'Travel', 'Entertainment', 'Health', 'Shopping', 'Utilities'];

const expenseSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        enum: categories,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        default: ''
    }
}, {timestamps: true});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;