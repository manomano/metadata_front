import React, {useState, useEffect} from 'react';
//import injectSheet from 'react-jss'
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckboxList from './CheckBoxList'


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
  button: {margin: '0 0 0 0'},
  repeatedContainer:{
    width: '60%',
    //border:'1px solid #ececec',
    //borderRadius:5,
    padding:5,
    '& div':{
      borderBottom:'1px solid #ececec',
      padding:5,
      margin:'5 0 5 0',
    }
  }
  /* menu: {
     width: 200,
   },*/
}));






function Customselectfieldmultiple(props) {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialogue, setOpenDialogue] = React.useState(false);
  const [theList, setTheList] = React.useState([...props.value])
  let labelWidth = 180


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

  function handleChange(value) {

    setTheList(function (prevState) {

      const currentIndex  = prevState.findIndex(x=>x.value==value.name)
      const newChecked = [...prevState];

      if (currentIndex === -1) {
        newChecked.push({value:value.name});
      } else {
        newChecked.splice(currentIndex, 1);
      }


      return newChecked
    });
  }

  function handleOpenDialogue(){
    setOpenDialogue(true);
  }

  function handleCloseDialogue() {
    setTheList(function (prevState) {
      return props.value
    })


    setOpenDialogue(false);
  }

  function handleSelect(){

    props.onListChange(props.num, theList)
    setOpenDialogue(false);
  }



  let val = "";
  let selectSource = [{
    "name" : "რესურსის მიმწოდებელი",
    "domain" : "1",
    "explanation" : "მხარე, რომელიც გვაწვდის რესურს."
  },
    {
      "name" : "მეურვე",
      "domain" : "2",
      "explanation" : "მხარე, რომელიც ანგარიშვალდებულია და იღებს პასუხისმგებლობას რესურსზე და უზრუნველყოფს რესურსის სათანადო მოვლასა და შენარჩუნებას."
    },
    {
      "name" : "მესაკუთრე",
      "domain" : "3",
      "explanation" : "მხარე, რომლის საკუთრებაც არის რესურსი."
    },
    {
      "name" : "მომხმარებელი",
      "domain" : "4",
      "explanation" : "მხარე, რომელიც იყენებს  რესურსს."
    },
    {
      "name" : "გამავრცელებელი",
      "domain" : "5",
      "explanation" : "მხარე, რომეცლი ავრცელებს რესურსს."
    },
    {
      "name" : "ავტორი",
      "domain" : "6",
      "explanation" : "მხარე, რომელმაც შექმნა რესურსი."
    },
    {
      "name" : "საკონტაქტო პირი",
      "domain" : "7",
      "explanation" : "მხარე, რომელიც უზრუნველყოფს რესურსის შეძენის შესახებ ინფორმაციის მიწოდებას."
    },
    {
      "name" : "მთავარი მკვლევარი",
      "domain" : "8",
      "explanation" : "საკვანძო მხარე, რომელიც პასუხს აგებს ინფორმაციის შეგროვებასა და კვლევის წარმართვაზე."
    },
    {
      "name" : "დამმუშავებელი",
      "domain" : "9",
      "explanation" : "მხარე, რომელიც ამუშავებს მონაცემებს ისე, რომ რესურსი იცვლება."
    },
    {
      "name" : "გამომქვეყნებელი",
      "domain" : "10",
      "explanation" : "მხარე, რომელიც აქვეყნებს რესურსს."
    },
    {
      "name" : "ავტორი",
      "domain" : "11",
      "explanation" : "მხარე, რომელიც რესურსის ავტორია."
    },
    {
      "name" : "სპონსორი",
      "domain" : "12",
      "explanation" : "მხარე, რომელიც რესურსზე პასუხისმგებელი მხარის ნაცვლად წარმოადგენს რესურსს."
    },
    {
      "name" : "თანაავტორი",
      "domain" : "13",
      "explanation" : "მხარე, რომელიც სხვასთან ერთად არის რესურსის ავტორი."
    },
    {
      "name" : "თანამშრომელი",
      "domain" : "14",
      "explanation" : "დამხმარე მხარე რესურსის გენერირების პროცესში, გარდა მთავარი მკვლევარისა."
    },
    {
      "name" : "რედაქტორი",
      "domain" : "15",
      "explanation" : "მხარე, რომელმაც გადაამოწმა ან შეცვალა რესურსი შინაარსის გასაუმჯობესებლად."
    },
    {
      "name" : "მედიატორი",
      "domain" : "16",
      "explanation" : "დაწესებულების კლასი, რომელიც შუამდგომლობს რესურსზე წვდომის პროცესში და რომლისთვისაც განკუთვნილია ან გამოსადეგია რესურსი."
    },
    {
      "name" : "უფლებების მფლობელი",
      "domain" : "17",
      "explanation" : "მხარე, რომელსაც გააჩნია ან რომელიც მართავს უფლებებს რესურსზე."
    },
    {
      "name" : "დამხმარე",
      "domain" : "18",
      "explanation" : "მხარე, რომელსაც წვლილი შეაქვს რესურსში"
    },
    {
      "name" : "დამფინანსებელი ",
      "domain" : "19",
      "explanation" : "მხარე, რომელიც უზრუნველყოფს რესურსის ფინანსურ მხარდაჭერას."
    },
    {
      "name" : "მეწილე",
      "domain" : "20",
      "explanation" : "მხარე, რომელსაც გააჩნია რესურსში ან მის გამოყენებაში ინტერესი (პროცენტი)."
    }]

  return (
    <Box display="flex"
         flexWrap="wrap"
         p={3}
         m={1}
         css={{maxWidth: 900, border: '1px solid #ececec', borderRadius: 7}}>
      <Box display="inline-block"  className={classes.repeatedContainer} >
        {
          props.value && props.value.map?
            props.value.map(function (row, index) {
              return(<Box key={"selVal_"+index} component="div">{row.value}</Box>)
            }):''
        }

      </Box>
      <Box component="div" css={{width: '10%', marginTop:-8}} display="inline-block" p={1} m={1}>
        <Button variant="outlined" color="primary" onClick={handleOpenDialogue}>აირჩიე</Button>
      </Box>
      <Box component="span" display="inline-block" css={{marginTop: -8, width:'20%'}} p={1} m={1}>
        <Button aria-describedby={props.num} variant="contained" onClick={handleClick}>
          აღწერა/განმარტება
        </Button>
      </Box>

      <Dialog
        open={openDialogue}
        onClose={handleCloseDialogue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">აირჩიეთ ჩამონათვალიდან, შიგძლიათ აირჩიოთ რამდენიმე პუნქტი</DialogTitle>
        <DialogContent>
          <CheckboxList selectedValues ={theList} handleChange={handleChange} multiple={!!props.value.map} source={selectSource}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogue} color="primary">
            გაუქმება
          </Button>
          <Button onClick={handleSelect} color="primary" autoFocus>
            არჩევა
          </Button>
        </DialogActions>
      </Dialog>



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


export default Customselectfieldmultiple;

