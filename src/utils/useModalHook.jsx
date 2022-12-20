import React, { useState } from "react";

const useModalHook = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return { visible, showModal, closeModal };
};

export default useModalHook;
