import React from "react";
import { Modal } from "antd";
const LoserModal = (props) => {
  return (
    <Modal
      visible={true}
      maskClosable={true}
      onCancel={props.onCancel}
      onOk={props.onOk}
      title={<h2 className="font-Luckiest-Guy text-xl bold mb-2">You Lose!</h2>}
    >
      You should give it another shot.
    </Modal>
  );
};

export default LoserModal;
