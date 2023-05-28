import {Schema, model, models} from 'mongoose'

const ExpenseSchema = new Schema({
    category:{
        type: String,
        required:[true, 'Please select existing category or create a new one']
    },
    location:{
        name: String,
        date: String,
        cost: date,
        location: String
    }
})

const Expense = models.Expense;

export default Expense;