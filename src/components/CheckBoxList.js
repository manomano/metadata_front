import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxList(props) {
  const classes = useStyles();
  const initialData = (props.selectedValues && props.selectedValues.map)?[...props.selectedValues]:[props.selectedValues]
  const [checked, setChecked] = React.useState(initialData);

  const handleToggle = value => () => {


    setChecked(function (prevState) {

      const currentIndex  = prevState.findIndex(x=>x.value==value.name)
      //const currentIndex = checked.indexOf(value);
      const newChecked = [...prevState];

      if (currentIndex === -1) {
        newChecked.push({value:value.name});
      } else {
        newChecked.splice(currentIndex, 1);
      }


      return newChecked
    });
  };

  return (
    <List className={classes.root}>
      {props.source.map(value => {
        const labelId = `checkbox-list-label-${value.domain}`;

        return (
          <ListItem key={value.domain} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.findIndex(x=>x.value==value.name) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText css={{width:200}} id={labelId} primary={"სახელი: "+ value.name + " დომენი: " + value.domain + " განმარტება: " + value.explanation} />

          </ListItem>
        );
      })}
    </List>
  );
}
