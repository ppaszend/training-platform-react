import React from 'react';
import Form, {CheckboxField, EmailField, InputField, PasswordField, RadioGroup, SubmitButton} from "../Form/Form";

function Register() {
  const submitHandler = (data) => {
    console.log(data);
  }

  return (
    <Form onSubmit={submitHandler}>
      <InputField name="first-name" placeholder="Imię" />
      <InputField name="last-name" placeholder="Nazwisko" />
      <EmailField name="email" placeholder="Adres e-mail" />
      <PasswordField name="password" placeholder="Hasło" />
      <RadioGroup name="gender"
                  options={[
                    { label: 'Mężczyzna', value: 'm', checked: true },
                    { label: 'Kobieta', value: 'k' }
                    ]}
                  label="Płeć" />
      <CheckboxField name="terms">Akceptuję regulamin sklepu</CheckboxField>
      <SubmitButton>Zarejestruj się</SubmitButton>
    </Form>
  )
}

export default Register;