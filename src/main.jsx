/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Store } from "./Redux/Store.js";
import { Provider } from "react-redux";
// import AgoraRTC from "agora-rtc-sdk-ng";
// import { AgoraRTCProvider } from "agora-rtc-react";
// const Client = ({ children }) => {
//   return (
//   <AgoraRTCProvider client={AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })}>
  
//       {children}

//   </AgoraRTCProvider>
//   );
// };
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <BrowserRouter>
    {/* <Client /> */}
      <App />
    
    </BrowserRouter>
  </Provider>
);
