import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { signUp } from "../services/UserService";
import { toast } from "react-toastify";

const SignUp = () => {
  const [data, setData] = useState({
    name: "test",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    error: {},
    isError: false,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleChange = (e) => {
    console.log(e.target.name + ": " + e.target.value);
    const currField = e.target.name;
    setData({ ...data, [currField]: e.target.value });
  };

  const clearData = () => {
    setData({
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = (e) => {
    console.log("sumbit button clicked: " + JSON.stringify(data));
    e.preventDefault();

    //data validation

    // if(error.isError){
    //   toast.error("Form data is invalid , correct all details then submit. ");
    //   setError({...error,isError:false})
    //   return;
    // }

    //call post api of backend
    signUp(data)
      .then((res) => {
        console.log(res);
        console.log("Succcess");
        toast.success("User Registered Successfully!");
      })
      .catch((error) => {
        console.log(error);
        console.log("error!");
        toast.error("Something went wrong!");

        //handle error properly
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  return (
    <Base>
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <h3>Sign-up Page</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      value={data.name}
                      onChange={(e) => handleChange(e)}
                      id="name"
                      name="name"
                      placeholder="Enter Name"
                      type="text"
                      invalid={
                        error.errors?.response?.data?.name ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                      value={data.username}
                      onChange={(e) => handleChange(e)}
                      id="username"
                      name="username"
                      placeholder="Enter Username"
                      type="text"
                      invalid={
                        error.errors?.response?.data?.username ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.username}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      value={data.email}
                      onChange={(e) => handleChange(e)}
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      type="email"
                      invalid={
                        error.errors?.response?.data?.email ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.email}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      value={data.password}
                      onChange={(e) => handleChange(e)}
                      id="password"
                      name="password"
                      placeholder="Enter password"
                      type="password"
                      invalid={
                        error.errors?.response?.data?.password ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.confirmPassword}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="confirm-password">Confirm Password</Label>
                    <Input
                      value={data.confirmPassword}
                      onChange={(e) => handleChange(e)}
                      id="confirm-password"
                      name="confirmPassword"
                      placeholder="Enter the password again"
                      type="password"
                      invalid={
                        error.errors?.response?.data?.confirmPassword
                          ? true
                          : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.confirmPassword}
                    </FormFeedback>
                  </FormGroup>
                  <Container className="text-center">
                    <Button type="submit" color="dark">
                      Submit
                    </Button>
                    <Button
                      onClick={clearData}
                      color="secondary"
                      className="m-2"
                    >
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

export default SignUp;
