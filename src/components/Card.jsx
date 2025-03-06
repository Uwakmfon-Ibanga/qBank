import React, { useState } from 'react'
import supabase from '../config/supabaseClient';

const Card = ({question}) => {


    // Generate public URL for the image
  const getPublicImageUrl = (path) => {
    const { data } = supabase.storage.from("cms-images").getPublicUrl(path);
    // return data.publicUrl;
    return `${data.publicUrl}?t=${new Date().getTime()}`;

  };
  return (
    <div className='max-w-[250px] p-4 rounded  shadow-xl' key={question.id}>
        <div className='w-full h-[200px] rounded'>
              <img className='w-full h-full rounded' src={getPublicImageUrl(question.image_url) } alt="Course" width="150" />
              </div>
              <h2 className='font-semibold'>{question.courseTitle}</h2>
              <p>{question.courseCode}</p>
              <p>{question.courseLecturer}</p>
              <p>{question.year}</p>
            </div>
  )
}

export default Card
