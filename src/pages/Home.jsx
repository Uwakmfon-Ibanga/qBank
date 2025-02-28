import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";

const Home = () => {
  const [loading, setLoading] = useState(true);

  const [inputValue, setInputValue] = useState("");
  // console.log(supabase)

  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data, error } = await supabase
          .from("cms") // indicates what table in the database you want to fetch from
          .select() // used to retrieve all the data fro the table selected
          .or(
            [
              // .or helps us select from many different colums in a table
              // this searches for the input value in the table courseTitle, code, and lecturer column
              `courseTitle.ilike.%${inputValue}%`,
              `courseCode.ilike.%${inputValue}%`,
              `courseLecturer.ilike.%${inputValue}%`,
            ].join(",")
          );

        if (error) {
          setError(`${error.message}, something went wrong `);
          setQuestions(null);
          setLoading(false);
        }
        if (data) {
          setQuestions(data);
          setError(null);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data");
        setQuestions(null);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [inputValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <section className="flex flex-col min-h-screen items-center pt-[5rem] self-center gap-4">
      <h1>search</h1>
      <input
        className="bg-gray-100 border-2"
        type="text"
        value={inputValue}
        onChange={handleChange}
      />

      {loading && <Skeleton />}

      {error && <p>{error}</p>}

      {questions && (
        <div className="flex gap-6">
          {questions.map((question) => (
            <Card question={question} />
          ))}
        </div>
      )}
    </section>
    </>
  );
};

export default Home;
