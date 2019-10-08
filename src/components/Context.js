import React, { PureComponent } from 'react'

import { albums, fields } from './../formData'
import field_structure from "../field_structure";

export const FormDataContext = React.createContext()
export class FormDataProvider extends PureComponent {
  constructor(props) {
    super(props)

    //Setup initial State
    /*const formData = {}
    for (let i = 0; i < albums.length; i++) {
      for (let j = 0; j < fields.length; j++) {
        formData[`${albums[i].albumId}_${fields[j].fieldId}`] = ''
      }
    }*/

    this.state = { fieldValues:{}, setState: this.handleSetState }
  }

  componentDidMount(){
    fetch('http://localhost:4000/form/fields').then(res => res.json())
      .then(json => {

        const generatedData = this.recursiveTraverse(json, null, {
          "10.4": [{"_id": 15, "value": "ავტორი"}, {
            "_id": 17,
            "value": "მეურვე"
          }], "1.3": "dada is here"
        });

          this.setState({fieldValues: generatedData})
        });

  }



  recursiveTraverse (arr, obj, ObjectValue)  {
    if (!obj) {
      obj = {}
    }
    for (let i = 0; i < arr.length; i++) {
      this[("ref_" + arr[i].num).trim()] = React.createRef()
      if (arr[i].children && arr[i].children.length) {
        this.recursiveTraverse(arr[i].children, obj, ObjectValue)
      } else {
        arr[i].parent = arr;
        obj[arr[i].num] = ObjectValue[arr[i].num] || (arr[i].fieldType.indexOf('_REPEATABLE') > 0 ? [""] : "")
      }
    }

    return obj;
  }


  handleSetState = (object) => {
    const { fieldValues } = this.state;
    this.setState({ fieldValues: { ...fieldValues, ...object } })
  }

  render() {
    return (
      <FormDataContext.Provider value={this.state}>{this.props.children}</FormDataContext.Provider>
    )
  }
}
