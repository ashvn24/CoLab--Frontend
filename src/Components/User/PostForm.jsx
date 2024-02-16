import React from "react";
import Form from "./Utils/Form";

const PostForm = () => {
  return (
    <div className="w-2/3 max-sm:w-10/12">
     <Form /> 
     <div className="flex flex-row gap-5 justify-end">
     <button type="submit" className='bg-gray-800 p-3 h-14 w-36 rounded-lg mt-6 hover:bg-red'> Cancel</button>
     <button type="submit" className='bg-gray-800 p-3 h-14 w-36 rounded-lg mt-6 hover:bg-primary-500'> Submit</button>

     </div>
    </div>
  );
};

export default PostForm;
