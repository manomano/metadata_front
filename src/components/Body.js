import React, { PureComponent } from 'react'
import Input from './Input'
import {withStyles} from "@material-ui/core";
import {FormDataContext} from './Context'

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


  const listItems = list.map((field, ind) =>

    <div className="col-8" key={"body_"+props.fieldDesc.num + "_"+ind}>
      <div className="row" style={{border:'1px solid red'}}>
        <div className="col-9">
          <Input {...props.fieldDesc} fieldType= {props.fieldDesc.fieldType.replace('_REPEATABLE','') } ind={ind}  />
        </div>
        <div className="col-3">
          <button className="btn btn-danger" onClick={()=>{props.removeElement(props.fieldDesc.num, ind)}}>X</button>
        </div>
      </div>
    </div>
  );
  return <div className="row">{listItems}<div className="col-4"><button className="btn btn-info" onClick={()=>{props.addElement(props.fieldDesc.num)}}>+</button></div></div>;
}

class Body extends PureComponent {
  static contextType = FormDataContext;

  render() {
    const {classes, ...all} = this.props;
    const allProps = {values: this.context.fieldValues[all.num], fieldDesc:all, addElement:this.context.addElement, removeElement:this.context.removeElement};
    return (
      <div style={{width:'80%'}}>
        {(typeof (this.context.fieldValues[all.num])!=='undefined' && this.context.fieldValues[all.num].map)?  <BodyList {...allProps}/>      :<Input {...all} />}
      </div>
    )
  }
}


export default withStyles(styles)(Body);
