import { Form, useParams, redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export async function action({ request, params }) {
    const formData = await request.formData();

    const newTask = {
        title: formData.get("title"),
        description: formData.get("description"),
        priority: formData.get("priority"),
        status: false,
    };

    const response = await fetch(`/backend/tasks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            task: newTask,
            list: params.listId,
        }),
    });

    if (response.ok) {
        toast.success(`'${newTask.title}' added!`);
        return redirect(`/taskmanager/${params.listId}`);
        
    } else {
        throw new Error("Failed to add task");
    }
}

export default function TaskAddForm(){
    return(
        <Form method="post" className="flex flex-col justify-center items-center w-9/12">
            <h1 className="text-3xl mb-12">Add task to list:</h1>

            <label htmlFor="title" className="text-2xl">Task Title</label>
            <input type="text" name="title" id="title" className="text-white bg-blue-900 bg-opacity-25 border-b-2 rounded-xl w-9/12 h-12 p-3 mt-3 mb-5" required/>

            <label htmlFor="description" className="text-2xl">Task Description</label>
            <input type="text" name="description" id="description" className="text-white bg-blue-900 bg-opacity-25 border-b-2 rounded-xl w-9/12 h-12 p-3 mt-3 mb-5" required/>

            <label htmlFor="priority" className="text-2xl mt-4 mb-2">Task Priority</label>
            
            <div className="flex space-x-6">
                <label className="flex items-center space-x-2">
                    <input
                    type="radio"
                    name="priority"
                    value="Low"
                    className="form-radio text-indigo-500 w-10 h-10"
                    />
                    <span className="text-indigo-500 text-2xl">Low</span>
                </label>

                <label className="flex items-center space-x-2">
                    <input
                    type="radio"
                    name="priority"
                    value="Medium"
                    className="form-radio text-indigo-500 w-10 h-10"
                    />
                    <span className="text-yellow-300 text-2xl">Medium</span>
                </label>

                <label className="flex items-center space-x-2">
                    <input
                    type="radio"
                    name="priority"
                    value="High"
                    className="form-radio text-indigo-500 w-10 h-10"
                    />
                    <span className="text-red-700 text-2xl">High</span>
                </label>
            </div>

            <button type="submit" className="p-4 mt-10 rounded-md bg-blue-600 montserrat-bold">Add Task to this list</button>

        </Form>
    )
}