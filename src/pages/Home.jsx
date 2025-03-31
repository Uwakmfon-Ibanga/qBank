import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";
import { useNavigate } from "react-router-dom";

const Home = ({ session }) => {
  const [loading, setLoading] = useState(true);

  const [inputValue, setInputValue] = useState("");
  console.log(session);

  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();

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

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
      
      sessionStorage.removeItem("session");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <button
        className="bg-gray-300 p-2 mt-2 ml-3 rounded"
        onClick={handleLogout}
      >
        log out
      </button>
      <section className="flex flex-col min-h-screen items-center pt-[5rem] self-center gap-4">
        <h1>welcome {session.user.email}</h1>
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3">
            {questions.map((question, id) => (
              <Card question={question} key={id} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
