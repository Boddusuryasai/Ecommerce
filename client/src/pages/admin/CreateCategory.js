import React, { useEffect, useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constants";
const CreateCategory = () => {
  const [category, setCategory] = React.useState("");
  const onChange = ({ target }) => setCategory(target.value);
  const [allcategories, setAllcategories] = useState([]);
  const [updatedName, setUpdatedName] = useState("");
  const [selected, setSelected] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/category/create-category`, {
        name: category,
      });
      if (data?.success) {
        toast.success(`${category} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input form");
    }
  };

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/category/get-category`);
      if (data.success) {
        setAllcategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };
  const handleEdit = (cat) => {
    setSelected(cat);
    setUpdatedName(cat.name);
  };

  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/v1/category/update-category/${id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="md:w-3/4">
      <div className="relative flex w-full max-w-[45rem]">
        <Input
          type="text"
          label="category "
          value={category}
          onChange={onChange}
          className="pr-20"
          containerProps={{
            className: "min-w-0",
          }}
        />
        <Button
          size="sm"
          color={category ? "blue" : "blue-gray"}
          disabled={!category}
          className="!absolute right-1 top-1 rounded"
          onClick={handleSubmit}
        >
          Add
        </Button>
      </div>
      <div class="mt-6 relative flex w-full max-w-[45rem] overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {allcategories && (allcategories.map((cat) => {
              return (<tr key={cat._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                {selected?._id === cat._id ? (
                  <>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={cat.name}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleUpdate(cat._id)}
                      >
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4">{cat.name}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleEdit(cat)}
                      >
                        Edit
                      </button>
                    </td>
                  </>
                )}
              </tr>

              )
            }))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateCategory;
