import { createClient } from "@/lib/supabase/client";
import { UserMetadata } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type LoginOption = {
  redirectTo?: string;
};

export function useUser() {
  const supabase = createClient();
  const [user, setUser] = useState<UserMetadata | null>();
  const [isLoading, setIsLoading] = useState(true);

  const login = (options?: LoginOption) => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          hd: "ku.th",
          prompt: "select_account",
        },
        redirectTo: options?.redirectTo,
      },
    });
  };

  const logout = () => {
    supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user.user_metadata);
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  return { user, login, logout, isLoading };
}