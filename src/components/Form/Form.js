import React from 'react';
import styles from './Form.module.scss';
import InputField from "./InputField/InputField";
import EmailField from "./EmailField/EmailField";
import PasswordField from "./PasswordField/PasswordField";
import RadioGroup from "./RadioGroup/RadioGroup";
import SubmitButton from "./SubmitButton/SubmitButton";
import CheckboxField from "./CheckboxField/CheckboxField";
import FormGroup from "./FormGroup/FormGroup";

function Form(props) {
  const onSubmit = (e) => {
    e.preventDefault();
    const formFields = [...e.target.querySelectorAll('input:not([type=radio])'),
                        ...e.target.querySelectorAll('input[type=radio]:checked')];
    props.onSubmit(Object.fromEntries(formFields.map(input => [input.getAttribute('name'), input.value])));
  }

  return (
    <form className={styles.Form}
          onSubmit={onSubmit}
          noValidate={true} >
      {props.formLabel && <h2 className={styles.FormLabel}>{props.formLabel}</h2>}
      {props.children}
    </form>
  )
}

export {InputField, EmailField, PasswordField, RadioGroup, SubmitButton, CheckboxField, FormGroup};

export default Form;