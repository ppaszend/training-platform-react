import React, { useState, useEffect } from 'react';
import styles from './Input.module.scss';
import DoneIcon from '@material-ui/icons/Done';
import WarningIcon from '@material-ui/icons/Warning';

const email_regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const validators = {
  text:     (value) => value.length > 0,
  email:    (value) => email_regex.test(value),
  password: (value) => value.length >= 6 && value.length < 20
}

function InputField(props) {
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState(0);
  useEffect(() => {
    changeHandler({target: document.querySelector(`[name=${props.name}]`)})
  })

  const changeHandler = ({target}) => {
    setInputValue(target.value);
    if (validators[props.type || 'text'](target.value)) {
      setStatus(1);
    } else if (target.value.length > 0) {
      setStatus(2);
    }
  }

  return (
    <label className={styles.InputWrapper}>
      <input name={props.name}
             type={props.type || 'text'}
             className={styles.Input}
             onChange={changeHandler}
             {...props} />
      <span className={`${styles.Placeholder} ${inputValue.length > 0 ? styles.Minimize : ''}`}>{props.placeholder}</span>
      <div className={styles.Icon}>
        { status === 1 && <DoneIcon /> }
        { status === 2 && <WarningIcon color="error"  /> }
      </div>
    </label>
  )
}

export default InputField;