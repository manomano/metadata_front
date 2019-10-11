import React, { PureComponent } from 'react'

import { FormDataContext } from './Context'
import Infobox from "./Infobox";
import Box from "@material-ui/core/Box";
import {withStyles } from "@material-ui/core";
import Input from "./Input";
import Body from "./Body";


const styles = {
  level_div:{
    border:'0px solid #cecece',
    padding:'5px 5px 5px 15px',
    boxShadow: '0.25rem 0.25rem 0.6rem rgba(0,0,0,0.05), 0 0.5rem 1.125rem rgba(75,0,0,0.05)',
    borderRradius: '0 0.5rem 0.5rem 0.5rem',
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
        <button type="submit">Submit</button>
        <h1>Dynamic Form Organized With Context</h1>
        {this.context.fieldStructure.map(xlevel_1=>{
          return <div className={classes.level_div} key={"key_"+xlevel_1.num}>{xlevel_1.num} {xlevel_1.label}



          {xlevel_1.children && xlevel_1.children.length && ['TREE_FIELD_REPEATABLE_INSIDE', 'TREE_FIELD_REPEATABLE', "TREE_FIELD_OBJECT"].indexOf(xlevel_1.fieldType)<0?
            xlevel_1.children.map(xlevel_2=>{
              const propsToPass = {...xlevel_2};
              return <div className={classes.level_div} key={"key_"+xlevel_2.num}>{xlevel_2.num} {xlevel_2.label}

                {
                  xlevel_2.children && xlevel_2.children.length && ['TREE_FIELD_REPEATABLE_INSIDE', 'TREE_FIELD_REPEATABLE', "TREE_FIELD_OBJECT"].indexOf(xlevel_2.fieldType)<0?
                  xlevel_2.children.map(xlevel_3=>{
                    return <div className={classes.level_div} key={"key_"+xlevel_3.num}>{xlevel_3.num} {xlevel_3.label}
                      <Box css={{width: '18%', marginTop:20, paddingLeft:15}} p={0} m={0}>
                        <Infobox definition={xlevel_3.definition} sample={xlevel_3.sample} note={xlevel_3.note}/>
                      </Box>
                    </div>
                  }):<Box display="flex" flex-direction="right" flexWrap="wrap" css={{maxWidth: '65%', padding:0, border:'1px solid red'}}>
                      <Body {...propsToPass}/>
                      <Box css={{width: '18%', marginTop:20, paddingLeft:15}} p={0} m={0}>
                        <Infobox definition={xlevel_2.definition} sample={xlevel_2.sample} note={xlevel_2.note}/>
                      </Box>
                    </Box>
                }
              </div>
            }):<Box display="flex" flex-direction="right" flexWrap="wrap" css={{maxWidth: '65%', padding:0, border:'1px solid red'}}>
              <Body {...xlevel_1}/>
              <Box css={{width: '18%', marginTop:20, paddingLeft:15}} p={0} m={0}>
                <Infobox definition={xlevel_1.definition} sample={xlevel_1.sample} note={xlevel_1.note}/>
              </Box>
            </Box>}
          </div>

        })}


      </form>
    )
  }
}

export default withStyles(styles)(Form);
