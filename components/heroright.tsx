"use client";
import axios from "axios";
import { log } from "console";
import React, { useRef } from "react";

const HeroRight = () => {
  const ref = useRef<HTMLInputElement>(null);

  async function nowPlayingTrack() {
    const res = await axios.get("/api/track");
    const data = res.data;
    console.log(data);
  }

  function extractYouTubeId(url: string): string | null {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname === "youtu.be") {
        return parsedUrl.pathname.slice(1);
      } else if (parsedUrl.hostname.includes("youtube.com")) {
        return parsedUrl.searchParams.get("v");
      }
      return null;
    } catch {
      return null;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (ref.current === null || ref.current.value.trim() === "") {
      alert("Please enter a valid YouTube link.");
      return;
    }

    const youtubeId = extractYouTubeId(ref.current.value.trim());
    if (!youtubeId) {
      alert("Invalid YouTube URL");
      return;
    }

    try {
      const res = await axios.post("/api/track", {
        youtubeId,
      });
      alert("Track added!");
    } catch (error) {
      alert("Error adding track. It might already exist.");
    }

    ref.current.value = "";
    ref.current.focus();
  }

  return (
    <div>
      <h1 className="text-white text-xl font-medium mb-10">Add a Song</h1>
      <form action="">
        <input
          ref={ref}
          type="text"
          placeholder="Paste a youtube link here"
          className="bg-gray-800 p-2 w-full rounded-md text-gray-200 border-1"
        />
        <button
          className="text-gray-100 bg-pink-600 w-full mt-2 rounded-md p-2 cursor-pointer font-medium "
          onClick={handleSubmit}
        >
          Add to Queue
        </button>
      </form>
      <div>
        <h1 className="text-white text-xl font-medium mt-10 mb-5">
          Now Playing
        </h1>
        <div className="bg-gray-800 p-4 rounded-md">
          <p className="text-white">No song is currently playing.</p>
        </div>
      </div>
    </div>
  );
};

export default HeroRight;
