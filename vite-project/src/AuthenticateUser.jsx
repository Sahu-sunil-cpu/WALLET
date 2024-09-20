import * as React from 'react';

import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';






export default function AuthenticateUser({setCheckAuthentcation}){

    const [showPassword, setShowPassword] = React.useState(false);
    const [text, newText] = React.useState("");
    const [pass, setPass] = React.useState("");
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

   const changeHandler = (event) => {
       newText(event.target.value);
      
   }

   const eventHandler = () => {
      setPass(text);
       setCheckAuthentcation(text);
       newText("");
     //  console.log(text)
   }

   
   const keyEventhandler = (event) => {
   // console.log(event.key)
   if(event.key == "Enter"){
    setPass(text);
       setCheckAuthentcation(text);
       newText("");
   }
  }


    return(
        <>
          <div style={{border : "1px solid pink", borderRadius : "5px", padding : "0px 20px 10px 20px"}}>
        
   
        <h3>Wallet Phrase</h3>
        <br />
        <Input
         id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
         onChange={changeHandler}
         onKeyDown={keyEventhandler}
         value={text}
         placeholder='password'
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


           <button style={{marginLeft : "20px"}} onClick={eventHandler}>GO</button>
           
     

      


</div>


        </>
    )
}