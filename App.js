import React, { useEffect, useState } from 'react';
import './App.css';
import { Grid, TextField, FormControl, Button } from '@material-ui/core';
import firebase from './firebase';
import DeleteIcon from '@material-ui/icons/Delete';

function App() {
  const [users, setUsers] = useState([]);

  const register = firebase.firestore().collection("register");

  function getUsers(){
    register.onSnapshot((querySnapshot) => {
      const item = [];
      querySnapshot.forEach((doc) =>{
        item.push(doc);
      })
      setUsers(item);
    })
  }

  useEffect(() => {
    getUsers();
  }, []);


function Submitlist(){
  // alert('hi');
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let contact = document.getElementById('contact').value;
  register.add({
    Name:name,
    Email:email,
    Password:password,
    Contact:contact
  }).then(function(success){
    alert('yes');
  }).catch(function(error){
    alert('No');
  })
}

function deleteUser(x) {
  register.doc(x).delete().then(function(success){
    alert('yes');
  }).catch(function(error){
    alert('no');
  })
}


  return (
    <div className="App">
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <FormControl>
          <TextField className="form-control" id="name" label="Name" variant="outlined" />
          <TextField className="form-control" id="email" label="Email" variant="outlined" />
          <TextField className="form-control" id="password" label="Password" variant="outlined" />
          <TextField className="form-control" id="contact" label="Contact" variant="outlined" />
          <Button variant="outlined" onClick={Submitlist} color="primary">Submit</Button>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <table className="table">
          <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Password</td>
              <td>Contact</td>
            </tr>
            {
              users.map((userss) => (
                <tr key={userss.id}>
                <td>{userss.data().Name}</td>
                <td>{userss.data().Email}</td>
                <td>{userss.data().Password}</td>
                <td>{userss.data().Contact}</td>
                <td><Button onClick={() => deleteUser(userss.id)}><DeleteIcon /></Button></td>
              </tr>  
              ))
            }
          </table>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
