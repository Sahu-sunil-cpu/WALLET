




export default function Phrase({mn, show}){
    return(
        <>
        <div style={{ padding : "20px", width : "400px"}}>{
     show ?  <div>Create Wallet to see Phrase</div> : mn.map((e) => <div style={{margin : "2px 2px 2px 2px",display : "inline-block",  border : "1px solid green", padding : "5px", borderRadius : "3px"}}>{e}</div>)
      }</div>
        </>
    )
}