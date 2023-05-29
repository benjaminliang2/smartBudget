"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CategoryPage = ({ params }) => {
    const category = params.id
    // ---START variables for single expense ---
    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [cost, setCost] = useState(0)
    const [merchant, setMerchant] = useState("")
    // ---END  variables for single expense  ---

    const [startDate, setStartDate] = useState(new Date());



    return (
        <>
            <div className="grid gap-6 mb-6 md:grid-cols-2 bg-slate-300 p-3 rounded-lg">
                <div>
                    <label htmlFor="Name" className="block mb-2 text-sm font-medium">Name</label>
                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Movie Tickets" required />
                </div>
                <div>
                    <label htmlFor="Date" className="block mb-2 text-sm font-medium">Date</label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Movie Tickets" required />
                </div>
                <div>
                    <label htmlFor="Cost" className="block mb-2 text-sm font-medium">Cost</label>
                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="20" required />
                </div>
                <div>
                    <label htmlFor="Merchant" className="block mb-2 text-sm font-medium">Merchant</label>
                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="AMC" required />
                </div>
            </div>

        </>

    );
};

export default CategoryPage;
