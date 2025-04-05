// src/pages/AuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        navigate('/login?error=auth_failed');
        return;
      }

      navigate(session?.user ? '/dashboard' : '/login');
    };

    handleAuth();
  }, [navigate]);

  return <div>Loading authentication...</div>;
}