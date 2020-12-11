import React from 'react';
import {Modal} from 'antd';
const WinnerModal = (props) => {
    return(
      <Modal
        visible={true}
        maskClosable={true}
        onCancel={props.onCancel}
        onOk={props.onOk}
        title={<h2 className="font-Arvo text-xl bold mb-2">You're a Winner Baby!!!</h2>}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
          You could pay again if you'd like
      </Modal>
    )
}

export default WinnerModal;