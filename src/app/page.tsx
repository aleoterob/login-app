"use client";

import { Provider } from "react-redux";
import store from "../app/store";
import LoginForm from "../app/components/LoginForm";

const MyApp = () => {
  return (
    <Provider store={store}>
      <div className="flex flex-col items-start sm:items-center pb-8 w-90% sm:w-90% md:w-90% lg:w-90 xl:w-90 2xl:w-1240">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/back.jpg')" }}
        ></div>
        <div className="relative z-10">
          <LoginForm />
        </div>
      </div>
    </Provider>
  );
};

export default MyApp;
