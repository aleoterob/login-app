// components/LogoutButton.tsx
"use client";

import { FC } from "react";
import { useAppDispatch } from "../store";
import { logout } from "../store";
import { useRouter } from "next/navigation";

const BotonDeslogear: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/"); // Redirigir a la página de inicio después de logout
  };

  return (
    <button
      onClick={handleLogout}
      className="py-2 px-4 bg-red-500 text-white rounded shadow hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default BotonDeslogear;
