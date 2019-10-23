import React, {PureComponent} from 'react'


export const FormDataContext = React.createContext()

export class FormDataProvider extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {fieldValues: {}, fieldStructure: [], setState: this.handleSetState, enums: {}, addElement: this.addElement, removeElement: this.removeElement};
  }

  componentDidMount() {
    fetch('http://localhost:4000/form/fields').then(res => res.json())
      .then(json => {

        const generatedData = this.recursiveTraverse(json.fields, null, {
          /*"10.4": [{"_id": 15, "value": "ავტორი"}, {
            "_id": 17,
            "value": "მეურვე"
          }], "1.3": {value:"dada is here", id:17}*/
        });
        console.log(generatedData);
        this.setState({fieldValues: generatedData, fieldStructure: json.fields, enums: json.enums[0]})
      }).catch(function (error) {
      console.log(error);
    });

  }


  recursiveTraverse(arr, obj, ObjectValue) {
    if (!obj) {
      obj = {}
    }
    for (let i = 0; i < arr.length; i++) {
      this[("ref_" + arr[i].num).trim()] = React.createRef()
      if (arr[i].children && arr[i].children.length && ['TREE_FIELD_REPEATABLE_INSIDE', 'TREE_FIELD_REPEATABLE', "TREE_FIELD_OBJECT"].indexOf(arr[i].fieldType) < 0) {
        this.recursiveTraverse(arr[i].children, obj, ObjectValue)
      } else {
        arr[i].parent = arr;
        let isObject = ['TREE_FIELD_REPEATABLE_INSIDE', 'TREE_FIELD_REPEATABLE', "TREE_FIELD_OBJECT"].indexOf(arr[i].fieldType) >= 0;
        let initalArray = isObject ? this.generateObjectArr(arr[i]) : [{value: "", key: arr[i].num}]
        obj[arr[i].num] = ObjectValue[arr[i].num] || (arr[i].fieldType.indexOf('_REPEATABLE') > 0 ? initalArray : {
          value: "",
          key: arr[i].num
        })
      }
    }

    return obj;
  }


  generateObjectArr(branch) {
    let arr = [{key: branch.num, value: null, objectValue: {}}];
    branch.children.forEach(x => {
      arr[0].objectValue[x.num] = {value: ""}
    })
    return arr;
  }


  handleSetState = (object) => {
    const {fieldValues} = this.state;
    const key = Object.keys(object)[0];


    const obj = JSON.parse(JSON.stringify(fieldValues[key]));
    if(object.hasOwnProperty("ind") && typeof(object.ind)!=="undefined"){
      obj[object.ind].value = object[key];
    }else{
      obj.value = object[key];
    }

    this.setState({fieldValues: {...fieldValues, [key]: obj}})
  }


  addElement = (key)=>{
    const {fieldValues} = this.state;
    if(fieldValues[key].map){
      const lastVal = fieldValues[key][fieldValues[key].length-1];
      const newObject = {...lastVal};
      newObject.value = {value: ""}
      const obj = JSON.parse(JSON.stringify(fieldValues[key]));
      obj.push(newObject);

      this.setState({fieldValues: {...fieldValues, [key]: obj}})
    }
  }

  removeElement = (key, index)=> {
    const {fieldValues} = this.state;
    const copied = [...fieldValues[key]];
    copied.splice(index,1);
    this.setState({fieldValues: {...fieldValues, [key]: copied}});
  }






  render() {
    return (
      <FormDataContext.Provider value={this.state}>{this.props.children}</FormDataContext.Provider>
    )
  }
}
