//add new category 
import User from "@/models/user"
import { connectToDB } from "@/utils/db"

export const POST = async (request, { params }) => {
    const { categoryName, userId, categoryIcon } = await request.json();
    console.log("post request")
    try {
        await connectToDB();

        // Find the existing prompt by ID
        const currentUser = await User.findById(userId);
        console.log(currentUser)
        if (!currentUser) {
            return new Response("User not found", { status: 404 });
        }

        currentUser.categories.push({categoryName, categoryIcon})
        await currentUser.save();

        return new Response("Successfully added new category", { status: 200 });
    } catch (error) {
        return new Response("Error adding category", { status: 500 });
    }
}

export const GET = async () =>{
    return new Response("ok", { status: 200 })}