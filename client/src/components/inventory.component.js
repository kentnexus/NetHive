import React, {Component} from "react";

export default class Inventory extends Component{
    constructor(props){
        super(props);

        this.state = {
            content: ""
        };
    }

    render() {    
        return (
            <p>Inventory Screen</p>
        );
      }    
}