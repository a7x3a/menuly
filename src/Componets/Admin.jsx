import React, { useState, useEffect } from "react";
import { auth } from "../DB/Config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { lineWobble } from "ldrs";
import { RiLogoutCircleLine } from "react-icons/ri";

lineWobble.register();
const Admin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Redirect to login if no user is authenticated
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove("userToken");
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="w-full h-screen bg-orange-300 flex flex-col items-center p-6">
      {user ? (
        <div className="w-full flex flex-col gap-3">
          {/**Admin Header */}
          <div className="w-full  bg-white shadow-md rounded-xl p-6">
            <h1 className="text-2xl font-bold capitalize tracking-widest text-center text-gray-800">
              Admin Dashboard
            </h1>
            <div className="divider"></div>
            <div className="flex justify-between items-center gap-4">
              <h2 className="text-lg font-semibold capitalize text-black/70">
                Welcome - {user.email}
              </h2>
              <button
                className="btn btn-error w-fit hover:scale-[97%] text-white hover:bg-red-500"
                onClick={handleLogout}
              >
                <RiLogoutCircleLine size={20}/>
              </button>
            </div>
          </div>
          {/**Card Reveals */}
          <div className="w-full bg-white py-5 rounded-xl">
              
          </div>
        </div>
      ) : (
        <div className="w-full h-fit flex justify-center items-center">
          <l-line-wobble
            size="300"
            stroke="5"
            bg-opacity="0.1"
            speed="1.75"
            color="white"
          ></l-line-wobble>
        </div>
      )}
    </div>
  );
};

export default Admin;
