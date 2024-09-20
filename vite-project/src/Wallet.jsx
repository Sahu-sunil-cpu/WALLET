import { useState } from 'react'
import { mnemonicGenerator, SolanaWallet, EtheriumWallet } from './helper';
import './App.css'
import Phrase from './Phrase';
import AuthenticateUser from './AuthenticateUser';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import { v4 as uuidv4 } from 'uuid'
import { Transaction } from './Transaction.jsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';







const wallet = [
  {
    value: 'Solana',
    label: 'Solana ◎',
  },
  // {
  //   value: 'Etherium',
  //   label: 'Etherium Ξ',
  // },


];


export default function Wallet({ userPassword }) {


  const [mn, newMn] = useState([]);
  const [solCount, setsolCount] = useState(0);
  const [solpublicKey, setsolPublickey] = useState([]);
  const [ethCount, setethCount] = useState(0);
  const [ethpublicKey, setethPublicKey] = useState([]);
  const [show, newShow] = useState(true);
  const [nemonic, newMnemonic] = useState();
  const [rendered, setRendered] = useState(false);
  const [exportKey , setExportKey] = useState({});
  const [chWallet, newChWallet] = useState("Solana");
  const [checkAuthentcation, setCheckAuthentcation] = useState("");
  const [existWallet , setExistWallet] = useState(false);



  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

 
  const notify = (count) => toast(`Account ${count} selected`);

  // if(solpublicKey || ethpublicKey){
  //   setExistWallet(true);
  // }



  async function createWallet() {

    const mnemonic = show ? await mnemonicGenerator() : nemonic;
    //console.log(mnemonic);
    let arr = mnemonic.split(" ");
    newShow(false);
    newMn(arr);
    newMnemonic(mnemonic);



    if (chWallet == "Solana") {

      const { solpubKey, solpriKey, count } = await SolanaWallet(mnemonic, solCount);

      setsolCount(solCount + 1);
      
      // if(solpublicKey.length != 0)
      // setExistWallet(true);

      setsolPublickey((prev) => {
        return [...prev,
        {
          pubkey: solpubKey,
          privkey: solpriKey,
          id: uuidv4(),
          pubshow: false,
          privshow: false,
          count: count + 1
        }
        ]
      })
    } else {
      const { ethpubKey, ethpriKey, count } = await EtheriumWallet(mnemonic, ethCount);

      setethCount(ethCount + 1);
      setethPublicKey((prev) => {
        return [...ethpublicKey,
        {
          pubkey: ethpubKey,
          privkey: ethpriKey,
          id: uuidv4(),
          pubshow: false,
          privshow: false,
          count: count + 1
        }
        ]
      });

    }
  }



  const chooseWallet = (value) => {
    newChWallet(value);
  }

  const handleDelete = (id, walletname) => {
    // console.log(id + walletname)
    if (walletname === "Solana") {
      setsolPublickey((Prev) => solpublicKey.filter((prev) => prev.id != id))
      // setsolCount(solCount - 1);
    } else {
      setethPublicKey((prev) => ethpublicKey.filter((prev) => prev.id != id));
      //setethCount(ethCount - 1);
    }


  }

  const handleVisibilitySolana = (id, key) => {
    if (key == "publicKey") {

      setsolPublickey((prev) =>
        prev.map((e) => {
          if (e.id == id) {

            return { ...e, pubshow: !e.pubshow };
          } else {

            return e;
          }
        }))

    } else {
      setsolPublickey((prev) =>
        prev.map((e) => {
          if (e.id == id) {

            return { ...e, privshow: !e.privshow };
          } else {

            return e;
          }
        }))
    }
  }

  const handleVisibilityEther = (id, key) => {
    if (key == "publicKey") {

      setethPublicKey((prev) =>
        prev.map((e) => {
          if (e.id == id) {

            return { ...e, pubshow: !e.pubshow };
          } else {

            return e;
          }
        }))

    } else {
      setethPublicKey((prev) =>
        prev.map((e) => {
          if (e.id == id) {

            return { ...e, privshow: !e.privshow };
          } else {

            return e;
          }
        }))
    }
  }

  const keyExporter = (e, event) => {

   
    setExportKey((prev) => {
       setRendered(true)
       notify(e.count);
      return {...prev, publicKey : e.pubkey, secret : e.privkey, keycount : e.count};
    })

   

  }

  
 


  return (
    <>
      {/* <div className='animation1'> </div>
     */}



      <div className='wrapper'>
      <ToastContainer/>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            {show ? <button style={{ display: "inline-block", marginRight: "10px" }} onClick={createWallet}>Create Wallet</button> : <button style={{ display: "inline-block", marginRight: "10px" }} onClick={createWallet}>Create New Wallet</button>}


            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              defaultValue="Solana"
              color='secondary'
              helperText="Please select your wallet"
              variant='outlined'



            >
              {wallet.map((option) => (
                <MenuItem key={option.value} value={option.value} onClick={() => chooseWallet(option.value)}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <br /><br />
          </div>

          {
            (mn && (checkAuthentcation == userPassword)) ? <div> <button onClick={() => setCheckAuthentcation("")}>Lock</button>  <Phrase mn={mn} show={show} /></div> : <AuthenticateUser setCheckAuthentcation={setCheckAuthentcation} />
          }


          <Transaction keys={exportKey} />
        </div>






        <br /><br /> <br /><br />

        {

          chWallet == "Solana" ?
            <div style={{
              // border: "2px solid pink" ,
              overflow: "auto",
              scrollbarWidth: "thin",
              scrollBehavior: "-moz-initial",
              display: "flex",
              justifyContent: "center",
              width: "42rem",
              maxHeight: "32rem",
              backgroundImage: "url('https://cryptologos.cc/logos/solana-sol-logo.png?v=033')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "75%",
              backgroundPosition: "center"
            }}>

              <div>
                <div style={{ backdropFilter: " blur(5px)" }}>


                  {
                    solpublicKey.map((e) => <div className='sol'  onClick={(event) => { 
                     
                      keyExporter(e, event);
                     
                      
                      }} key={e.id} >
                     
                   <h3> ACCOUNT {e.count}</h3>
                      
               
                      <h4 style={{ display: "inline-block" }}>Public Key : </h4>
                      <Input
                        style={{
                          width: "500px",
                          marginLeft: "8px"
                        }}


                        type={e.pubshow ? 'text' : 'password'}
                        value={e.pubkey}
                        key={e.id}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => {
                                // console.log(e.id)
                                // console.log(e.pubshow)
                                handleVisibilitySolana(e.id, "publicKey")

                              }}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >

                              {
                                e.pubshow ? <VisibilityOff /> : <Visibility />
                              }


                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />


                      <br /> <br />
                      <h4 style={{ display: "inline-block" }}>Private Key : </h4>
                      <Input
                        style={{
                          width: "500px",
                          marginLeft: "8px"
                        }}

                        type={e.privshow ? 'text' : 'password'}
                        value={e.privkey}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => {
                                console.log(e.id)
                                console.log(e.privshow)
                                handleVisibilitySolana(e.id, "privateKey")
                              }}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {e.privshow ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                      <br></br>
                      <button style={{ color: "pink" }} onClick={() => handleDelete(e.id, chWallet)}>Delete</button>
                    </div>)


                  }
                </div>
              </div>
            </div>

            :
            <div   style={{
              // border: "2px solid pink" ,
              overflow: "auto",
              scrollbarWidth: "thin",
              scrollBehavior: "-moz-initial",
              display: "flex",
              justifyContent: "center",
              width: "42rem",
              maxHeight: "32rem",
              backgroundImage: "url('https://cryptologos.cc/logos/versions/ethereum-eth-logo-colored.svg?v=033')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "70%",
              backgroundPosition: "center"

            }}>
              <div>
                <div    style={{ backdropFilter: " blur(5px)" }}>

                  {
                    ethpublicKey.map((e) => <div   onClick={(event) => { keyExporter(e); }}   key={e.id} style={{
                      padding: "15px 5px 15px 5px",
                      border: "1px solid pink",
                      borderRadius: "5px",
                      margin: "15px 10px 15px 10px"
                    }}>
                      <h3>
                        ACCOUNT {e.count}
                      </h3>

                      <br />



                      <h4 style={{ display: "inline-block" }}>Public Key : </h4>
                      <Input
                        style={{
                          width: "500px",
                          marginLeft: "8px"
                        }}
                        id="outlined-adornment-password"
                        type={e.pubshow ? 'text' : 'password'}
                        value={e.pubkey}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => {
                                handleVisibilityEther(e.id, "publicKey");

                              }}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {e.pubshow ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />



                      <br /> <br />
                      <h4 style={{ display: "inline-block" }}>Private Key : </h4>
                      <Input
                        style={{
                          width: "500px",
                          marginLeft: "8px"
                        }}

                        type={e.privshow ? 'text' : 'password'}
                        value={e.privkey}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => {
                                handleVisibilityEther(e.id, "privateKey");

                              }}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {e.privshow ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                      <br></br>
                      <button style={{ color: "pink" }} onClick={() => handleDelete(e.id, chWallet)}>Delete</button>

                    </div>)
                  }
                </div>
              </div>
            </div>

        }

      </div>

    </>
  )
}


