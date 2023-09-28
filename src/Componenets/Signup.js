import {useRef} from 'react';
import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap';



const Signup=()=>{
    const emailInputRef=useRef();
const passwordInputRef=useRef();
const confirmPasswordRef=useRef();




    const submitHandler=(event)=>{
event.preventDefault();

const enteredEmail=emailInputRef.current.value;
const enteredPassword=passwordInputRef.current.value;
const enteredConfirmPassword=confirmPasswordRef.current.value;

if(enteredPassword!==enteredConfirmPassword){
    alert("invalid Password");
}

fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCODwcyHk2Zov8fcLhSOjRQLG-3O357vS0',{
    method:'POST',
    body:JSON.stringify({
        email:enteredEmail,
        password:enteredPassword,
        returnSecureToken:true

    }),
    headers:{
        'Content-type':'application/json'
    }
}

).then((res)=>{
    if(res.ok){
        alert("signUp success");
    }else{
        alert("signUp failed");
    }
})


    }
return <div>
    

    <Container fluid  style={{marginLeft:"550px",marginTop:"140px"}} >
        <Row>
            <Col xs={3}>
            <Card className="shadow-lg ml-5">
                <Card.Header className="p-3">
                    <h1>SignUp</h1>
                </Card.Header>

                <Card.Body>
                    <Form  onSubmit={submitHandler}>
                        <Form.Group className="mb-3">
                            <Form.Control type="email" placeholder="Email Id" ref={emailInputRef}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="password" placeholder="Password" ref={passwordInputRef}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="password" placeholder="Confirm Password" ref={confirmPasswordRef}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                           <Button type="Submit" >Signup</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
            </Col>
        </Row>
    </Container>
</div>
}

export default Signup;