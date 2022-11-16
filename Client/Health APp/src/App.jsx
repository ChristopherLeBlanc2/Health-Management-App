import React, { useState, useEffect } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import { Tabs, Input } from '@mantine/core';
import { useId } from '@mantine/hooks';
import InputMask from 'react-input-mask';
import axios from 'axios';
import './App.css';
import Title from './Title.jsx';
import UsersMedications from './UsersMedications.jsx'


const App = (props) => {

  const [opened, setOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState()
  const [allMedications, setAllMedications] = useState([])
  const [usersMedications, setUsersMedications] = useState([])
  const [logInInput, setLogInInput] = useState({
    user_name: '',
    hashedPW: ''
  })
  const [signUpInput, setSignUpInput] = UseState({
    user_name: '',
    hashedPW: '',
    cell: ''
  })

const handleLogInChange = (e) => {
  const {name, value} = e.target;
  setLogInInput((state) => ({
    state,
    [name]: value
  }));
}

const handleLogInClick = (e) => {

}

const handleSignUpChange = (e) => {
  const {name, value} = e.target;
  setSignUpInput((state) => ({
    state,
    [name]: value
  }));
}


const handleSignUpClick = (e) => {

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
                <Input  placeholder="Your Password" type='text' id='password' name='password' value={logInInput.hashedPW} onChange={handleLogInChange}/>
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
              <Input  placeholder="Your Password" type='text' id='signUpPassword' name='signUpPassword' value={signUpInput.hashedPW} onChange={handleSignUpChange}/>
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
      setUserMedications={setUserMedications}
      allMedications={allMedications}
      currentUser={currentUser}
      />
    </div>
    </div>
    </>
  )
}

export default App;
