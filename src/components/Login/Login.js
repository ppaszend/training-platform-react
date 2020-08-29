import React from "react";
import Form, {InputField, PasswordField, SubmitButton} from "../Form/Form";

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    error: null,
  }

  onSubmit = (data) => {
    console.log(data);
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      // <form onSubmit={this.onSubmit}>
      //   <input type="text" name="username" onChange={this.onChange} />
      //   <input type="password" name="password" onChange={this.onChange} />
      //   <button className={`Button Button--green`}>Zaloguj się</button>
      // </form>
      <Form formLabel="Logowanie">
        <InputField name="username" placeholder="Adres e-mail" />
        <PasswordField name="password" placeholder="Hasło" />
        <SubmitButton>Zaloguj się</SubmitButton>
      </Form>
    );
  }
}

export default Login;