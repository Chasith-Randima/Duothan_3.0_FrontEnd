import React from "react";
import { useState, useEffect } from "react";
import { logIn, isAuth, authenticate } from "../../../actions/auth";
import Router from "next/router";
import Message from "../../../components/Message";
import Link from "next/link";

const LogIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  useEffect(() => {
    if (isAuth()) {
      Router.push(`/`);
    }
  }, []);

  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    await logIn(user)
      .then((data) => {
        // console.log(data);
        if (data.status && data.status == "success") {
          data.data.token = data.token;
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });
          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1500);

          // console.log(data);
          // console.log(data.error);
          authenticate(data.data, () => {
            if (isAuth()) {
              Router.push(`/`);
            }
          });
        } else {
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: true,
            success: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          ...alert,
          loading: false,
          message: data.message,
          error: true,
          success: false,
        });
      });
  };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  return (
    <>
      {/* <!-- Login --> */}

      <div className="container py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Login if you are a returning customer
          </p>

          <form action="">
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 mb-2 block">Email Address</label>
                <input
                  type="text"
                  value={email}
                  onChange={handleChange("email")}
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">Password</label>
                <input
                  type="text"
                  value={password}
                  onChange={handleChange("password")}
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your Password"
                />
              </div>
              {alert.error && (
                <Message message={alert.message} display={true} />
              )}
              {alert.success && (
                <Message message={alert.message} display={true} />
              )}
              {alert.loading && (
                <Message message={"Loading...Please Waite..."} display={true} />
              )}
              <div className="mt-4">
                <button
                  className="block w-full py-2 text-center text-black bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                  onClick={handleSubmit}
                >
                  login
                </button>
              </div>
            </div>
          </form>
          <p className="mt-4 text-gray-600 text-center">
            Dont have an account?
            <Link href={`/user/signUp`} className="text-primary">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LogIn;
