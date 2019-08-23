import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles(theme => ({
  typography: {
    padding: '3%',
    '& label': {'font-weight': 'bold'}
  },

  container: {
    width: '40%',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  button: {margin: '0 0 0 0'}

}));


function Infobox(props) {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);


  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>

      <Box p={0} m={0}>
        <Button aria-describedby={props.num} variant="contained" onClick={handleClick}>
          აღწერა/განმარტება
        </Button>
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

    </div>
  );
}


export default Infobox;

