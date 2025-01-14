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
      className="py-2 px-4 bg-verdeAle/50 hover:bg-verdeAle/75 text-white rounded shadow text-2xl"
    >
      Logout
    </button>
  );
};

export default BotonDeslogear;
