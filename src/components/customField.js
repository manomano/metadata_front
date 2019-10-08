import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Infobox from "./Infobox";
import {FormControl, MenuItem, Select, Tooltip} from "@material-ui/core";
import enums from "../enums";
import Button from "@material-ui/core/Button";
import React from "react";

const customField =(node)=>{


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
                enums.keys[node.num.replace(/\./g,"_")].table.map(x => {
                  return <MenuItem value={x.name}>{x.name}</MenuItem>
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
