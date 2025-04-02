import React, { useState } from "react";
import { HiEye } from "react-icons/hi";
import { HiEyeOff } from "react-icons/hi";
import { FaGoogle } from "react-icons/fa";
import supabase from "../config/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

const SignInCard = () => {
    const [password, setPasspword] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
  
        if (data.session) {
          navigate('/home')
        }
  
        if (error) {
          console.error("Sign in failed:", error.message);
          alert(`Sign in failed: ${error.message}`);
          console.log(data);
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
          onSubmit={handleSubmit}
          className="flex flex-col w-[70%] sm:w-[60%] lg:w-[40%] shadow-lg p-[20px] sm:px-[60px] gap-6 sm:gap-4 border-2 border-gray-200"
        >
          <h2 className="text-gray-500     text-center text-3xl">Sign-in  Here</h2>
    
          <input
            className="bg-gray-200 p-2 w-[13rem] sm:w-[21rem] self-center"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
    
          <div className="relative w-fit self-center">
            <input
              className="bg-gray-200 p-2 w-[13rem] sm:w-[21rem] self-center"
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
            Sign In
          </button>

          <div>
                <p className="text-gray-500 text-center text-sm">
                  Don't have an account?{" "}
                  <Link to={'/signup'} className="text-blue-500 underline">Sign Up</Link>
                </p>
  
            </div>
        </form>
  )
}

export default SignInCard
