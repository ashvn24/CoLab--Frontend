
import React, { useState } from 'react'
import { Flex, Input } from 'antd';

const Form = ({formData,handleForm=()=>{}}) => {
  const { TextArea } = Input;
  
  return (
    <>
      <Flex vertical gap={43}>
    Title:
    <Input showCount maxLength={20} name='title' style={{height:50}} value={formData.title} onChange={handleForm} className='bg-zinc-800 border-none ' />
    Description:
    <TextArea
      name='description'
      value={formData.description}
      showCount
      maxLength={100}
      onChange={handleForm}
      placeholder="disable resize"
      style={{
        height: 120,
        resize: 'none',
      }}
      className='bg-zinc-800 border-none '
    />
    
    
  </Flex>
    
     </>
  )
}

export default Form
