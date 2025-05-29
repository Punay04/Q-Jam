"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const HeroLeft = () => {
  const [upcomingSongs, setUpcomingSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`/api/track`);
        setUpcomingSongs(response.data);
      } catch (error) {
        console.error("Error fetching upcoming songs:", error);
      }
    };
    fetchSongs();
    const intervalId = setInterval(fetchSongs, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const handleVote = async (songId, voteType) => {
    try {
      const response = await axios.post(`/api/vote`, {
        voteType,
        trackId: songId,
      });
      const updatedSongs = await axios.get(`/api/track`);
      setUpcomingSongs(updatedSongs.data);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-pink-900/20">
      <h1 className="text-white font-bold text-2xl mb-6 flex items-center gap-2">
        <span className="text-pink-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
        </span>
        Upcoming Songs
      </h1>

      <div className="text-gray-300">
        {upcomingSongs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 9l10 10m0-10L9 19M19 12H5"
              />
            </svg>
            <p>No upcoming songs in queue</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {upcomingSongs.map((song) => (
              <li
                key={song._id}
                className="bg-black/30 p-4 rounded-lg border border-pink-900/10 hover:border-pink-500/20 transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => handleVote(song._id, "upvote")}
                        className="text-pink-500 hover:text-pink-400 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <span className="font-medium text-sm">
                        {song.voteCount || 0}
                      </span>
                      <button
                        onClick={() => handleVote(song._id, "downvote")}
                        className="text-pink-500 hover:text-pink-400 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{song.title}</h3>
                      <p className="text-sm text-pink-400">{song.artist}</p>
                    </div>
                  </div>
                  <span className="text-pink-500/70">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {song.hasVoted && (
                      <p className="text-xs text-green-400 mt-1">
                        You have voted
                      </p>
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HeroLeft;
