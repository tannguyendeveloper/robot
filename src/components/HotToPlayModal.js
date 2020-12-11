import React from 'react';
import {Modal} from 'antd';
const HowToPlay = (props) => {
    return(
      <Modal
        visible={true}
        footer={null}
        maskClosable={true}
        onCancel={props.onCancel}
        title={<h2 className="font-Arvo text-xl bold mb-2">How to play</h2>}
      >
        <p className="mb-3">At the start of a new game, Mr. Robot and his Goal are randomly placed on the grid.</p>
        <p className="mb-3">Win by guiding Mr Robot to his goal indicated on the grid.</p>
        <p className="mb-3">The game is lost if Mr. Robot steps off the grid or does not reach his goal after completing your commands.</p>
        <p className="mb-3">Mr. Robot's kinda primative and dumb (he's definitely not Wall-e) and will only respond to a sequence of commands entered on his controller. He's also kinda stubborn so he'll only accept one sequence of commands. You can only submit your commands once.<br /></p>
        <p className="mb-3">Don't make a miscalculation, once you've pressed a button it will be added to the command sequence sequence and can't be undone.</p>
      </Modal>
    )
}

export default HowToPlay;