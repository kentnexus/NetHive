import React from "react";
import axios from "axios";

const Analytics = () => {

    async function getUser() {
        try {
          const response = await axios.get('/assets');
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }

    return (
        <div>
            <h1>This is Dashboard Analytics</h1>
        </div>
    );
  };
  
  export default Analytics;