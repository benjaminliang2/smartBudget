//get all expenses in category
//add new expense in category

import Expense from "@/models/expense";
import { connectToDB } from "@/utils/db";


export const GET = async (request, {params}) => {
    const {userId, categoryName} = params
    try {
        await connectToDB()
        const data = await Expense.findOne({ userId, category: categoryName })
        
        if(data){
            console.log("success: queried all expenses for category")
            console.log(data.expenses)
            return new Response(JSON.stringify(data.expenses), { status: 201 })
        }
    } catch (error) {
        return new Response("Failed to fetch expenses in this category", { status: 500 });

    }
}


export const POST = async (request, { params }) => {
    const categoryName = params.categoryName
    const { userId, name, date, cost, merchant } = await request.json();

    try {
        await connectToDB();

        //find if category exists, if so add to expenses array, else, create new model 
        const existingExpense = await Expense.findOne({ userId, category: categoryName })
        const entry = {
            name: name,
            date: date,
            cost: cost,
            merchant: merchant
        }
        console.log(entry)
        if (!existingExpense) {
            console.log("creating new expense model")
            await Expense.create({
                userId,
                category: categoryName, 
                expenses:[entry]
            })
        } else {
            console.log(existingExpense)
            existingExpense.expenses.push(entry)
            await existingExpense.save()
            return new Response(JSON.stringify(existingExpense), { status: 201 })
        }

    } catch (error) {
        console.log("error creating new expense")
        return new Response("Failed to create a new expense", { status: 500 });
    }
}
