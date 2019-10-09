import React, {PureComponent, Fragment} from 'react'
import {MenuItem, Select, TextField, FormControl, InputLabel} from '@material-ui/core';
import {FormDataContext} from './Context'
import {withStyles} from "@material-ui/core";
import enums from "../enums";

const styles = {
  textInput: {
    width: '70%',
    padding: 5,
    fontSize: 18,
  },
  textareaInput: {
    width: '100%',
    padding: 5,
    fontSize: 18,
    minHeight: 140,
    border: 'none',
  },
  radioOptionRow: {
    display: 'inline-block',
    marginRight: 5,
  },
  formControl: {
    width: '70%'
  }
}


class Input extends PureComponent {
  static contextType = FormDataContext;

  render() {


    const {num, fieldType, children, label, classes} = this.props;
    const {fieldValues, setState, enums} = this.context;
    console.log(num);

    switch (fieldType) {
      case 'TEXT_FIELD':
        return (
          <TextField
            label={label}
            margin="normal"
            variant="outlined"
            key={num}
            style={styles.textInput}
            onChange={(event) =>
              setState({
                [`${num}`]: event.target.value
              })
            }
            value={fieldValues[num]}
          />
        )
      case 'TEXTAREA':
        return (
          <textarea
            key={num}
            style={styles.textareaInput}
            onChange={(event) =>
              setState({
                [num]: event.target.value,
              })
            }
            value={fieldValues[num]}
          />
        )

      case 'SELECT_FIELD' || 'SELECT_REPEATABLE':
        const options = enums.keys[num.replace(/\./g, "_")]

        return (
          <FormControl key={'formCtrl_' + num}className={classes.formControl}>
            <InputLabel htmlFor={'id_' + num}>{label}</InputLabel>
            <Select value={fieldValues[num]} onChange={(event) =>
              setState({
                [num]: event.target.value,
              })
            }
                    inputProps={{
                      name: 'select_' + num,
                      id: 'id_' + num,
                    }}
            key={'id_' + num}
            >

              {
                enums.keys[num.replace(/\./g, "_")].table.map((x,i) => {
                  return <MenuItem key={'id_' + num+'_'+i} value={x.name}>{x.name}</MenuItem>
                })
              }

            </Select>
          </FormControl>


        )

      default:
        return null
    }
  }
}


export default withStyles(styles)(Input);


