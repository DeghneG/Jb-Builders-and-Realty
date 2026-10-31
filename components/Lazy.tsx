"use client";
import dynamic from "next/dynamic";

// Loaded after the page is interactive, so they never compete with the hero for bandwidth or main-thread time.
export const Chatbot = dynamic(() => import("./Chatbot"), { ssr: false });
export const Cursor = dynamic(() => import("./Cursor"), { ssr: false });
