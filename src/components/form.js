import React from 'react';
import field_structure from '../field_structure'
import injectSheet, {withStyles} from 'react-jss'
import CustomTextFieldMultiple from './CustomTextFieldMultiple'
import CustomSelectFieldMultiple from './CustomSelectFieldMultiple'
import ButtonAppBar from './AppBar'
import Button from '@material-ui/core/Button';
import produce from "immer"
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField';
import Infobox from './Infobox'

const styles = {
  mydiv: {
    'width': '50%',
    'border': '1px solid #F7F7F7',
    'border-radius': '5px',
    'padding': '5px',
    '&:hover': {
      background: '#F7F7F7',
      cursor: 'pointer'
    },
    'margin': '2%',
    background: 'red'

  },
  button: {margin: '0 0 0 0'},
  textField: {
    marginLeft: 1,
    marginRight: 1
    //theme.spacing(1)
  }

}

const stylesA = theme => (styles);
const MyContext = React.createContext(null);


class Item extends React.Component {

  constructor(props, classes) {
    super(props)
    this.classes = classes;
  }

  render() {
    return <li ref={this.props.refProp} className={this.classes.mydiv}>
      {this.props.num + ' . ' + this.props.label} {this.props.fieldType.indexOf('_REPEATABLE') >= 0 ? '+' : ''}
      {this.props.children}
    </li>
  }
}


class Fieldstructure extends React.Component {


  constructor(props, classes) {
    super(props)
    this.classes = classes;
    this.state = {};
    this.state.fieldValues = this.rec(field_structure, null, {
      "10.4": [{"_id": 15, "value": "ავტორი"}, {
        "_id": 17,
        "value": "მეურვე"
      }], "1.3": "dada is here"
    });

    this.removeElement = this.removeElement.bind(this)
    this.addElement = this.addElement.bind(this);
    this.list = this.list.bind(this)
    this.onListChange = this.onListChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onListChangeSpecial = this.onListChangeSpecial.bind(this);
    this.addElement = this.addElement.bind(this)

    console.log(this.state.fieldValues)
  }

  rec = (arr, obj, ObjectValue) => {
    if (!obj) {
      obj = {}
    }
    for (let i = 0; i < arr.length; i++) {
      this[("ref_" + arr[i].num).trim()] = React.createRef()
      if (arr[i].children && arr[i].children.length) {
        this.rec(arr[i].children, obj, ObjectValue)
      } else {
        arr[i].parent = arr;
        obj[arr[i].num] = ObjectValue[arr[i].num] || (arr[i].fieldType.indexOf('_REPEATABLE') > 0 ? [""] : "")
        //!ObjectValue[arr[i].num]?[]:((!ObjectValue[arr[i].num].map)?[ObjectValue[arr[i].num]]:ObjectValue[arr[i].num])
          //ObjectValue[arr[i].num] || (arr[i].fieldType.indexOf('_REPEATABLE') > 0 ? [] : "")
      }
    }

    return obj;
  }

  removeElement(node, index) {

    this.setState(function (prevState) {
      let newArr = [...prevState.fieldValues[node.num]]

      newArr.splice(index, 1)
      return {
        fieldValues: {...prevState.fieldValues, [node.num]:newArr}
      }
    })

  }


  addElement(node) {

    this.setState(function (prevState) {
      prevState.fieldValues[node.num].push("")
      return {
        fieldValues: prevState.fieldValues
      }
    })

  }

  onListChange(num, arr) {
    this.setState(function (prevState) {
      prevState.fieldValues[num] = arr;
      return {
        fieldValues: prevState.fieldValues
      }
    })
  }

  handleChange(num, value) {
    const self = this;
    this.setState(produce(draft => {
      draft.fieldValues[num] = value
    }), ()=> {
      console.log(num, self.state.fieldValues[num])
    })
  }


  onListChangeSpecial(obj) {
    this.setState(function (prevState) {
      prevState.fieldValues[obj.num][obj.index] = obj.value;
      return {
        fieldValues: prevState.fieldValues
      }
    })
  }


  selectFieldTypes = {
    'SELECT_FIELD': true,
    'SELECT_FIELD_REPEATABLE': true,
    'SELECT_FIELD_RECOMMENDED': true,
    'SELECT_FIELD_MULTIPLESELECTION': true
  }

  getField =(node)=>{
    switch(node.fieldType){
      case 'TEXT_FIELD':

        return <Box>

          <TextField
          key={node.num}
          inputProps={{style:{height:'0.6em'}}}
          id="standard-name"
          label={node.label}
          value={this.state.fieldValues[node.num]}
          //onBlur={(e)=>{onchange(e)}}
          margin="normal"
          className={this.classes.textField}
          variant="outlined"
          fullWidth
        />

        </Box>

      case 'TEXT_FIELD_REPEATABLE':
        return this.state.fieldValues[node.num].map((el,index)=>{
          return <Box key={"box_"+node.num+"_"+index}>
                    <TextField
                      key={node.num+"_"+index}
                      inputProps={{style:{height:'0.6em'}}}
                      id="standard-name"
                      label={node.label}
                      value={this.state.fieldValues[node.num][el]}
                      //onBlur={(e)=>{onchange(e)}}
                      margin="normal"
                      className={this.classes.textField}
                      variant="outlined"
                      fullWidth
                    />

            <Box display="inline-block" css={{marginTop: 20, marginLeft: 30, height: 40}} key={"delete_" + index}>
              <Button variant="contained" className={this.classes.button} onClick={() => {
                this.removeElement(node, index)
              }}>X</Button>
            </Box>



          </Box>
        })
      }


  }


  list = (data) => {
    const children = (items) => {
      if (items) {
        return <ul className={this.classes.mydiv}>{this.list(items)}</ul>
      }
    }


    return data.map((node, index) => {
      return <Item refProp={this["ref_" + node.num]} key={node.num} label={node.label} num={node.num}
                   fieldType={node.fieldType}>
        {(node.children && node.children.length) ? children(node.children) :
          <div>
            {
              this.getField(node)
              /*{this.selectFieldTypes.hasOwnProperty(node.fieldType) ?

              <CustomSelectFieldMultiple key={node.num}
                                         onListChange={this.onListChange}
                                         label={node.label}
                                         value={this.state.fieldValues[node.num]} num={node.num}
                                         definition={node.definition}
                                         sample={node.sample}
                                         note={node.note}/> :

              <CustomTextFieldMultiple key={node.num}
                                       addElement={this.addElement}
                                       removeElement={this.removeElement}
                                       handleChange={this.handleChange}
                                       onListChangeSpecial={this.onListChangeSpecial}
                                       label={node.label}
                                       value={this.state.fieldValues[node.num]}
                                       num={node.num}
                                       definition={node.definition}
                                       sample={node.sample}
                                       note={node.note}/>}*/}
            {node.fieldType.indexOf('REPEATABLE') >= 0 && !this.selectFieldTypes.hasOwnProperty(node.fieldType)?
              <Box component="div" display="block" css={{marginTop: 25}} p={1} m={1}>
                <Button variant="contained" onClick={() => (this.addElement(node))}>+</Button>
              </Box> : ""}

          </div>}


      </Item>
    });
  }


  scrollToMyRef = () => window.scrollTo(0, this["ref_11.5.4"].current.offsetTop)

  render() {

    return (
      <div>
        {/*<Button onClick={this.scrollToMyRef}>scrollTo</Button>*/}
        <ButtonAppBar/>
        <ul>
          {this.list(field_structure)}
        </ul>
      </div>)

  }

}

export default injectSheet(styles)(Fieldstructure)


injectSheet(styles)(Item)
