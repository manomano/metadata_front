import React from 'react';
import field_structure from '../field_structure'
import injectSheet, {withStyles} from 'react-jss'
import Customselectfieldmultiple from './CustomTextFieldMultiple'
import CustomSelectField from './CustomSelectField'
import ButtonAppBar from './AppBar'
import Button from '@material-ui/core/Button';

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

}

const stylesA = theme => (styles);


class Item extends React.Component {

  constructor(props, classes) {
    super(props)
    this.classes = classes;
  }

  render() {
    return <li ref={this.props.refProp} className={this.classes.mydiv}>
      {this.props.num + ' . ' + this.props.label}
      {this.props.children}
    </li>
  }
}


class Fieldstructure extends React.Component {


  constructor(props, classes) {
    super(props)
    this.classes = classes;
    this.state = {}
    this.state.fieldValues = this.rec(field_structure, null, {"10.4": [{"_id":15,"value":"ავტორი"}, {"_id":17,"value":"მეურვე"}], "1.3": "dada is here"});

    this.removeElement = this.removeElement.bind(this)
    this.addElement = this.addElement.bind(this);
    this.list = this.list.bind(this)
    this.onListChange = this.onListChange.bind(this);
  }

  rec = (arr, obj, ObjectValue) => {
    if (!obj) {
      obj = {}
    }
    for (let i = 0; i < arr.length; i++) {
      this[("ref_"+arr[i].num).trim()] = React.createRef()
      if (arr[i].children && arr[i].children.length) {
        this.rec(arr[i].children, obj, ObjectValue)
      } else {
        obj[arr[i].num] = ObjectValue[arr[i].num] || (arr[i].fieldType.indexOf('_REPEATABLE') > 0 ? [] : "0")
      }
    }

    return obj;
  }

  removeElement(num, index) {

    this.setState(function (prevState) {
      prevState.fieldValues[num].splice(index, 1)
      return {
        fieldValues: prevState.fieldValues
      }
    })

  }


  addElement(num) {

    this.setState(function (prevState) {
      prevState.fieldValues[num].push("")
      return {
        fieldValues: prevState.fieldValues
      }
    })

  }

  onListChange(num, arr){
    this.setState(function (prevState) {
      prevState.fieldValues[num] = arr;
      return {
        fieldValues: prevState.fieldValues
      }
    })
  }

  selectFieldTypes = {'SELECT_FIELD':true, 'SELECT_FIELD_REPEATABLE':true, 'SELECT_FIELD_RECOMMENDED':true,'SELECT_FIELD_MULTIPLESELECTION':true}

  list=(data) => {
    const children = (items) => {
      if (items) {
        return <ul className={this.classes.mydiv}>{this.list(items)}</ul>
      }
    }

    return data.map((node, index) => {
      return <Item refProp={this["ref_"+node.num]} key={node.num} label={node.label} num={node.num}>
        {(node.children && node.children.length) ? children(node.children) :
          <div>
            {this.selectFieldTypes.hasOwnProperty(node.fieldType)?
            <CustomSelectField key={node.num}
                               onListChange ={this.onListChange}
                               /*addElement={this.addElement}
                               removeElement={this.removeElement}*/
                               /*handleChange={this.handleChange}*/
                               label={node.label}
                               value={this.state.fieldValues[node.num]} num={node.num}
                               definition={node.definition}
                               sample={node.sample}
                               note={node.note}/>:
              <Customselectfieldmultiple key={node.num}
                               addElement={this.addElement}
                               removeElement={this.removeElement}
                               elementsArr={this.state.fieldValues[node.num]}
                               handleChange={this.handleChange}
                               label={node.label}
                               value={this.state.fieldValues[node.num]}
                               nums={node.num}
                               definition={node.definition}
                               sample={node.sample}
                               note={node.note}/>}

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
