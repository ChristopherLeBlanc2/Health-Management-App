import React from 'react';
import { Button } from '@mantine/core';

const Title = (props) => {



  return (
    <div className='title'>
      <h1>Welcome to your Health Managment App!</h1>
      <span>
        <Button onClick={() => props.setOpened(true)}>Log On/Sign Up</Button>
      </span>
      <span>
        <Button >Log Off</Button>
      </span>
    </div>
  )
}

export default Title