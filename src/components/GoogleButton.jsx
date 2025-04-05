import React from "react";
import supabase from "../config/supabaseClient";
import { FaGoogle } from "react-icons/fa";

const GoogleButton = () => {
    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin + '/auth/callback',
          }
        });
    
        if (error) console.error('Google login error:', error);
      };

  return (
    <button className="cursor-pointer" onClick={handleGoogleLogin}>
      <FaGoogle size={25} />
    </button>
  );
};

export default GoogleButton;
