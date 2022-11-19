import React, { useState, useEffect } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import { Tabs, Input } from '@mantine/core';
import { useId } from '@mantine/hooks';
import InputMask from 'react-input-mask';
import axios from 'axios';
import './App.css';
import Title from './Title.jsx';
import UsersMedications from './UsersMedications.jsx'


/*
finish FE inputs
fill in the states with axios calls
addUsersMedication process
make sure FE is functional
hash the passwords process
session handlers and tokens sent (api authorization) tokens
  possible corner cut of storing session in state
    but not that much more work tbh
git action to look for times
twillio to send out notifications
*/


const App = (props) => {

  const [opened, setOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState()
  const [allMedications, setAllMedications] = useState([])
  const [usersMedications, setUsersMedications] = useState([])
  const [logInInput, setLogInInput] = useState({
    userName: '',
    password: ''
  })
  const [signUpInput, setSignUpInput] = useState({
    userName: '',
    password: '',
    cell: ''
  })

  useEffect(() => {
    axios.get('http://localhost:3000/getAllMeds')
    .then((response) => {
      const mappedMedications = response.data.map((medication) => {
        return {label: medication.medication_name,
                value: medication.medication_id.toString(),
        }
      })
      setAllMedications(mappedMedications)
    })
  }, [])

/*{
  headers: {
    Authorization: Bearer ${token}
  }
}
*/



const handleLogInChange = (e) => {
  const {name, value} = e.target;
  setLogInInput((state) => ({
    ...state,
    [name]: value
  }));
}

const handleLogInClick = async () => {
    const result = await axios.post('http://localhost:3000/userLogIn', {
        username: logInInput.userName,
        password: logInInput.password
    })
    document.cookie = `token=${result.data.token}`
}

const handleSignUpChange = (e) => {
  const {name, value} = e.target;
  setSignUpInput((state) => ({
    state,
    [name]: value
  }));
}


const handleSignUpClick = async () => {
  const result = await axios.post('http://localhost:3000/addUser', {
    data: {
      username: signUpInput.userName,
      password: signUpInput.password,
      cell: signUpInput.cell
    }
  })
  console.log(result)
  document.cookie = `token=${result.data}`
}


  return (
    <>
    <div>
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Welcome!"
      >
        <Tabs variant="outline" defaultValue="gallery">
          <Tabs.List>
            <Tabs.Tab value="logIn" >Log In</Tabs.Tab>
            <Tabs.Tab value="signUp" >Sign Up</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="logIn" pt="xs">
              <Input.Wrapper label="Your Username" required>
                <Input  placeholder="Your Username" type='text' id='userName' name='userName' value={logInInput.user_name} onChange={handleLogInChange} />
              </Input.Wrapper>
              <Input.Wrapper label="Your Password" required>
                <Input  placeholder="Your Password" type='text' id='password' name='password' value={logInInput.password} onChange={handleLogInChange}/>
              </Input.Wrapper>
              <Button variant="outline" uppercase onClick={handleLogInClick}>
                Log In
              </Button>
          </Tabs.Panel>

          <Tabs.Panel value="signUp" pt="xs">
            <Input.Wrapper label="Your Username" required>
              <Input  placeholder="Your Username" type='text' id='signUpUserName' name='signUpUserName' value={signUpInput.user_name} onChange={handleSignUpChange} />
            </Input.Wrapper>
            <Input.Wrapper label="Your Password" required>
              <Input  placeholder="Your Password" type='text' id='signUpPassword' name='signUpPassword' value={signUpInput.password} onChange={handleSignUpChange}/>
            </Input.Wrapper>
            <Input.Wrapper label="Your phone" required>
              <Input component={InputMask} mask="+1 (999) 999-9999"  placeholder="Your phone" type='text' id='cell' name='cell' value={signUpInput.cell} onChange={handleSignUpChange} />
            </Input.Wrapper>
            <Button variant="outline" uppercase onClick={handleSignUpClick}>
              Sign Up
            </Button>
          </Tabs.Panel>

        </Tabs>
      </Modal>
    </>
    <div className="App">
      <Title setOpened={setOpened}/>
      <UsersMedications
      usersMedications={usersMedications}
      setUsersMedications={setUsersMedications}
      allMedications={allMedications}
      currentUser={currentUser}
      />
    </div>
    </div>
    </>
  )
}

export default App;
