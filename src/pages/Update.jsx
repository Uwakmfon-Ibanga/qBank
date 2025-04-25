import React from "react";
import { useState } from "react";
import supabase from "../config/supabaseClient";


const Update = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseLecturer, setCourseLecturer] = useState("");
  const [year, setYear] = useState("");
  const [imageFile, setImageFile] = useState(null);


  // function to handle image upload
  async function uploadImage(image, courseCode, year) {
    const fileName = `${courseCode} - ${year}.jpg`

    const {data, error} = await supabase
    .storage
    .from('cms-images')
    .upload(fileName,imageFile)

    if (error){
      console.error(error);
      return null
    }

    // getting the public url of the uploaded image
    const {data: {publicUrl}} = supabase.storage
    .from('cms-images')
    .getPublicUrl(fileName)

    return publicUrl
  }



  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // upload the image and get its URL
      const imageUrl = await uploadImage(imageFile, courseCode, year);

      if (!imageUrl) {
        throw new Error("Image upload failed");
      }
    

          // Then insert the data including the image URL
    const {data, error} = await supabase
    .from('cms')
    .insert({courseTitle, courseCode, courseLecturer, year, imageUrl})
    .select();

    if(error) {
      throw error
    }

    if(data) {
      console.log(data);
        // Reset form after successful submission
        setCourseTitle("");
        setCourseCode("");
        setCourseLecturer("");
        setYear("");
        setImageFile(null);
        alert("Data submitted successfully!");
    }
    } catch (error) {
      console.error('error:', error);
      alert('An error occured:', error)
    }

  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex ">
      <form onSubmit={handleSubmit} className="flex flex-col m-auto w-fit gap-[10px]">

      <h2 className="font-bold text-xl">Add Exam Question Here</h2>
        <label className="flex flex-col">
          Course Lecturer
          <input
            className="bg-gray-200 p-2 w-[13rem] sm:w-[21rem]"
            type="text"
            placeholder="Introduction to communication"
            value={courseTitle}
            onChange={(e) => {
              setCourseTitle(e.target.value);
            }}
            required
          />
        </label>

        <label className="flex flex-col">
          Course Code
          <input
            className="bg-gray-200 p-2 w-[13rem] sm:w-[21rem]"
            type="text"
            placeholder="COM 111"
            value={courseCode}
            onChange={(e) => {
              setCourseCode(e.target.value);
            }}
            required
          />
        </label>

        <label className="flex flex-col">
          course Lecturer
          <input
            className="bg-gray-200 p-2 w-[13rem] sm:w-[21rem]"
            type="text"
            placeholder="Prof. John Doe"
            value={courseLecturer}
            onChange={(e) => {
              setCourseLecturer(e.target.value);
            }}
            required
          />
        </label>

        <label className="flex flex-col">
          Year
          <input
            className="bg-gray-200 p-2 w-[13rem] sm:w-[21rem]"
            type="text"
            placeholder="2020/2021"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
            }}
            required
          />
        </label>

        <label className="flex flex-col">
          Image
          <input
            className="bg-gray-200 p-2 w-[13rem] sm:w-[21rem]"
            type="file"
            accept="image/jpeg"
            onChange={handleImageChange}
            required
          />
          <p className="font-extralight text-xs">please make sure to upload a jpg</p>
        </label>

        <button className="bg-gray-200 w-[100px] rounded p-[5px] self-center mt-[20px] hover:bg-gray-400 active:bg-gray-200" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Update;
