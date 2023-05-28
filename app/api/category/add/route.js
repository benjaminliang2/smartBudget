import User from "@/models/user"
import { connectToDB } from "@/utils/db"

export const POST = async (request, { params }) => {
    const { categoryName, userId } = await request.json();
    console.log(categoryName, userId)
    console.log("post request")
    try {
        await connectToDB();

        // Find the existing prompt by ID
        const currentUser = await User.findById(userId);
        console.log(currentUser)
        if (!currentUser) {
            return new Response("User not found", { status: 404 });
        }

        // Update the prompt with new data
        let temp = currentUser.categories
        temp.push(categoryName)
        console.log(temp)
        currentUser.categories = temp 

        await currentUser.save();

        return new Response("Successfully added new category", { status: 200 });
    } catch (error) {
        return new Response("Error adding category", { status: 500 });
    }
}

export const GET = async () =>{
    return new Response("ok", { status: 200 })}