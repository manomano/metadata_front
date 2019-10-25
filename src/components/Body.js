import React, { PureComponent } from 'react'
import Input from './Input'
import {withStyles} from "@material-ui/core";
import {FormDataContext} from './Context'
import Inputs from './Inputs';

const styles = {
  body: {
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    width:'80%'
  },
  formRow: {
    marginBottom: 10,
  },
  row:{
    display:'flex'
  }
};



function BodyList(props) {
  const list = props.values;
  let listItems;
  if(props.fieldDesc.fieldType==="TREE_FIELD_OBJECT"){
    listItems = <Inputs {...props.fieldDesc} {...props.values}/>
  }else {

    listItems = list.map((field, ind) =>

      <div className="col-10" key={"body_" + props.fieldDesc.num + "_" + ind}>
        <div className="row">
          <div className="col-11">
            {field.objectValue?<Inputs  {...props.fieldDesc} ind={ind} />:<Input {...props.fieldDesc} fieldType={props.fieldDesc.fieldType.replace('_REPEATABLE', '')} ind={ind}/>}

          </div>
          <div className="col-1">
            <button className="btn btn-danger" onClick={() => {
              props.removeElement(props.fieldDesc.num, ind)
            }}>X
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <div className="row">{listItems}<div className="col-2">
    <button className="btn btn-info" onClick={()=>{props.addElement(props.fieldDesc.num)}}>+</button></div>
  </div>;
}

class Body extends PureComponent {
  static contextType = FormDataContext;

  render() {
    const {classes, ...all} = this.props;
    const allProps = {values: this.context.fieldValues[all.num], fieldDesc:all, addElement:this.context.addElement, removeElement:this.context.removeElement};
    return (
      <div key={"div"+this.props.num} style={{width:'80%'}}>
        {(typeof (this.context.fieldValues[all.num])!=='undefined' && this.context.fieldValues[all.num].map)?  <BodyList {...allProps}/>      :this.context.fieldValues[all.num].objectValue?
          <Inputs  {...all}/>:<Input {...all} />}
      </div>
    )
  }
}


export default withStyles(styles)(Body);
