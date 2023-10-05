import React, {Component} from "react";

export default class Landing extends Component{
    constructor(props){
        super(props);

        this.state = {
            content: ""
        };
    }

    render() {    
        return (
            <p>Hello World!</p>
        );
      }    
}