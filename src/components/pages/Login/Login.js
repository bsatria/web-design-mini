import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

const { PUBLIC_URL } = process.env;

function Login() {
  // let history = useHistory();

  const [loading, setLoading] = useState(false);
  const [fakeAccount] = useState({
    username: "bagassatria.n",
    password: "12345"
  });
  const [formValue, setFormValue] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState({
    username: "",
    password: ""
  });
  const [serverMessage, setServerMessage] = useState("");

  const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 3000);
    },
    signout(cb) {
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 3000);
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  function handleSubmit() {
    setLoading(true);
    const { username, password } = formValue;
    if (username === "") {
      setLoading(false);
      setError({ username: "Please enter your username" });
      return;
    } else {
      setError({ username: "" });
    }
    if (password === "") {
      setLoading(false);
      setError({ password: "Please enter your password" });
      return;
    } else {
      setError({ password: "" });
    }
    fakeAuth.authenticate(() => {
      setLoading(false);
      if (
        fakeAccount.username === username &&
        fakeAccount.password === password
      ) {
        // history.push("/list-barang");
      } else {
        setServerMessage("Your username or password is wrong");
      }
    });
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={`${PUBLIC_URL}/logo192.png`} /> Log-in to your account
        </Header>
        <Form size="large" loading={loading} onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={handleChange}
              error={error.username !== "" && error.username}
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={handleChange}
              type="password"
              error={error.password !== "" && error.password}
            />
            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        {serverMessage && (
          <Message negative color="red">
            {serverMessage}
          </Message>
        )}
        <Message>
          New to us? <a href="#">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Login;
