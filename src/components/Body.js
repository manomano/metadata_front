import React, { PureComponent } from 'react'
import Input from './Input'
import {withStyles} from "@material-ui/core";

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

class Body extends PureComponent {
  render() {
    const {classes, ...all} = this.props;
    return (
      <div className={all.children && all.children.length?classes.row:classes.body}>
        {all.children && all.children.length?
        all.children.map((field) => {
          const { fieldId, fieldType,num, isRequired } = field;

          return (
            <div style={styles.formRow} key={"body_"+field.num}>
              <label htmlFor={fieldId} style={styles.rowLabel}>
                {num} kartofili
              </label>
              <Input {...field} />
            </div>
          )
        }):<Input {...all} />}
      </div>
    )
  }
}

//export default Body


export default withStyles(styles)(Body);
