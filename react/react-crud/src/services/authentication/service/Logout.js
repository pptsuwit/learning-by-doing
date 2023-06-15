import React, { useEffect } from "react";
import { authenticationService } from "./authentication.service";
import { useHistory } from "react-router-dom";
export default function Logout() {
  let history = useHistory();
  useEffect(() => {
    if (!authenticationService.currentUserValue) {
      history.push("/login"); //return to login
    }
  });
  return <div></div>;
}
