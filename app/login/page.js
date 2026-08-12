import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import LoginPageClient from "./page-client";

export const metadata = { title: "Login | QurbaniHat" };

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner label="Loading" />}>
      <LoginPageClient />
    </Suspense>
  );
}
