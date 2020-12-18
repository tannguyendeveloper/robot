import { GRID_MIN_WIDTH, GRID_MIN_HEIGHT, GRID_MAX_WIDTH, GRID_MAX_HEIGHT } from '../config';
import { Modal, Form, InputNumber } from 'antd';
import useFormData from '../hooks/useFormData';

const RobotForm = (props) => {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    const { values, setKeyValue } = useFormData(props.defaultSettings); 
    const handleOk = () => {
      props.onOk(values);
    }
    return(
      <Modal
        visible={true}
        maskClosable={true}
        onOk={handleOk}
        onCancel={props.onCancel}
        title={<h2 className="font-Luckiest-Guy text-xl bold mb-2">Game Settings</h2>}
      >
        <Form layout={layout} className="flex" initialValues={props.settings}>
            <Form.Item
              { ...layout }
              name="gridWidth"
              className="w-1/2"
              label="Grid Width"
              children={
                <InputNumber
                  name="gridWidth"
                  min={GRID_MIN_WIDTH}
                  max={GRID_MAX_WIDTH}
                  onChange={(val) => setKeyValue('gridWidth', val)} 
                />
              }
            />
            <Form.Item
              { ...layout }
              name="gridHeight"
              className="w-1/2"
              label="Grid Height"
              children={
                <InputNumber
                  min={GRID_MIN_HEIGHT}
                  max={GRID_MAX_HEIGHT}
                  name="gridHeight"
                  onChange={(val) => setKeyValue('gridHeight', val)} 
                />
              }
            />
        </Form>
      </Modal>
    );
}

export default RobotForm;