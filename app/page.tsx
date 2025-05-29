import Navbar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <ClerkProvider>
      <div className="bg-black min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-900/10 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />

        <Navbar />

        <main className="relative z-10">
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                <span className="text-white">Welcome to </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-600">
                  Q-Jam
                </span>
              </h1>

              <div className="space-y-4">
                <p className="text-xl text-gray-300">
                  Your personal music queue manager.
                </p>
                <p className="text-gray-400 text-lg">
                  Create collaborative playlists, vote on songs, and enjoy music
                  together.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <Link
                  href="/signin"
                  className="w-full sm:w-auto px-8 py-3 bg-pink-600 text-white rounded-lg 
                    hover:bg-pink-700 transition-all duration-200 font-medium text-center"
                >
                  Get Started
                </Link>
                <Link
                  href="#features"
                  className="w-full sm:w-auto px-8 py-3 border border-pink-500/20 text-white 
                    rounded-lg hover:bg-pink-500/10 transition-all duration-200 text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Features Section */}
            <div id="features" className="mt-32">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-pink-900/20
                      hover:border-pink-500/30 transition-all duration-200"
                  >
                    <div className="h-12 w-12 text-pink-500 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works Section */}
            <div className="mt-32">
              <h2 className="text-3xl font-bold text-white text-center mb-12">
                How Q-Jam Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="text-pink-500 text-2xl font-bold">
                      01.
                    </span>
                    <div>
                      <h3 className="text-white text-xl font-semibold mb-2">
                        Create Your Room
                      </h3>
                      <p className="text-gray-400">
                        Start a new music room and invite your friends to join.
                        Each room has its own unique queue.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-pink-500 text-2xl font-bold">
                      02.
                    </span>
                    <div>
                      <h3 className="text-white text-xl font-semibold mb-2">
                        Add Songs
                      </h3>
                      <p className="text-gray-400">
                        Paste any YouTube link to add songs to the queue. Simple
                        and quick!
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-pink-500 text-2xl font-bold">
                      03.
                    </span>
                    <div>
                      <h3 className="text-white text-xl font-semibold mb-2">
                        Vote & Play
                      </h3>
                      <p className="text-gray-400">
                        Vote on songs to decide what plays next. The most voted
                        songs rise to the top.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-pink-900/20">
                  <div className="aspect-video rounded-lg overflow-hidden bg-pink-900/20 flex items-center justify-center">
                    <span className="text-pink-500">
                      {/* Preview Image or Video Placeholder */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ClerkProvider>
  );
};

const features = [
  {
    title: "Collaborative Queue",
    description:
      "Create a shared music queue where everyone can contribute and vote on songs.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 4v16m8-8H4"
        />
      </svg>
    ),
  },
  {
    title: "Real-time Voting",
    description:
      "Democratic song selection with instant vote updates. Most voted songs play first.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 11l5-5m0 0l5 5m-5-5v12"
        />
      </svg>
    ),
  },
  {
    title: "YouTube Integration",
    description:
      "Add any YouTube song to your queue with just a link. No downloads needed.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
        />
      </svg>
    ),
  },
];

export default Page;
