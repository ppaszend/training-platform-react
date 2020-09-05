import React from "react";
import styles from './Search.module.scss';
import Form, {FormRow, IconButton, InputField} from "../Form/Form";
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

function Search(props) {
  return (
    <div className={`${styles.SearchWrapper} ${props.show || styles.Hide}`}>
      <div className={styles.Head}>
        <IconButton onClick={() => props.setSearchModal(false)} icon={<CloseIcon />} />
      </div>
      <div className={styles.Body}>
        <Form>
          <FormRow>
            <InputField name="query" label="Nazwa produktu..." />
            <IconButton icon={<SearchIcon />} />
          </FormRow>
        </Form>
      </div>
    </div>
  )
}

export default Search;