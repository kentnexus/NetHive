import React, {Component} from "react";

export default class Users extends Component{
    constructor(props){
        super(props);

        this.state = {
            content: ""
        };
    }

    render() {    
        return (
            <p>User Screen</p>
        );
      }    
}