import React from 'react';

const Context = React.createContext('page');
let listItem = window.localStorage.getItem('listItem');

class PageContext extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showForm: false,
            edit: false,
            selectedIndex: null,
           formInput: {
                type: '',
               text: '',
               x: 0,
               y: 0,
               size: 16,
               weight: 400
           },
           itemList: listItem !== null ? JSON.parse(listItem) : [],
           setItemList: () => {
               if(this.state.edit) {
                let newArray = [...this.state.itemList];
                newArray[this.state.selectedIndex] = this.state.formInput;
                this.setState({
                    itemList: newArray,
                    edit: false
                })
               } else {
                   this.setState({
                           itemList: [...this.state.itemList, {
                             type: this.state.formInput.type, 
                             text: this.state.formInput.text,
                             x: this.state.formInput.x,
                             y: this.state.formInput.y,
                             size: this.state.formInput.size,
                             weight: this.state.formInput.weight,
                           }],
                           edit: false
                   })
               }
               this.state.setSelectedIndex(null)
           },
           onDrop: (x,y) => {
            let newArray = [...this.state.itemList];
            newArray[this.state.selectedIndex].x = x;
            newArray[this.state.selectedIndex].y = y;
            this.setState({
                itemList: newArray,
                edit: false
            })
            this.state.setSelectedIndex(null)
           },
           delItemList: (i) => {
               let newArray = this.state.itemList;
               newArray.splice(i,1)
                this.setState({
                    itemList: newArray
                })
                this.state.setSelectedIndex(null)
            window.localStorage.setItem('listItem', JSON.stringify(this.state.itemList));
           },
           editForm: () => {
            this.setState({
                formInput: this.state.itemList[this.state.selectedIndex]
            })
           },
           toggleForm: () => {
               this.setState(state => {
                return {
                    showForm: !state.showForm
                };
              })
           },
           setSelectedIndex: (i) => {
            this.setState({
                selectedIndex: i
            })
           },
           setText: (e) => {
            this.setState({
                formInput: {...this.state.formInput, text: e}
            })
           },
           setSize: (e) => {
            this.setState({
                formInput: {...this.state.formInput, size: e}
            })
           },
           setWeight: (e) => {
            this.setState({
                formInput: {...this.state.formInput, weight: e}
            })
           },
           setx: (e) => {
            this.setState({
                formInput: {...this.state.formInput, x: e}
            })
           },
           sety: (e) => {
            this.setState({
                formInput: {...this.state.formInput, y: e}
            })
           },
           setForm: (x,y) => {
               this.setState({
                   formInput: {...this.state.formInput, x:x, y:y}
               })
           },
           setType: (type) => {
            this.setState({
                formInput: {...this.state.formInput, type:type}
                })
           },
           setEdit: (value) => {
               this.setState({
                   edit: value
               })
           }
        }
    }
    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

const ContextHOC = (SomeComponent, props) => {
    return (
        <Context.Consumer>
            {val => <SomeComponent {...val} {...props} />}
        </Context.Consumer>
    );
};

export {
    ContextHOC,
    Context,
    PageContext
};
