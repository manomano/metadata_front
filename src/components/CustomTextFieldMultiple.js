import React, {useState} from 'react';
//import injectSheet from 'react-jss'
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles(theme => ({
  typography: {
    padding: '3%',
    /*'& div':{padding:'10px'},*/
    '& label': {'font-weight': 'bold'}
  },

  container: {
    // display: 'column',
    width: '40%',
    /*flexWrap: 'wrap',*/
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  button: {margin: '0 0 0 0'}
  /* menu: {
     width: 200,
   },*/
}));


function Customtextfield(props) {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);


  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function addElement() {
    props.addElement(props.num);
  }

  function removeElement(i) {
      props.removeElement(props.num,i);
  }

  function onchange(event) {
    //setTheValue(event.target.value)
   /* setElementsArr(function (prevState) {
      if(prevState.map){
        prevState[0] = event.target.value;
      }else{
        prevState = event.target.value;
      }


    })*/
    props.handleChange(props.num, event.target.value);
  }


  function onListChange(event, index){
      const value = event.target.value;
      const num = props.num;
      props.onListChangeSpecial({ index, value, num})
  }



  return (
    <Box display="flex"
         flexWrap="wrap"
         p={3}
         m={1}
         css={{maxWidth: 900, border: '1px solid #ececec', borderRadius: 7, padding:0}}>
      <Box component="div" css={{width: 550, padding:0}} display="inline" p={1} m={1}>
        <TextField
          inputProps={{style:{height:'0.6em'}}}
          id="standard-name"
          label={props.label}
          value={props.value.map?props.value[0]:props.value}
          onBlur={(e)=>{onchange(e)}}
          margin="normal"
          className={classes.textField}
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box component="span" display="inline-block" css={{marginTop: 25,  padding:0}} p={1} m={1}>
        <Button aria-describedby={props.num} variant="contained" onClick={handleClick}>
          აღწერა/განმარტება
        </Button>
      </Box>
      {props.value.map ?
        <Box component="div" display="inline-block" css={{marginTop: 25}} p={1} m={1}>
          <Button variant="contained" onClick={addElement} className={classes.button}>+</Button>
        </Box> : ""}
      <Box component="div" display="block" css={{paddingLeft: 15}}>
        {
          props.value.map ?
            props.value.slice(1,props.value.length).map((row, i) =>

              <Box display="flex"
                   flexWrap="wrap" css={{height: 65, border: '0px solid green'}} key={"cont_" + i+1}>
                <Box display="inline-block" css={{width: 550}} key={i+1}>
                  <TextField
                    label={props.label}
                    value={props.value[i+1]}
                    onChange={(e)=>{onListChange(e,i+1)}}
                    margin="normal"
                    className={classes.textField}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Box>
                <Box display="inline-block" css={{marginTop: 20, marginLeft: 30, height: 40}} key={"delete_" + i}>
                  <Button variant="contained" className={classes.button} onClick={() => {
                    removeElement(i+1)
                  }}>X</Button>
                </Box>
              </Box>
            ) : ''

        }


      </Box>


      <Popover
        id={props.num}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>

          <label>განმარტება</label>
          <br/>
          <span>{props.definition}</span>
          <br/>
          <label>ნიმუში</label>
          <br/>
          <span>{props.sample}</span>
          <br/>
          <label>შენიშვნა</label>
          <br/>
          <span>{props.note}</span>

        </Typography>
      </Popover>

    </Box>
  );
}


export default Customtextfield;
//export default injectSheet(styles)(customTextField)
