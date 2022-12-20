import React, { useState } from "react";

const useChangeWidth = () => {
  const init = () => {
    if (window.innerWidth < 640) {
      return "xs";
    } else if (window.innerWidth >= 640 && window.innerWidth < 768) {
      return "sm";
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      return "md";
    } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
      return "lg";
    } else if (window.innerWidth >= 1280 && window.innerWidth < 1536) {
      return "xl";
    } else if (window.innerWidth >= 1536) {
      return "2xl";
    }
  };
  const [width, setWidth] = useState(init());

  const changeWidth = () => {
    if (window.innerWidth < 640) {
      setWidth("xs");
    } else if (window.innerWidth >= 640 && window.innerWidth < 768) {
      setWidth("sm");
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      setWidth("md");
    } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
      setWidth("lg");
    } else if (window.innerWidth >= 1280 && window.innerWidth < 1536) {
      setWidth("xl");
    } else if (window.innerWidth >= 1536) {
      setWidth("2xl");
    }
  };

  return { width, changeWidth };
};

export default useChangeWidth;
