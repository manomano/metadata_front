import React from 'react';
import field_structure from '../field_structure'
import injectSheet, {withStyles }  from 'react-jss'
import CustomTextField from './CustomTextField'



const styles = {
    mydiv:{
         'width':'50%',
        'border': '1px solid #F7F7F7',
        'border-radius':'5px',
        'padding':'5px',
        '&:hover': {
            background: '#F7F7F7',
            cursor:'pointer'
        },
        'margin':'2%',
      background: 'red'

    },

}

const stylesA = theme => (styles);








class Item extends React.Component {

  constructor(props, classes){
    super(props)
    this.classes = classes;
  }

  render() {
    return <li className={this.classes.mydiv}>
      { this.props.num + ' . '+ this.props.label }
      { this.props.children }
    </li>
  }
}


class Fieldstructure extends React.Component{


  constructor(props, classes){
    super(props)
    this.classes = classes;
    this.state = {}
    this.state.fieldValues = this.rec(field_structure,null, {"1.2":["a", "b","c"], "1.3":"dada is here"});
  }

  rec(arr,obj, ObjectValue) {
    if(!obj){
      obj = {}
    }
    for (let i = 0; i < arr.length; i++) {
      if(arr[i].children && arr[i].children.length){
        this.rec(arr[i].children, obj,ObjectValue)
      }else{
        obj[arr[i].num] = ObjectValue[arr[i].num] || (arr[i].fieldType.indexOf('_REPEATABLE')>0?[]:"0")
      }
    }

    return obj;
  }



  componentWillMount(){

  }

  componentWillReceiveProps(){

  }

  componentWillUpdate(){

  }

  handleChange(val) {

  }

  list(data) {
    const children = (items) => {
      if (items) {
        return <ul className={this.classes.mydiv}>{ this.list(items) }</ul>
      }
    }

    return data.map((node, index) => {
      return <Item key={ node.num } label={ node.label } num={node.num}>
        { (node.children && node.children.length )? children(node.children):<div><CustomTextField key={node.num}  elementsArr={this.state.fieldValues[node.num]} handleChange={this.handleChange} label={node.label} value={this.state.fieldValues[node.num]} nums={node.num}  definition={node.definition} sample={node.sample} note={node.note}/></div> }


      </Item>
    });
  }


  render() {

    return (<ul>
      {this.list(field_structure)}
    </ul>)

    }

}

export default injectSheet(styles)(Fieldstructure)


injectSheet(styles)(Item)
