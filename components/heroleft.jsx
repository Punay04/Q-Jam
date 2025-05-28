import axios from "axios";
import React from "react";

const HeroLeft = async () => {

  const url = process.env.BASE_URL;

  // const upcomingSongs = await axios.get(`${url}/api/track`);

  return (
    <div>
      <h1 className="text-white font-semibold text-2xl">Upcoming Songs</h1>
      <div>

      </div>
    </div>
  );
};

export default HeroLeft;
