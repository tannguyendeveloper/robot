import React from 'react';
import {Modal} from 'antd';
const WinnerModal = (props) => {
    return(
      <Modal
        visible={true}
        maskClosable={true}
        onCancel={props.onCancel}
        onOk={props.onOk}
        title={<h2 className="font-Luckiest-Guy text-2xl bold text-tulip-tree-600">You're a Winner Baby!!!</h2>}
      >
          You could pay again if you'd like
      </Modal>
    )
}

export default WinnerModal;