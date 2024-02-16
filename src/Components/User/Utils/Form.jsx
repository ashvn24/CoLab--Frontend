import React from 'react';
import { Flex, Input, Typography } from 'antd';
import Uploadimage from './Upload';
const { TextArea } = Input;
const onChange = (e) => {
  console.log('Change:', e.target.value);
};
const Form = () => (
  <Flex vertical gap={43}>
    Title:
    <Input showCount maxLength={20} style={{height:50}} onChange={onChange} className='bg-zinc-800 border-none ' />
    Description:
    <TextArea
      showCount
      maxLength={100}
      onChange={onChange}
      placeholder="disable resize"
      style={{
        height: 120,
        resize: 'none',
      }}
      className='bg-zinc-800 border-none '
    />
    Upload Media:
    <Uploadimage />
    
  </Flex>
);
export default Form;