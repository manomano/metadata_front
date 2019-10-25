import React, { PureComponent } from 'react'

import { FormDataContext } from './Context'
import Infobox from "./Infobox";
import Box from "@material-ui/core/Box";
import {withStyles } from "@material-ui/core";
import Input from "./Input";
import Body from "./Body";


const styles = {
  level_div:{
    padding:'5px 5px 5px 25px',
    // boxShadow: '0.25rem 0.25rem 0.6rem rgba(0,0,0,0.05), 0 0.5rem 1.125rem rgba(75,0,0,0.05)',
    borderRadius: '3px',
    borderBottom:'1px solid #ccc',
    borderLeft:'1px solid #ccc',
    borderRight:'1px solid #ccc',
    borderTop:'1px solid #ccc',
    marginTop: '1rem'
  }
}




class Form extends PureComponent {
  static contextType = FormDataContext
  constructor(props) {
    super(props)


    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    console.log('Submitting Form! Form data:', this.context.fieldValues)
  }
  render() {
    const { classes } = this.props;
    return (
      <form  onSubmit={this.handleSubmit}>

        <div className="row">
                <div className="col-6"><h4>DYNAMIC FORM ORGANIZED WITH CONTEXT</h4></div>
                <div className="col-6"><button type="submit" className="btn btn-primary">Submit</button></div>
        </div>
        {this.context.fieldStructure.map(xlevel_1=>{
          return <div className={classes.level_div} key={"key_"+xlevel_1.num}>{xlevel_1.num} {xlevel_1.label}



          {xlevel_1.children && xlevel_1.children.length && ['TREE_FIELD_REPEATABLE', "TREE_FIELD_OBJECT"].indexOf(xlevel_1.fieldType)<0?
            xlevel_1.children.map(xlevel_2=>{
              const propsToPass = {...xlevel_2};
              return <div className={classes.level_div} key={"key_"+xlevel_2.num}>{xlevel_2.num} {xlevel_2.label}

                {
                  xlevel_2.children && xlevel_2.children.length && ['TREE_FIELD_REPEATABLE', "TREE_FIELD_OBJECT"].indexOf(xlevel_2.fieldType)<0?
                  xlevel_2.children.map(xlevel_3=>{
                    return <div className={classes.level_div} key={"key_"+xlevel_3.num}>{xlevel_3.num} {xlevel_3.label}
                      <div className="row">
                        <Body {...xlevel_3}/>
                        <Infobox definition={xlevel_3.definition} sample={xlevel_3.sample} note={xlevel_3.note}/>
                      </div>
                    </div>
                  }):<div className="row">
                      <Body {...propsToPass}/>
                      <div>
                        <Infobox definition={xlevel_2.definition} sample={xlevel_2.sample} note={xlevel_2.note}/>
                      </div>
                    </div>
                }
              </div>
            }):<div className="row">
              <div>
                <Infobox definition={xlevel_1.definition} sample={xlevel_1.sample} note={xlevel_1.note}/>
              </div>
            </div>}
          </div>

        })}


      </form>
    )
  }
}

export default withStyles(styles)(Form);
