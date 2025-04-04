import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import ImageModal from "./ImageModal";

const Card = ({ question }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Generate public URL for the image
  const getPublicImageUrl = (path) => {
    const { data } = supabase.storage.from("cms-images").getPublicUrl(path);
    return `${data.publicUrl}?t=${new Date().getTime()}`;
  };
  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="max-w-[250px] p-4 rounded  shadow-xl hover:shadow-gray-500 cursor-pointer"
        key={question.id}
      >
        <div className="w-full h-[200px] rounded">
          <img
            className="w-full h-full rounded"
            src={getPublicImageUrl(question.image_url)}
            alt="Course"
            width="150"
          />
        </div>
        <h2 className="font-semibold">{question.courseTitle}</h2>
        <p>{question.courseCode}</p>
        <p>{question.courseLecturer}</p>
        <p>{question.year}</p>
      </div>

      {/* Conditionally render modal */}
      {isModalOpen && (
        <ImageModal
          imageUrl={getPublicImageUrl(question.image_url)}
          onClose={() => setIsModalOpen(false)}
          questionDetails={{
            courseTitle: question.courseTitle,
            courseCode: question.courseCode,
            year: question.year,
          }}
        />
      )}
    </>
  );
};

export default Card;
