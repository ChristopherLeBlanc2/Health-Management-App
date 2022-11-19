import React, { useState } from 'react';
import { Select, Modal, Button } from '@mantine/core';
import { TimeInput } from '@mantine/dates';

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