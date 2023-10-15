import React, {Component} from "react";

export default class Analytics extends Component{
    constructor(props){
        super(props);

        this.state = {
            content: ""
        };
    }

    render() {    
        return (
            <p>Analytics Screen</p>
        );
      }    
}