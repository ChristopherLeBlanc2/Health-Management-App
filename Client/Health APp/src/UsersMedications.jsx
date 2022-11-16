import React from 'react'
import { Modal, Button, Group } from '@mantine/core';
import UsersMedicationsCard from './UsersMedicationsCard.jsx';

const UsersMedications = (props) => {

  return (
    <>
    <div>
      <h2>Your Notification Settings</h2>
      {usersMedications.map((medication) => {
        return <UsersMedicationsCard medication={medication}/>
      })
      }
    </div>
    <Button variant="outline">Add Notification</Button>
    </>
  )
}

export default UsersMedications;