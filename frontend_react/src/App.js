import React, { Component } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
const bg = require("./images/yellow_abstract_bg.jpg");

// import Landing from "./components/landing.component";
// import Home from "./components/home.component";

import Home from "./pages/Home";

class App extends Component {
  // constructor(props){
  //     super(props);

  //     this.state = {
  //         content: ""
  //     };
  // }

  render() {
    return (
      <div>
        {/* <h1>NetHive</h1> */}
        <Routes>
          {/* <Route path="/" element={<Landing />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <div className="container mt-3"></div>
      </div>
    );
  }
}

export default App;
