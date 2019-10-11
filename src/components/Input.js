import React, {PureComponent, Fragment} from 'react'
import {MenuItem, Select, TextField, FormControl, InputLabel} from '@material-ui/core';
import {FormDataContext} from './Context'
import {withStyles} from "@material-ui/core";
import enums from "../enums";

const styles = {
  textInput: {
    width: '70%',
    padding: 2,
    fontSize: 13,
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

    console.log(this.props);
    const {num, fieldType, children, label, classes, ind} = this.props;
    const {fieldValues, setState, enums} = this.context;

    console.log(fieldType)
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
            value={fieldValues[num]? fieldValues[num].value:""}
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
            value={fieldValues[num].value}
          />
        )

      case 'SELECT_FIELD':


        const options = enums.keys[num.replace(/\./g, "_")];

        console.log(num.replace(/\./g, "_"), enums);
        if(typeof (fieldValues[num])=="undefined") console.log(num);

        return (
          <FormControl key={'formCtrl_' + num}className={classes.formControl}>
            <InputLabel htmlFor={'id_' + num}>{label}</InputLabel>
            <Select value={this.props.hasOwnProperty("ind")?fieldValues[num][ind].value:fieldValues[num].value } onChange={(event) =>
              setState({
                [num]: event.target.value,
                ind:ind
              })
            }
                    inputProps={{
                      name: 'select_' + num,
                      id: 'id_' + num,
                    }}
            key={'id_' + num}
            >

              {
                options.table.map((x,i) => {
                  return <MenuItem key={'id_' + num+'_'+i} value={x.name}>{x.name}</MenuItem>
                })
              }

            </Select>
          </FormControl>


        )


      default:
        return num + ' aq rame unda daiweros' + fieldType
    }
  }
}


export default withStyles(styles)(Input);


