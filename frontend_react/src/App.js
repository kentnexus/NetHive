import React, { Component } from "react";
import {Route, Routes, Link} from "react-router-dom";

import Landing from "./components/landing.component";
import Home from "./components/home.component";
import Analytics from "./components/analytics.component";
import Inventory from "./components/inventory.component";
import Solutions from "./components/solutions.component";
import Users from "./components/users.component";



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
                {<Link to={"/analytics"}>
                    Analytics
                </Link>}
                {<Link to={"/inventory"}>
                    Inventory
                </Link>}
                {<Link to={"/solutions"}>
                    Solutions
                </Link>}
                {<Link to={"/users"}>
                    Users
                </Link>}

                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="/solutions" element={<Solutions />} />
                        <Route path="/users" element={<Users />} />
                    </Routes>
                </div>
            </div>
        );
    }
}

export default App;
