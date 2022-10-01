import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import RecordRTC, { invokeSaveAsDialog } from "recordrtc";

import { LoginPage } from "./LoginPage/LoginPage";
import { RegisterPage } from "./RegisterPage/RegisterPage";
import { MainPage } from "./MainPage/MainPage";
import { postVideoWebm } from "../store/video/init";

export const Pages = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/*" component={MainPage} />
      </Switch>
      <ToastContainer hideProgressBar={true} />
    </BrowserRouter>
  );
};
