import React from 'react';
import Input from './Input';

export default function Inputs(props) {

    const {num, children, ind} = props;
    const colCount = Math.floor(12/children.length);

    const childElements = children.map((child, index)=>

      <div key={"div_"+props.hasOwnProperty("ind") && typeof(props.ind)!=='undefined'?ind+"_":""+child.num} className={"col-"+colCount}>
        <Input key={"key_"+props.hasOwnProperty("ind") && typeof(props.ind)!=='undefined'?ind+"_":""+child.num} ind={ind} {...child}  />
      </div>
    );

    return (<div className={"row"} key={"inputs_"+props.hasOwnProperty("ind") && typeof(props.ind)!=='undefined'?ind+"_":""+num}>{childElements}</div>);
}
