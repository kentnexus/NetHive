import React, { Component } from "react";
import {Route, Routes, Link} from "react-router-dom";

import Landing from "./components/landing.component";
import Home from "./components/home.component";



class App extends Component {
    // constructor(props){
    //     super(props);
        
    //     this.state = {
    //         content: ""
    //     };
    // }

    render(){
        return (
            <div className="header">
                <h1>NetHive</h1>
                {/* <Link to={"/"}>
                    tklp
                </Link> */}

                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                    </Routes>
                </div>
            </div>
        );
    }
}

export default App;
