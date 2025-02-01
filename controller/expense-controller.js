const expenseModel = require('../models/expense_model');

const add_expense = async (req, res) => {
    try {
        const { amount, category, date, description } = req.body;
        const userId = req.user.id; // Ensure this is coming from the authenticated user
        
        if (!amount || !category || !date) {
            return res.status(400).send({ msg: "All fields are required" });
        }

        // Create the new expense
        const newExpense = await expenseModel.create({ 
            user_id: userId, 
            amount, 
            category, 
            date, 
            description 
        });

        res.status(201).send({ msg: "New expense created", expense: newExpense });        

    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).send({ msg: "Internal server error" });
    }
};

const update_expense = async (req, res)=>{
    try{
        const { expenseId, amount, category, date, description } = req.body;
        const userId = req.user.id;

        const expense = await expenseModel.findOneAndUpdate(
            { _id: expenseId, user_id: userId },
            { amount, category, date, description },
            { new: true }      // Returns the updated expense document instead of the old one.
        )
        if(!expense){
            return res.status(404).json({ msg: "Expense not found" });
        }

        res.status(200).json({ msg: "Expense updated", expense: expense });

    }catch(error){
        res.status(500).send({ msg: "Internal server error" });
    }
}

const delete_expense = async (req, res)=>{
    try{
        const { expenseId } = req.params;
        const userId = req.user.id;
        
        if (!expenseId) {
            return res.status(400).send({ msg: "Expense ID is required" });
        }

        const deleteExpense = await expenseModel.findOneAndDelete({ _id: expenseId, user_id: userId });
        if(!deleteExpense){
            return res.status(400).send({ msg: "Expense not found" });
        }
        res.status(200).send({ msg: "Expense deleted", deleted: deleteExpense });
    }catch(error){
        res.status(500).send({ msg: "Internal server error" });
    }
}

const get_expense = async (req, res)=>{
    try{
        const userId = req.user.id;
        const expenses = await expenseModel.find({ user_id: userId });
        res.status(200).send({ expenses: expenses });
    }catch(error){
        res.status(500).send({ msg: "Internal server error" });
    }
}

module.exports = { add_expense, update_expense, delete_expense, get_expense };