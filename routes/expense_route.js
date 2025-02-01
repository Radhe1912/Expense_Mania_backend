const express = require('express');
const expenseRouter = express.Router();
const { authenticate } = require('../middleware/authenticate');
const expenseController = require('../controller/expense-controller');

expenseRouter.route("/add").post(authenticate, expenseController.add_expense);
expenseRouter.route("/update").put(authenticate, expenseController.update_expense);
expenseRouter.route("/delete/:expenseId").delete(authenticate, expenseController.delete_expense);
expenseRouter.route("/").get(authenticate, expenseController.get_expense);

module.exports = expenseRouter;