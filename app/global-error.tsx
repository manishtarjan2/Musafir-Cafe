"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0b090c] text-center px-4 text-white">
          <h2 className="text-3xl font-bold mb-4 text-[#e8b57a]">Fatal Error Occurred</h2>
          <p className="text-white/70 mb-6 max-w-md">
            The application experienced a critical failure. {error.message}
          </p>
          <button
            onClick={() => reset()}
            className="px-8 py-3 bg-[#e8b57a] text-black rounded-full font-medium hover:bg-[#f6cd98] transition-colors"
          >
            Restart Application
          </button>
        </div>
      </body>
    </html>
  );
}
