import React, { useState } from "react";
import { Modal } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

const PopupModal = ({ children, visible, onCancel, closable = true, className, style, closeIcon, bodyStyle }) => {
  return (
    <Modal
      bodyStyle={bodyStyle}
      centered={true}
      visible={visible}
      footer={null}
      onCancel={onCancel}
      closable={closable}
      className={className}
      style={style}
      destroyOnClose
      closeIcon={closeIcon ?? <CloseCircleFilled className="text-2xl ml-5" />}
    >
      {children}
    </Modal>
  );
};

export default PopupModal;
