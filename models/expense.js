import { Schema, model, models } from 'mongoose'

const ExpenseSchema = new Schema({
    userId: String,
    id: String,
    category: String,
    expenses: [{
        name: String,
        date: Date,
        cost: Number,
        merchant: String
    }]
})

const Expense = models.Expense || model("Expense", ExpenseSchema);
export default Expense;