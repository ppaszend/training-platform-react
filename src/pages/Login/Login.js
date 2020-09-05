import React from "react";
import Form, {InputField, PasswordField, SubmitButton} from "../../components/Form/Form";

class Login extends React.Component {
  onSubmit = (data) => {
    this.props.loginUser(data.username, data.password);
  };

  render() {
    return (
      <Form formLabel="Logowanie" onSubmit={this.onSubmit}>
        <InputField name="username" placeholder="Adres e-mail" />
        <PasswordField name="password" placeholder="Hasło" />
        <SubmitButton>Zaloguj się</SubmitButton>
      </Form>
    );
  }
}

export default Login;