import { useEffect, useState } from "react";
import supabase from "./config/supabaseClient";
import "./App.css";
import Card from "./components/Card";
import Skeleton from "./components/Skeleton";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="*" element={<PageNotFound />} />  */}
    </Routes>
  );
}

export default App;
