import { useEffect, useState } from "react";
import { BalanceInSolana, SolanaTxn} from "./helper";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';







export function Transaction({ keys }) {
  const [display, setDisplay] = useState("none");
  const [solBalance, setSolBalnce] = useState("");
  const [amount, setAmount] = useState("");
  const [receiverPublicKey, setReceiverPublicKey] = useState("");
  const [signature, setSignature] = useState("");




  const { publicKey, secret, keycount } = keys;
  const notify = (msg) => toast(msg);
 // console.log(walletExist)

  const clickHandler = async () => {
    setDisplay("block");


    //console.log(pKey)
  }

useEffect(() => {

  const bal = BalanceInSolana(publicKey)
  .then((res) => setSolBalnce(`${res}`))
  .catch((err) => setSolBalnce(`error`));
   

})
 

  


const transactionHandler = async () => {
    // event.preventDefault();
    notify("Transaction sent")
   const signature  =  await  SolanaTxn(secret, publicKey, receiverPublicKey, amount);
  if(signature){
    notify("Transaction Successful");
  }
   setSignature(signature);
   
  
    }
  return (
    <>
    
      <div style={{ display: "flex", justifyContent: "space-around", border: "1px solid white", padding: "20px 4px 20px 4px" }}>
        {keycount == undefined ? <h4>NO ACCOUNT</h4> : <h4>ACCOUNT {keycount}</h4>}
        <div onClick={clickHandler} style={{ border: "3px solid white", padding: "12px 30px 0px 30px  ", borderRadius: "10px", cursor: "pointer" }}>
          <svg className="bi bi-send-fill" fill="currentColor" height="40" viewBox="0 0 16 16" width="40" xmlns="http://www.w3.org/2000/svg"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" /></svg>
        </div>

        <div style={{ border: "3px solid white", padding: "0px 10px 0px 10px  ", borderRadius: "10px" }}>
       <h4> {solBalance=="error" ?  "no sol" : `${solBalance} sol`}</h4> 
        </div>

      </div>




      {/* {   Transaction div sttarts here} */}
      <div style={{
        height: "30rem",
        width: "30rem",
        // backgroundColor : "black",
        display: display,
        position: "absolute",
        top: "10rem",
        left: "0rem",
        // filter: " blur(100px)", 
        backdropFilter: " blur(500px)",
        transition: "2s"

      }}>

        <h2 style={{
          position: "fixed",
          top: "-1rem",
          right: "1rem",
          cursor: "pointer"

        }} onClick={() => {
          setDisplay("none");
          setAmount("");
          setReceiverPublicKey("")
          setSignature("")
         
          
          }}> X</h2>

        <br />

        <form action="" 
        onSubmit={(e) => e.preventDefault()}
        style={
          {
            display : signature ? "none" : "block"
          }
        }
            >
          <h3>ACCOUNT {keycount}</h3>
       
          <h4>{`${publicKey}`.slice(0, 18)}........</h4>

          <svg height="70" viewBox="0 0 48 48" width="70" xmlns="http://www.w3.org/2000/svg"><path d="M4.02 42l41.98-18-41.98-18-.02 14 30 4-30 4z" /><path d="M0 0h48v48h-48z" fill="none" /></svg>
          <br />


          {solBalance == 0 || publicKey == undefined? <h2>Insufficient balance</h2> : <div>
           <label htmlFor="amount">  <h3 style={{ display: "inline-block", padding: "0px 10px" }}>Amount : </h3></label> 
                  
              <input type="text" id="amount"  placeholder="amount" value={amount} required  onChange={(e) => setAmount(e.target.value)}/>
             

             <br />
              <label htmlFor="pkey">  <h3 style={{  display: "inline-block", padding: "0px 10px" }}>To : </h3></label> 
                  
              <input type="text" id="pkey"  placeholder="public key" value={receiverPublicKey} required  onChange={(e) => setReceiverPublicKey(e.target.value)}/>


              <br />
              <button onClick={transactionHandler}>send</button>

            </div>
          }
        </form>

         <div
         
          style={
            {
              display : signature ? "block" : "none",
         
            }
          }
          >
            
          <h1>Transaction successful</h1>
          
          <div style={{   display : "inline-block"}}>
          <h4  >signature<a href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`} target="_blank"> {`${publicKey}`.slice(0, 38)}........</a></h4>
          </div>
         </div>

      </div>
      


    </>
  )
}