import React from "react";

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    error: null,
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.loginUser(
      e.target.querySelector('[name=username]').value,
      e.target.querySelector('[name=password]').value
    )
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" name="username" onChange={this.onChange} />
        <input type="password" name="password" onChange={this.onChange} />
        <button className={`Button Button--green`}>Zaloguj się</button>
      </form>
    );
  }
}

export default Login;