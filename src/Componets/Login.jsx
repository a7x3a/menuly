import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../DB/Config";
import { useRef } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { LanguageContext } from "../Context/LanguageContext";

const Login = () => {
  const {lang} = useContext(LanguageContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  async function signIn(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
       const userCredential = await signInWithEmailAndPassword(
         auth,
         email,
         password
       );
       const user = userCredential.user;
       Cookies.set("userToken",user.accessToken,{expires:7})
       navigate("/admin")
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  }

  return (

    <div
      className={`w-full  h-[80dvh]  bg-orange-300 flex justify-center flex-col items-center`}
    >
      <form
        onSubmit={signIn}
        className="w-fit h-fit border sm:p-16 p-10 rounded-3xl bg-white border-white grid gap-4"
      >
        <h1 className="text-xl sm:text-2xl uppercase text-black/60  pb-4 text-center   font-bold">
          {lang === "en" && "Login to continue!"}
          {lang === "ar" && "!سجل للمتابعە"}
          {lang === "kr" && "!بچۆ ژورەوە بۆ بەردەوام بوون"}
        </h1>
        <label className="input py-1  input-warning flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            ref={emailRef}
            className="grow h-full flex items-center pl-1 placeholder:text-sm"
            placeholder={
              (lang === "en" && "Email") ||
              (lang === "ar" && "برید الکترونی") ||
              (lang === "kr" && "ئیمەیڵ")
            }
          />
        </label>

        <label className="input input-warning flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow h-full flex items-center pl-1 placeholder:text-sm"
            placeholder={
              (lang === "en" && "Password") ||
              (lang === "ar" && "کلمەسر") ||
              (lang === "kr" && "تێپەڕوشە")
            }
            ref={passwordRef}
          />
        </label>
        <button className="btn group font-light tracking-widest px-20  bg-orange-300 hover:bg-orange-400 text-white">
          {(lang === "en" && "Login") ||
            (lang === "ar" && "تسجیل دخول") ||
            (lang === "kr" && "چونەژورەوە")}
          <span className="group-hover:translate-x-3 transition-all duration-500">
            <FaArrowAltCircleRight />
          </span>
        </button>
      </form>
    </div>
  );
};

export default Login;
