// page.tsx
"use client";

import { Provider } from "react-redux";
import store from "../app/store";
import LoginForm from "../app/components/LoginForm";

const MyApp = () => {
  return (
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );
};

export default MyApp;
