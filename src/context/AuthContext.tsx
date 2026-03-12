import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signUp: (email: string, name: string) => Promise<void>;
  verifyOTP: (email: string, token: string) => Promise<void>;
  signIn: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          name: session.user.user_metadata?.full_name || "Guest",
        });
      }
      setLoading(false);
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          name: session.user.user_metadata?.full_name || "Guest",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, name: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        data: {
          full_name: name,
        },
      },
    });
    if (error) throw error;
  };

  const signIn = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });
    if (error) throw error;
  };


  const verifyOTP = async (email: string, token: string) => {
    const { error, data } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup',
    });
    
    // If signup verify fails, try magiclink verify (for returning users)
    if (error) {
      const { error: error2 } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'magiclink',
      });
      
      // If magiclink fails, try 'email' type (generic OTP)
      if (error2) {
        const { error: error3 } = await supabase.auth.verifyOtp({
          email,
          token,
          type: 'email',
        });
        if (error3) throw error3;
      }
    }

  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      signUp, 
      signIn, 
      verifyOTP, 
      logout, 
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
