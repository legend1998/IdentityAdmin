import AWN from "awesome-notifications";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { auth, firedb } from "./Firebaseconfig";
import validateRefs from "./utils/Utils";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router";
import { useState } from "react";
import logo from "./utils/logo.png";
function Login() {
  //stats

  //hooks
  const [{}, dispatch] = useStateValue();
  const [loading, setloading] = useState(false);
  const history = useHistory();

  let email = useRef();
  let password = useRef();

  let refs = [email, password];

  const loginUser = (e) => {
    e.preventDefault();
    setloading(true);
    let res = validateRefs(refs);
    if (res.success) {
      firedb
        .collection("admin")
        .doc(email.current.value)
        .get()
        .then((user) => {
          if (user.data()) {
            localStorage.setItem("user", JSON.stringify(user.data()));
            dispatch({
              type: "SET_USER",
              user: user.data(),
            });
            auth
              .signInWithEmailAndPassword(
                email.current.value,
                password.current.value
              )
              .then((data) => {
                if (data.user) {
                  new AWN().success("logged In", { position: "bottom-right" });
                  history.replace("/panel/dashboard");
                  return;
                }
              })
              .catch((e) => {
                new AWN().alert(e.message, { position: "bottom-right" });
              })
              .finally(() => {
                setloading(false);
              });
          } else {
            new AWN().alert("no user ", { position: "bottom-right" });
            setloading(false);
          }
        });
    } else {
      new AWN().alert(res.message, { position: "bottom-right" });
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen w-full border-8 border-white login">
      <div className=" h-32 p-10 ">
        <img src={logo} alt="logo" className="  h-20" />
      </div>
      <div className="flex items-end  w-full md:w-2/3 h-full   justify-center">
        <div className="text-white w-full lg:w-1/2 mt-10  p-5">
          <h1 className="text-7xl">Hello There.</h1>
          <p className="text-2xl my-5 text-gray-500">
            TrakLab | Admin Login Portal
          </p>
          <form
            method="get"
            className="text-black "
            onSubmit={(e) => loginUser(e)}
          >
            <input
              type="text"
              placeholder="Email ID"
              name="email"
              ref={email}
              className="focus:outline-none h-14 w-full border p-3 mt-5"
            />
            <div className="my-2 p-0 flex h-14 items-center ">
              <input
                type="password"
                placeholder="Password"
                name="password"
                ref={password}
                className="focus:outline-none h-14 w-2/3 border p-3"
              />
              <button className="focus:outline-none h-14 w-1/3  text-black bg-white appearance-none capitalize">
                Forgot Password?
              </button>
            </div>
            <div className="w-full flex items-center justify-end ">
              {loading ? (
                <button
                  className="focus:outline-none h-full w-44 bg-blue-600 text-white p-5"
                  onClick={(e) => loginUser(e)}
                >
                  <i className="fas fa-spinner animate-spin  mx-3"></i>
                </button>
              ) : (
                <button
                  className="focus:outline-none h-full w-44 bg-blue-600 text-white p-5"
                  onClick={(e) => loginUser(e)}
                >
                  Login <i className="fas fa-arrow-right mx-3"></i>
                </button>
              )}
            </div>
          </form>

          <Link to="/signup" className="p-3  text-gray-400">
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
