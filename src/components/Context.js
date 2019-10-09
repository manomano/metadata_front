import React, { PureComponent } from 'react'


export const FormDataContext = React.createContext()
export class FormDataProvider extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { fieldValues:{}, fieldStructure:[], setState: this.handleSetState, enums:{} }
  }

  componentDidMount(){
    fetch('http://localhost:4000/form/fields').then(res => res.json())
      .then(json => {

        const generatedData = this.recursiveTraverse(json.fields, null, {
          "10.4": [{"_id": 15, "value": "ავტორი"}, {
            "_id": 17,
            "value": "მეურვე"
          }], "1.3": "dada is here"
        });

          this.setState({fieldValues: generatedData, fieldStructure:json.fields, enums:json.enums[0]})
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
