import * as React from 'react';
import { styled } from '@mui/material/styles';
import "./App.css"
import {useState} from 'react'
import App1 from './Wallet'
import Check from './CheckUser';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });


export default function App() {
    const [userPassword, newUserPassword] = useState("");
    
return(
    <>
       <div className='animation'></div>
       <div className='animation1'> </div>
       <ThemeProvider theme={darkTheme}>
      <CssBaseline />      
   {
   
   userPassword?<App1 userPassword={userPassword}/> 
   :
   <Check userPassword={newUserPassword}/>
  
   }
    </ThemeProvider>
  
 
      
      
 
 
   
 
    </>
)
}