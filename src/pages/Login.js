import React, { useContext, useState } from "react";
import Base from "../components/Base";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { toast } from "react-toastify";
import { loginUser } from "../services/UserService";
import { doLogin, doLogout } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

const Login = () => {
  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });
  const userContextData = useContext(userContext);

  let navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e.target.name + ": " + e.target.value);
    const currField = e.target.name;
    setLoginDetail({ ...loginDetail, [currField]: e.target.value });
  };

  const clearData = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);
    //validation
    if (
      loginDetail.username.trim() == "" ||
      loginDetail.password.trim() == ""
    ) {
      toast.error("Username or Password  is required !!");
      return;
    }

    //submit the data to server to generate token
    loginUser(loginDetail)
      .then((data) => {
        console.log("ok: ", data);
        toast.success("Login Success");

        //updating the global states
        userContextData.setUser({
          data: data.user,
          isLoggedIn: true
        });

        doLogin(data, ()=> {
            console.log("user data saved to local storage");
            
            //redirect to user dashboard
            navigate(`/user/profile/${userContextData.user.data.id}`);
        });

      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.data.message);
        if (error.response.status == 400 || error.response.status == 404 || error.response.status == 403) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong  on sever !!");
        }
      });
  };

  return (
    <Base>
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <h3>Login Page</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="username">username</Label>
                    <Input
                      value={loginDetail.username}
                      onChange={(e)=>handleChange(e)}
                      id="username"
                      name="username"
                      placeholder="Enter your username"
                      type="text"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      value={loginDetail.password}
                      onChange={(e)=>handleChange(e)}
                      id="password"
                      name="password"
                      placeholder="Enter password"
                      type="password"
                    />
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="dark">Submit</Button>
                    <Button onClick={clearData} color="secondary" className="m-2">
                      Clear
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Login;
