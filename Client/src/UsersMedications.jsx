import React, { useState, useEffect } from 'react'
import { Select, Modal, Button, Group } from '@mantine/core';
import UsersMedicationsCard from './UsersMedicationsCard.jsx';
import { TimeInput } from '@mantine/dates';
import axios from 'axios';


const UsersMedications = (props) => {

  const [opened, setOpened] = useState(false);
  // const [medications, setMedications] = useState([]);
  const [medicationChoice, setMedicationChoice] = useState();
  const [notificationTime, setNotificationTime] = useState();
  console.log(notificationTime)
  useEffect(() => {
    axios.get('http://localhost:3000/getUserMeds')
    .then((response) => {
      props.setUsersMedications(response.data)
    })
  }, [])

  const addMedication = () => {
    axios.post('http://localhost:3000/addUserMedication', {medication: medicationChoice, notificationTime: convertTime(notificationTime)})
    .then(() => {
      axios.get('http://localhost:3000/getUserMeds')
      .then((response) => {
        props.setUsersMedications(response.data)
    })
    })
  }

const convertTime = (date) => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const timezone = (date.getTimezoneOffset() / 60).toString();

  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}-${timezone.padStart(2, "0")}-00`;
  };

  return (
    <>
    <div>
    <h2>Your Notification Settings</h2>
    <Button onClick={() => setOpened(true)}>Add Notification</Button>
    <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Medication"
      >
        <Select
          label="Medications"
          data={props.allMedications}
          placeholder="Select Medication"
          nothingFound="Nothing found"
          searchable
          creatable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            setMedicationChoice(query)
          }}
          onChange={(query) => {
            setMedicationChoice(query)
          }}
        />
        <TimeInput label="Pick time" format="12" defaultValue={new Date()} onChange={setNotificationTime} value={notificationTime} />
        <Button onClick={addMedication}>Submit</Button>
      </Modal>
      {props.usersMedications.map((usersMedication) => {
        const medicationName = props.allMedications.find((medication) => {
          return medication.value === usersMedication.medication_id
        })
        return <UsersMedicationsCard notificationTime={usersMedication.notificationTime} medicationName={medicationName.label} />
      })
      }
    </div>
    </>
  )
}

export default UsersMedications;