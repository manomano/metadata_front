import React, {PureComponent} from 'react'
import {FormDataContext} from './Context'
import {withStyles} from "@material-ui/core";
import DateField from './CustomDateField'

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


    const {num, fieldType, children, label, classes, ind} = this.props;
    const {fieldValues, setState, enums} = this.context;


    switch (fieldType) {
      case 'TEXT_FIELD':
        return (
          <input type="text" className="form-control"
            placeholder={label}
            margin="normal"
            variant="outlined"
            key={num}
            /*style={styles.textInput}*/
            onChange={(event) =>
              setState({
                [`${num}`]: event.target.value, ind
              })
            }
            value={fieldValues[num]? fieldValues[num].value:""}

          />
        )
      case 'TEXTAREA':
        return (

          <textarea
            rows="3"
            cols={"5"}
            className="form-control"
            key={num}
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
        if(typeof (fieldValues[num])=="undefined") console.log(num);

        return (


            <select placeholder={label} className="custom-select" value={this.props.hasOwnProperty("ind")?fieldValues[num][ind].value:fieldValues[num].value } onChange={(event) =>
              setState({
                [num]: event.target.value,
                ind:ind
              })
            }

            key={'id_' + num}
            >

              {
                options.table.map((x,i) => {
                  return <option key={'id_' + num+'_'+i} value={x.name}>{x.name}</option>
                })
              }

            </select>



        )
      case 'TIME_FIELD_REPEATABLE':
        return (<DateField date="month" value={"2019-01"} />);
      case 'TIME_FIELD':
        return (<DateField date="month" value={"2019-01"} />);
      default:
        return num + ' aq rame unda daiweros' + fieldType
    }
  }
}


export default withStyles(styles)(Input);


