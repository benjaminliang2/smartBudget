// /api/[userid]/category will fetch all categories for this user. 

import User from "@/models/user";
import { connectToDB } from "@/utils/db";

export const GET = async (request, {params}) => {
    try {
        await connectToDB()

        const categories = await User.findById(params.userId).then(data => {
            return data.categories
        })

        return new Response(JSON.stringify(categories), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all categories", { status: 500 })
    }
} 

