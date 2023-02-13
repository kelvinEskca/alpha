import React, { useState } from "react";

const SlideShow = ({ url }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const handleMouseEnter = () => {
    setIntervalId(setInterval(() => nextImage(), 1));
  };

  const handleMouseLeave = () => {
    clearInterval(intervalId);
    setCurrentImage(0);
  };

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % url.length);
  };

  return (
    <img
      src={url[currentImage]}
      className="imageOne"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      alt={url}
    />
  );
};

export default SlideShow;
