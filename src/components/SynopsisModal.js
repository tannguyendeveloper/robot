import {Modal} from 'antd';
const Synopsis = (props) => {
  return(
    <Modal
      visible={true}
      footer={null}
      maskClosable={true}
      onCancel={props.onCancel}
      title={<h2 className="font-Arvo text-xl bold mb-2">Synopsis</h2>}
    >
      <p className="mb-3">
        Your old pal Mr. Robot's controller has a malfunction.
        The down button on your Mr. Robot's controller has worn over time and no longer responds to your button presses.
        Mr. Robot can now only turn left or right and move forward.
        Can you input a sequence of commands to get him to his goal?
      </p>
    </Modal>
  )
}

export default Synopsis;