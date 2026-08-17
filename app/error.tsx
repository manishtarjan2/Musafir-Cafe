"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      <h2 className="text-2xl font-semibold mb-4 text-[#e8b57a]">Something went wrong!</h2>
      <p className="text-white/70 mb-6 max-w-md">
        We hit a snag while loading this page. This could be due to a slow network connection.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-[#e8b57a] text-black rounded-full font-medium hover:bg-[#f6cd98] transition-colors"
        >
          Try again
        </button>
        <Link 
          href="/"
          className="px-6 py-2 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
