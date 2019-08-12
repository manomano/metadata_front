import React, { useState } from 'react';
//import injectSheet from 'react-jss'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles(theme => ({
    typography: {
        padding: '3%',
        /*'& div':{padding:'10px'},*/
        '& label':{'font-weight':'bold'}
    },

  container: {
    display: 'column',
    width:'80%',
    /*flexWrap: 'wrap',*/
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  button:{margin:'0 0 0 0'}
 /* menu: {
    width: 200,
  },*/
}));


function Customtextfield(props) {

  const classes = useStyles();


  const [anchorEl, setAnchorEl] = useState(null);
  const [elementsArr, setElementsArr] = useState([...props.elementsArr]);


  elementsArr.pop();

  console.log(props.nums, elementsArr);

  const open = Boolean(anchorEl);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

   function handleClose() {
    setAnchorEl(null);
  }

  function addElement() {

  }

      return (
        <div className={classes.container}>
          <TextField
            id="standard-name"
            label={props.label}
            value={(props.value.map?props.value[0]:props.value)}
            //onChange={props.handleChange(this.value)}
            margin="normal"
            className={classes.textField}
            variant="outlined"
            fullWidth
          />
          <Button aria-describedby={props.num} variant="contained" onClick={handleClick}>
            Open Popover
          </Button>


          <Button variant="contained" onClick={addElement} className={classes.button}>+</Button>
          <div>
          {
            props.value.map?
            elementsArr.map((row, i) =>
              <div key={i}>
                <TextField
                  id="standard-name"
                  label={props.label}
                  value={props.value[i]}
                  //onChange={props.handleChange(this.value)}
                  margin="normal"
                  className={classes.textField}
                  variant="outlined"
                  fullWidth
                />
              </div>
            ):''

          }




          </div>


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

        </div>
      );
  }


export default Customtextfield;
//export default injectSheet(styles)(customTextField)
