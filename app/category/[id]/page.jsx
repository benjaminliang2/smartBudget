//renders expenses for this category and allows users to add new expenses 

"use client";

import ExpenseCard from "@/components/ExpenseCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CategoryPage = ({ params }) => {
  const { data: session } = useSession();
  const categoryName = params.id
  // ---START variables for single expense ---
  const [name, setName] = useState("")
  const [date, setDate] = useState(new Date())
  const [cost, setCost] = useState(0)
  const [merchant, setMerchant] = useState("")
  // ---END  variables for single expense  ---

  // ---START variables for expenses list ---
  const [expenses, setExpenses] = useState()
  // ---END  variables for expenses list  ---

  const addExpense = async () => {
    try {
      await fetch(`/api/${session?.user.id}/category/${categoryName}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session?.user.id,
          name,
          date,
          cost,
          merchant
        })
      })
        .then(response => console.log(response))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getAllExpensesForCategory = async () => {
      try {
        await fetch(`/api/${session?.user.id}/category/${categoryName}`)
          .then(response => response.json())
          .then(data => setExpenses(data))
      } catch (error) {
        console.log(error)

      }
    }
    getAllExpensesForCategory()
  }, [session?.user.id])

  return (
    <>
      <div className=''>
        <div className=" bg-slate-300 p-3 rounded-lg items-center">
          <h1>Add new expense</h1>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="Name" className="block mb-2 text-sm font-medium">Name</label>
              <input type="text" id="first_name" className="expense_input" placeholder="Movie Tickets" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="Date" className="block mb-2 text-sm font-medium">Date</label>
              <DatePicker selected={date} onChange={(date) => setDate(date)} className="expense_input" placeholder="Movie Tickets" required />
            </div>
            <div>
              <label htmlFor="Cost" className="block mb-2 text-sm font-medium">Cost</label>
              <input type="text" id="first_name" className="expense_input" placeholder="20" required value={cost} onChange={(e) => setCost(e.target.value)} />
            </div>
            <div>
              <label htmlFor="Merchant" className="block mb-2 text-sm font-medium">Merchant</label>
              <input type="text" id="first_name" className="expense_input" placeholder="AMC" required value={merchant} onChange={(e) => setMerchant(e.target.value)} />
            </div>
          </div>
          <button onClick={() => addExpense()}>Save</button>
        </div>
        {expenses?.map((each, index) =>

          <ExpenseCard key={each._id} cost={each.cost} name={each.name} merchant={each.merchant} />
        )}

      </div>

    </>

  );
};

export default CategoryPage;
