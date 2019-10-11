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

    <div style={styles.formRow} key={"body_"+props.fieldDesc.num}>
      <Input {...props.fieldDesc} fieldType= {props.fieldDesc.fieldType.replace('_REPEATABLE','') } ind={ind}  />
    </div>
  );
  return <div>{listItems}</div>;
}

class Body extends PureComponent {
  static contextType = FormDataContext;

  render() {
    const {classes, ...all} = this.props;
    const allProps = {values: this.context.fieldValues[all.num], fieldDesc:all};
    return (
      <div className={classes.body}>
        {(typeof (this.context.fieldValues[all.num])!=='undefined' && this.context.fieldValues[all.num].map)?  <BodyList {...allProps}/>      :<Input {...all} />}
      </div>
    )
  }
}


export default withStyles(styles)(Body);
