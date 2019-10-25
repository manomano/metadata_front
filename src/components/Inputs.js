import React from 'react';
import Input from './Input';

export default function Inputs(props) {

    const {num, children, ind} = props;
    const colCount = Math.floor(12/children.length);
    const key_part = num + (props.hasOwnProperty("ind") && typeof(props.ind)!=='undefined'?"_"+ind:"");
    const childElements = children.map((child, index)=>

      <div key={"div_"+key_part+"_"+child.num} className={"col-"+colCount}>
        <Input key={"key_"+key_part +"_"+child.num} ind={ind} {...child}  />
      </div>
    );

    return (<div className={"row"} key={"inputs_"+key_part}>{childElements}</div>);
}
