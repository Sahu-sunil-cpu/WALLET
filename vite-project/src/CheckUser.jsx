import * as React from 'react';

import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./global.css"





export default function CheckUser({ userPassword }) {

  const [showPassword, setShowPassword] = React.useState(false);
  const [text, newText] = React.useState("");
  const [Password, setPassword] = React.useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  const changeHandler = (event) => {
    newText(event.target.value);
  }


  const eventHandler = () => {


    const pword = text;
    userPassword(pword);
    //  console.log("text   " + text + "password" + Password)

    newText("");

  }


  const keyEventhandler = (event) => {
    // console.log(event.key)
    if (event.key == "Enter") {
      const pword = text;
      userPassword(pword);
      //  console.log("text   " + text + "password" + Password)

      newText("");
    }
  }

  return (
    <>
     
      <div   style={{
        height: "100vh",
        width: "100%",
       
       
      //  borderRadius: "10px",
        margin: "0 auto",
       
        textAlign: "center",
        backdropFilter: " blur(200px)",




      }}>
        <br></br>  <br></br>  <br></br>
        <h2 style={{  fontSize: "30px" }}>Create Password To Create Wallet</h2>


        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={changeHandler}
            onKeyDown={keyEventhandler}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />

          <br></br> <br></br>
          <button onClick={eventHandler} >Create</button>

        </FormControl>


      </div>
    </>
  )
}