"use client";
import CoreDifference from "@/components/landingpage/CoreDifference";
import Footer from "@/components/landingpage/Footer";
import HeroSection from "@/components/landingpage/HeroSection";
import HowItWorks from "@/components/landingpage/HowItWorks";
import useAuthReq from "@/hooks/useAuthReq";
import useUserSync from "@/hooks/useUserSync";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Page() {
  const { isSignedIn, isClerkLoaded } = useAuthReq();
  useUserSync();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("auth") === "required") {
      toast.warning("Please sign in to access that page.");
      window.history.replaceState({}, "", "/");
    }
  }, []);

  if (!isClerkLoaded) return null;

  return (
    <>
      <HeroSection />
      <CoreDifference />
      <HowItWorks />
      <Footer />
    </>
  );
}
