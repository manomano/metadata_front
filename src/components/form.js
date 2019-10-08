import React, { memo } from 'react';
import field_structure from '../field_structure';
import enums from '../enums';
import injectSheet, {withStyles} from 'react-jss'
import CustomTextFieldMultiple from './CustomTextFieldMultiple'
import CustomSelectFieldMultiple from './CustomSelectFieldMultiple'
import ButtonAppBar from './AppBar'
import Button from '@material-ui/core/Button';
import produce from "immer"
import TextField from '@material-ui/core/TextField';
import Infobox from './Infobox'
import Box from '@material-ui/core/Box'
import {Select,MenuItem, Menu,  InputLabel,FormControl, Typography,Tooltip  } from "@material-ui/core";


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
  },
  formControl: {
   // margin: theme.spacing(1),
    minWidth: 120,
  },

}

const stylesA = theme => (styles);
const MyContext = React.createContext(null);


class Item extends React.PureComponent {

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







class Fieldstructure extends React.PureComponent {


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
    this.addElement = this.addElement.bind(this);
    this.fieldTypesToIgnore = ['TREE_FIELD_OBJECT', 'TREE_FIELD_REPEATABLE', 'TREE_FIELD_REPEATABLE_INSIDE'];
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
      let prevClone = {...prevState};
      prevClone.fieldValues[node.num].push("")
      return {
        fieldValues: prevClone.fieldValues
      }
    })

  }

  onListChange(num, arr) {
    this.setState(function (prevState) {
      let prevClone = {...prevState};
      prevClone.fieldValues[num] = arr;
      return {
        fieldValues: prevClone.fieldValues
      }
    })
  }

  handleChange(event, node, index) {


    const self = this;
    const value  = event.target.value;
    this.setState(function (draft) {
      let newDraft = {...draft.fieldValues}
      if(newDraft[node.num].map){
        newDraft[node.num][index] = value;
      }else{
        newDraft[node.num] = value
      }

      return {fieldValues:newDraft}
    })
  }


  onListChangeSpecial(obj) {
    this.setState(function (prevState) {
      let prevClone = {...prevState};
      prevClone.fieldValues[obj.num][obj.index] = obj.value;
      return {
        fieldValues: prevClone.fieldValues
      }
    })
  }


  selectFieldTypes = {
    'SELECT_FIELD': true,
    'SELECT_FIELD_REPEATABLE': true,
    'SELECT_FIELD_RECOMMENDED': true,
    'SELECT_FIELD_MULTIPLESELECTION': true
  }

  getFields(node){
    return <div></div>
  }


  getField =(node)=>{

    if(this.fieldTypesToIgnore.indexOf(node.fieldType)>=0){
      return this.getFields(node);

    }

    switch(node.fieldType){
      case 'TEXT_FIELD':

        return <Box display="flex" flex-direction="right" flexWrap="wrap" css={{maxWidth: '65%', padding:0, border:'0px solid red'}}>
          <Box css={{width: '70%', padding:0}} p={0} m={0}>
          <TextField
          key={node.num}
          inputProps={{style:{height:'0.6em'}}}
          id="standard-name"
          label={node.label}
          value={this.state.fieldValues[node.num]}
          onChange={(e)=>{this.handleChange(e, node)}}
          margin="normal"
          className={this.classes.textField}
          variant="outlined"
          fullWidth
          />
          </Box>
          <Box css={{width: '18%', marginTop:20, paddingLeft:15}} p={0} m={0}>
            <Infobox definition={node.definition} sample={node.sample} note={node.note}/>
          </Box>


        </Box>
      case 'SELECT_FIELD':

        return <Box display="flex" flex-direction="right" flexWrap="wrap" css={{maxWidth: '65%', padding:0, border:'0px solid red'}}>
          <Box css={{width: '70%', padding:0}} p={0} m={0}>
            <FormControl style={{minWidth:300}}>
            <Select value={this.state.fieldValues[node.num]} onChange={(e)=>{this.handleChange(e, node)}}>
              {
                enums.keys[node.num.replace(/\./g,"_")].table.map((x,i) => {
                  return <MenuItem key={"el_"+node.num+"_"+i} value={x.name}>{x.name}</MenuItem>
                })
              }
            </Select>
            </FormControl>
          </Box>
          <Box css={{width: '18%', marginTop:20, paddingLeft:15}} p={0} m={0}>
            <Infobox definition={node.definition} sample={node.sample} note={node.note}/>
          </Box>
        </Box>

      case 'SELECT_FIELD_MULTIPLESELECTION':
        //return node.num.replace(".","_") + ': rame'+ JSON.stringify(enums.keys[node.num.replace(/\./g,"_")]) + ' '

        return <Box display="flex" flex-direction="right" flexWrap="wrap" css={{maxWidth: '65%', padding:0, border:'0px solid red'}}>
          <Box css={{width: '70%', padding:0}} p={0} m={0}>
            <FormControl style={{minWidth:300}}>

              <Select placeholder={node.label} value={this.state.fieldValues[node.num]} onChange={(e)=>{this.handleChange(e, node)}}>
                {
                  enums.keys[node.num.replace(/\./g,"_")].table.map(x => {
                    return <MenuItem value={x.name} key={x.name} style={{'fontSize':'10px'}}>
                      <Tooltip title={x.explanation}><div>{x.name }</div></Tooltip>
                    </MenuItem>
                  })

                }


              </Select>
            </FormControl>
          </Box>
          <Box css={{width: '18%', marginTop:20, paddingLeft:15}} p={0} m={0}>
            <Infobox definition={node.definition} sample={node.sample} note={node.note}/>
          </Box>
        </Box>

      case 'TEXT_FIELD_REPEATABLE':
        return this.state.fieldValues[node.num].map((el,index)=>{
          return <Box display="flex" flex-direction="right" flexWrap="wrap" css={{maxWidth: '65%', padding:0, margin:0, border:'0px solid green'}}  key={"box_"+node.num+"_"+index}>
            <Box css={{width: '70%', padding:0}} p={0} m={0}>
            <TextField
                      key={node.num+"_"+index}
                      inputProps={{style:{height:'0.6em'}}}
                      id="standard-name"
                      label={node.label}
                      value={this.state.fieldValues[node.num][el]}
                      onChange={(e)=>{this.handleChange(e, node, index)}}
                      margin="normal"
                      className={this.classes.textField}
                      variant="outlined"
                      fullWidth
            />

            </Box>
            <Box css={{width: '15%', marginTop:20, paddingLeft:15}} p={0} m={0}>
              <Infobox definition={node.definition} sample={node.sample} note={node.note}/>
            </Box>
            <Box key={"delete_" + index} css={{width: '5%', marginTop:20, paddingLeft:15}} p={0} m={0}>
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
        {(node.children && node.children.length && this.fieldTypesToIgnore.indexOf(node.fieldType)==-1) ? children(node.children) :
          <div>
            {this.getField(node)}
            {node.fieldType.indexOf('REPEATABLE') >= 0 && !this.selectFieldTypes.hasOwnProperty(node.fieldType)?
              <Box component="div" display="block" css={{marginBottom: 5}} >
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
        <Button onClick={()=>console.log(this.state.fieldValues)}>Submit</Button>
        <ul>
          {this.list(field_structure)}
        </ul>
      </div>)

  }

}

export default injectSheet(styles)(Fieldstructure)


injectSheet(styles)(Item)
