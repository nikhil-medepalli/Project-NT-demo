"use client";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import api from "../lib/axios";

let isInterceptorRegistered = false;

function useAuthReq() {
  const { isSignedIn, getToken, isLoaded } = useAuth();

  // Keep latest values in refs so the interceptor never goes stale
  // const isSignedInRef = useRef(isSignedIn);
  // const getTokenRef = useRef(getToken);
  // isSignedInRef.current = isSignedIn;
  // getTokenRef.current = getToken;

  // useEffect(() => {
  //   if (isInterceptorRegistered) return;
  //   isInterceptorRegistered = true;

  //   const interceptor = api.interceptors.request.use(async (config) => {
  //     if (isSignedInRef.current) {
  //       const token = await getTokenRef.current();
  //       if (token) {
  //         config.headers.Authorization = `Bearer ${token}`;
  //       }
  //     }
  //     return config;
  //   });

  //   return () => {
  //     api.interceptors.request.eject(interceptor);
  //     isInterceptorRegistered = false;
  //   };
  // }, []);

  // return { isSignedIn, isClerkLoaded: isLoaded };
  useEffect(() => {
    const interceptor = api.interceptors.request.use(async (config) => {
      if(isSignedIn) {
        const token = await getToken();
        if(token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    })

    return () => {
      api.interceptors.request.eject(interceptor);
    }
  }, [isSignedIn, getToken])

  return { isSignedIn, isClerkLoaded: isLoaded };
}

export default useAuthReq;
