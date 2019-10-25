import React, {PureComponent} from 'react'
import {FormDataContext} from './Context'
import {withStyles} from "@material-ui/core";
import DateField from './CustomDateField';
import MapField from "./MapField";

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

const coords = [
  [43.34647059800127,41.21864926203679],
  [46.22488856675127,41.21864926203679],
  [46.22488856675127,42.6730522016756],
  [43.34647059800127,42.6730522016756],
  [43.34647059800127,41.21864926203679]
];




class Input extends PureComponent {
  static contextType = FormDataContext;
  render() {


    const {num, fieldType, children, label, classes, ind} = this.props;
    const {fieldValues, setState, enums} = this.context;

    let theValue = "";
    if(this.props.hasOwnProperty("ind") && typeof(this.props.ind)!=='undefined'){
      if(fieldValues.hasOwnProperty(num)){
        theValue = fieldValues[num][ind].value;
      }else {
        theValue = fieldValues[num.substring(0,num.length-2)][ind].objectValue[num].value;
      }
    }else{
      theValue = fieldValues.hasOwnProperty(num)?fieldValues[num].value:fieldValues[num.substring(0,num.length-2)].objectValue[num].value;
    }


    switch (fieldType) {
      case 'TEXT_FIELD':
        return (
          <input type="text" className="form-control"
            placeholder={label}
            margin="normal"
            variant="outlined"
            key={num}
            onChange={(event) =>
              setState({
                [`${num}`]: event.target.value, ind
              })
            }
            value={theValue}

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
                [num]: event.target.value,ind
              })
            }
            value={theValue}
          />

        )

      case 'SELECT_FIELD':


        const options = enums.keys[num.replace(/\./g, "_")];

        return (

            <select placeholder={label} className="custom-select" value={theValue} onChange={(event) =>
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
      case 'SELECT_FIELD_RECOMMENDED':

        let optionsRec = enums.keys[num.replace(/\./g, "_")];

        if(!optionsRec){//temporary code
          optionsRec =  enums.keys["1_5"]
        }
        return (

          <select placeholder={label} className="custom-select" value={theValue } onChange={(event) =>  {setState({ [num]: event.target.value, ind:ind})}} key={'id_' + num}>
            <option>აირჩიე</option>
            {
              optionsRec.table.map((x,i) => {
                return <option key={'id_' + num+'_'+i} value={x.name}>{x.name}</option>
              })

            }
          </select>
        )
      case 'TIME_FIELD_REPEATABLE':
        return (<DateField date="month" value={"2019-01"} />);
      case 'TIME_FIELD':
        return (<DateField date="month" value={"2019-01"} />);
      case 'GEO_FIELD':
        return (<MapField coords={coords}/>)
      default:
        return num + ' aq rame unda daiweros' + fieldType
    }
  }
}


export default withStyles(styles)(Input);


