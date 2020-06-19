import React, { useContext, useState } from "react";
const qs = require("querystring");
import { UserContext } from "./user_provider";

const Dashboard = props => {
  const { state } = useContext(UserContext);
  
  if(state.isLoggedIn){
    return (
      <>
        <h1 className="error"> Welcome to dashboard </h1>
      </>
      );
  } else {

    return (
      <>
        <h1 className="error"> Please Login </h1>
      </>
      );
  }
  
  
};

export default Dashboard;
