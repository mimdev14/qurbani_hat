"use client";

import { authClient } from "@/lib/auth-client";

/**
 * Thin wrapper around the Better Auth React client so the rest of the
 * app can use one consistent shape: { user, loading, ...actions }.
 */
const useAuth = () => {
  const { data, isPending } = authClient.useSession();

  const registerUser = ({ name, email, password, image }) =>
    authClient.signUp.email({ name, email, password, image: image || undefined });

  const loginUser = (email, password) => authClient.signIn.email({ email, password });

  const googleLogin = () => authClient.signIn.social({ provider: "google", callbackURL: "/" });

  const logoutUser = () => authClient.signOut();

  const updateUserProfile = ({ name, image }) => authClient.updateUser({ name, image });

  return {
    user: data?.user || null,
    loading: isPending,
    registerUser,
    loginUser,
    googleLogin,
    logoutUser,
    updateUserProfile,
  };
};

export default useAuth;
