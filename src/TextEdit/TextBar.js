
import {useNavigate} from 'react-router-dom';

const TextBar=()=>{
    const navigate=useNavigate();

    const sentHandler=()=>{
navigate('/sentdata');
    }
    const composeHandler=()=>{
        navigate('/text');
    }

  return<div>
<div style={{width:"15%",height:"100%",backgroundColor:"black" ,position:"absolute",left:"0%"}}>
    <div>
    <button style={{color:"whitesmoke" ,backgroundColor:"black" ,border:"none",marginBottom:"50px",marginTop:"60px"}} onClick={composeHandler}>Compose</button>
    </div>
    <div>
    <button style={{color:"whitesmoke" ,backgroundColor:"black" ,border:"none",marginBottom:"50px"}}>Inbox</button>
    </div>
   <div>
   <button style={{color:"whitesmoke" ,backgroundColor:"black" ,border:"none",marginBottom:"50px",}} onClick={sentHandler}>Sent</button>
   </div>

  
</div>
      
  </div>
}

export default TextBar;