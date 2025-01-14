"use client";

import { Provider } from "react-redux";
import store from "../app/store";
import LoginForm from "../app/components/LoginForm";

const MyApp = () => {
  return (
    <Provider store={store}>
      <div className="relative w-full h-screen">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          src="/videos/video.mp4" // Cambia esta URL por la de tu video
        />
        <div className="relative z-10">
          <LoginForm />
        </div>
      </div>
    </Provider>
  );
};

export default MyApp;
