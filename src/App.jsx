import { useEffect, useState } from "react";
import supabase from "./config/supabaseClient";
import "./App.css";
import Card from "./components/Card";
import Skeleton from "./components/Skeleton";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  const [token, setToken] = useState(() => {
    const storedToken = sessionStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : false;
  });
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", JSON.stringify(token));
    }
  }, [token])

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
        return;
      }
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
        setToken(data.session.access_token);
      }
    };

    checkUser();

    // Listen for auth state changes (e.g., user logs in/out)
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session) {
        setToken(session.access_token  || null);
        setUser(session.user); // Store new user info when logged in
      } else {
        setUser(null);
    navigate("/signin");
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <Routes>
      
      {token && <Route path="/home" element={<Home user={user} />} />}
      <Route path="/signin" element={<SignIn setToken={setToken} />} />
      <Route path="/" element={<SignUp setToken={setToken} />} />
      {/* <Route path="*" element={<PageNotFound />} />  */}
    </Routes>
  );
}

export default App;
