import React, { useState } from "react";
import { HiEye } from "react-icons/hi";
import { HiEyeOff } from "react-icons/hi";
import { FaGoogle } from "react-icons/fa";
import supabase from "../config/supabaseClient";
import { Link } from "react-router-dom";

const SignUpCard = () => {
  const [password, setPasspword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (data.user) {
        console.log("success", data);
        alert("check your email  for verification link");
      }

      if (data.session) {
        console.log(data.session)
          navigate('/home')
      }

      if (error) {
        console.error("Supabase Error:", error.message);
        alert(`Sign-up failed: ${error.message}`);
        return;
      }
    } catch (error) {
      console.error("Supabase Error:", error.message);
      alert(`Sign-up failed: ${error.message}`);
      return;
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="flex flex-col w-[70%] shadow-lg p-[20px] gap-6 border-2 border-gray-200"
    >
      <h2 className="text-gray-500     text-center text-3xl">Sign Up Here</h2>

      <input
        className="bg-gray-200 p-2"
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        required
      />

      <div className="relative w-fit">
        <input
          className="bg-gray-200 p-2"
          type={showPassword ? "text" : "password"}
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPasspword(e.target.value);
          }}
          required
        />

        <button
          className="absolute right-2 top-2/6"
          type="button"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <HiEye /> : <HiEyeOff />}
        </button>
      </div>

      <button className="cursor-pointer">
        <FaGoogle size={25} />
      </button>

      <button
        className="bg-gray-200 p-2 w-fit self-end cursor-pointer"
        type="submit"
      >
        Sign Up
      </button>

      <div>
                <p className="text-gray-500 text-center text-sm">
                  Don't have an account?{" "}
                  <Link to={"/signin"} className="text-blue-500 underline">Sign-in</Link>
                </p>
  
            </div>
    </form>
  );
};
export default SignUpCard;
