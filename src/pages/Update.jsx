import React, { useEffect } from "react";
import { useState } from "react";
import supabase from "../config/supabaseClient";


const Update = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseLecturer, setCourseLecturer] = useState("");
  const [session, setSession] = useState("");
  const [yearOfExam, setYearOfExam] = useState("");
  const [imageFile, setImageFile] = useState(null);


  // function to handle image upload
  async function uploadImage(imageFile, courseCode, year) {
    const fileExt = imageFile.name.slice(
    Math.max(0, imageFile.name.lastIndexOf(".")));
    const fileName = `${courseCode}-${yearOfExam}${fileExt}`

    const {data, error} = await supabase
    .storage
    .from('cms-images')
    .upload(fileName,imageFile)

    if (error){
      console.error(error);
      return null
    }

    // getting the public url of the uploaded image
    const {data: {publicUrl}} = supabase
    .storage
    .from('cms-images')
    .getPublicUrl(fileName);
   

    return fileName;
  }

  //function to check if a question for a certain year is already uploaded
  async function checkIfQuestionExists(courseCode, year) {
    const {data, error} = await supabase
    .from('cms')
    .select('*')
    .eq('courseCode', courseCode)
    .eq('year', year)

    if (error) {
      console.error('error',error.message);
      return false;
    }

    if (data.length > 0) {
      alert(`Question already exists for ${courseCode} in ${year}`);
      return true;
    }
    return false;
  }


// submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const exists = await checkIfQuestionExists(courseCode, session)

      if(exists){
        return
      }

      // upload the image and get its URL
      const fileName = await uploadImage(imageFile, courseCode, session);
    
          // Then insert the data including the image URL
    const {data, error} = await supabase
    .from('cms')
    .insert({courseTitle, courseCode, courseLecturer, year: session, image_url: fileName})
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
        setSession("");
        setImageFile(null);
        alert("Data submitted successfully!");
    }
    } catch (error) {
      console.error('error:', error.message);
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
          Course Title
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
          <p className="text-xs text-red-600">All Caps with Spacing as seen!</p>
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
          session
          <input
            className="bg-gray-200 p-2 w-[13rem] sm:w-[21rem]"
            type="text"
            placeholder="2020/2021"
            value={session}
            onChange={(e) => {
              setSession(e.target.value);
            }}
            required
          />
        </label>

        <label className="flex flex-col">
          Year of exam
          <input
            className="bg-gray-200 p-2 w-[13rem] sm:w-[21rem]"
            type="number"
            placeholder="2020"
            value={yearOfExam}
            onChange={(e) => {
              setYearOfExam(e.target.value);
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
            // required
          />
          <p className="font-extralight text-xs">please make sure to upload a jpg</p>
        </label>

        <button className="bg-gray-200 w-[100px] rounded p-[5px] self-center mt-[20px] hover:bg-gray-400 active:bg-gray-200" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Update;
