import { useEffect, useState } from "react";
import supabase from "./config/supabaseClient";
import "./App.css";
import Card from "./components/Card";
import Skeleton from "./components/Skeleton";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Update from "./pages/Update";

function App  () {
  const [session, setSession] = useState(null);
  
  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = async () => {

      const storedSession = sessionStorage.getItem("session");
      if (storedSession) {
        setSession(JSON.parse(storedSession));
      } else {
        const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
        return;
      }
      if (data.session) {
        setSession(data.session);
        sessionStorage.setItem("session", JSON.stringify(data.session));
      }
      }
    };

    checkUser();
  }, [navigate]);


  useEffect(() => {
    // Listen for auth state changes (e.g., user logs in/out)
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setSession(session);
        sessionStorage.setItem("session", JSON.stringify(session));
        // Redirect to /home ONLY if the user just signed in
      if (event === "SIGNED_IN") {
        navigate("/home");
      }
      } else {
        setSession(null);
        sessionStorage.removeItem("session");
        navigate("/signin");
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={session ? <Home /> : <SignIn />} />
      {session && <Route path="/home" element={<Home session={session} />}  />}
      <Route path="/signin" element={<SignIn  />} />
      <Route path="/signup" element={<SignUp  />} />
      <Route path="/update" element={<Update  />} />
      {/* <Route path="*" element={<PageNotFound />} />  */}
    </Routes>
  );
}

export default App;
