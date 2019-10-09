import React, { PureComponent } from 'react'
import Input from './Input'
import {withStyles} from "@material-ui/core";

const styles={

  body: {
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  formRow: {
    marginBottom: 10,
  }
}

class Body extends PureComponent {
  render() {
    const {classes, ...all} = this.props
    return (
      <div style={styles.body}>
        all.children && all.children.length?
        {all.children.map((field) => {
          const { fieldId, fieldName } = field

          return (
            <div style={styles.formRow} key={fieldId}>
              <label htmlFor={fieldId} style={styles.rowLabel}>
                {fieldName}
              </label>
              <Input {...all} />
            </div>
          )
        })}:<Input {...all} />
      </div>
    )
  }
}

//export default Body


export default withStyles(styles)(Body);
