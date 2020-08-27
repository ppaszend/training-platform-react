import React, {useState} from "react";
import styles from './RadioGroup.module.scss';

function RadioGroup(props) {
  const [options, setOptions] = useState(props.options.map(option => ({...option, checked: (option.checked || false)})));

  const checkHandler = (e) => {
    setOptions([...props.options.map(option => (
        {...option, checked: option.value === e.target.value}
      ))]
    );
  }

  return (
    <div className={styles.RadioGroup}>
      <span className={styles.RadioGroupName}>{props.label}</span>
      <div className={styles.InputsList}>
        {
          options.map(({label, value, checked}) => (
            <label key={value} className={styles.RadioWrapper}>
              <input name={props.name}
                     value={value}
                     type="radio"
                     defaultChecked={checked}
                     onChange={checkHandler}
                     className={styles.Input}
                     required={props.required}
              />
              <div className={styles.RadioControl} />
              <span className={styles.Label}>{label}</span>
            </label>
          ))
        }
      </div>
    </div>
  )
}

export default RadioGroup;