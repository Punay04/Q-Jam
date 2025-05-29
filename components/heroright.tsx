"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT: typeof YT;
  }
}

interface NowPlayingTrack {
  youtubeId: string;
  title: string;
  artist: string;
  voteCount: number;
  upvotes: number;
  downvotes: number;
}

const HeroRight = () => {
  const ref = useRef<HTMLInputElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const [nowPlaying, setNowPlaying] = useState<NowPlayingTrack | null>(null);
  const [playerReady, setPlayerReady] = useState<boolean>(false);

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!ref.current || ref.current.value.trim() === "") {
      alert("Please enter a valid YouTube link.");
      return;
    }

    const youtubeId = extractYouTubeId(ref.current.value.trim());
    if (!youtubeId) {
      alert("Invalid YouTube URL");
      return;
    }

    try {
      await axios.post("/api/track", { youtubeId });
      alert("Track added!");
    } catch {
      alert("Error adding track. It might already exist.");
    }

    ref.current.value = "";
    ref.current.focus();
  }

  async function loadNowPlaying() {
    try {
      const res = await axios.get("/api/nowplaying");
      setNowPlaying(res.data.nowPlaying);
    } catch {
      setNowPlaying(null);
    }
  }

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setPlayerReady(true);
      };
    } else {
      setPlayerReady(true);
    }
  }, []);

  // Initialize and manage YouTube player
  useEffect(() => {
    if (!playerReady || !nowPlaying?.youtubeId) return;

    try {
      if (playerRef.current) {
        playerRef.current = new (window.YT as typeof YT).Player(
          "youtube-player"
        );
      } else {
        playerRef.current = new (window.YT as any).Player("youtube-player", {
          height: "360",
          width: "640",
          videoId: nowPlaying.youtubeId,
          playerVars: {
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
            controls: 0, // 🔒 Hide controls (no pause/seek)
            disablekb: 1, // 🔒 Disable keyboard controls
          },
          events: {
            onReady: (event: YT.PlayerEvent) => {
              event.target.playVideo();
            },
            onStateChange: (event: YT.OnStateChangeEvent) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                loadNowPlaying();
              }
            },
            onError: (event: YT.OnErrorEvent) => {
              console.error("YouTube Player Error:", event);
              loadNowPlaying(); // Load next song on error
            },
          },
        });
      }
    } catch (error) {
      console.error("Error initializing YouTube player:", error);
    }
  }, [playerReady, nowPlaying]);

  useEffect(() => {
    loadNowPlaying();
  }, []);

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-pink-900/20">
      <h1 className="text-white text-xl font-medium mb-10">Add a Song</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={ref}
          type="text"
          placeholder="Paste a YouTube link here"
          className="bg-gray-800 p-2 w-full rounded-md text-gray-200 border-1"
        />
        <button
          className="text-gray-100 bg-pink-600 w-full mt-2 rounded-md p-2 cursor-pointer font-medium"
          type="submit"
        >
          Add to Queue
        </button>
      </form>

      <div className="mt-10">
        <h1 className="text-white text-xl font-medium mb-5">Now Playing</h1>
        {nowPlaying ? (
          <div className="bg-black/30 p-4 rounded-lg border border-pink-900/10">
            <h2 className="text-white font-semibold">{nowPlaying.title}</h2>
            <p className="text-pink-400 text-sm">{nowPlaying.artist}</p>
            <p className="text-gray-400 text-xs mt-1">
              Votes: {nowPlaying.voteCount} (▲ {nowPlaying.upvotes} / ▼{" "}
              {nowPlaying.downvotes})
            </p>
            <div className="mt-4 relative w-full aspect-video rounded-lg overflow-hidden">
              <div
                id="youtube-player"
                className="absolute inset-0 w-full h-full rounded-lg"
              />
            </div>
          </div>
        ) : (
          <div className="bg-black/30 p-6 rounded-lg border border-pink-900/10 text-center">
            <p className="text-gray-400">No song is currently playing</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroRight;
