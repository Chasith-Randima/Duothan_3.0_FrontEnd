import React from "react";
import { useState, useEffect } from "react";
// import Layout from "../../components/Layout";
import Router from "next/router";
import { isAuth, signup } from "../../../actions/auth";
import Link from "next/link";
import Message from "../../../components/Message";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    pharmacyLicense: "",
    password: "",
    passwordConfirm: "",
    error: "",
    loading: false,
    message: "",
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

  const {
    name,
    email,
    password,
    address,
    phoneNumber,
    pharmacyLicense,
    passwordConfirm,
    error,
    loading,
    message,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });
    setValues({ ...values, loading: true, error: false });
    // console.log(values);
    const user = {
      name,
      email,
      password,
      passwordConfirm,
      address,
      phoneNumber,
      pharmacyLicense,
    };
    signup(user)
      .then((data) => {
        if (data.status && data.status == "success") {
          // console.log(data);
          setValues({
            ...values,
            name: "",
            email: "",
            address: "",
            phoneNumber: "",
            pharmacyLicense: "",
            password: "",
            passwordConfirm: "",
            error: "",
            loading: false,
            message: data.statusText,
          });
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

          Router.push(`/auth/LogIn`);
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
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  let showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  let showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  let showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";
  return (
    <>
      {/* <Layout> */}
      {/* <!-- Login --> */}

      <div className="container py-16">
        {/* {showError()}
        {showLoading()}
        {showMessage()} */}

        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">SignUp</h2>
          <p className="text-gray-600 mb-6 text-sm">Signup to our website</p>
          <form action="">
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 mb-2 block">
                  Pharmacy Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={handleChange("name")}
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={handleChange("address")}
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your address"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Pharmacy License
                </label>
                <input
                  type="text"
                  value={pharmacyLicense}
                  onChange={handleChange("pharmacyLicense")}
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your Pharmacy License"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Email Address
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={handleChange("email")}
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={handleChange("phoneNumber")}
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
              <div>
                <label className="text-gray-600 mb-2 block">
                  Password Confirm
                </label>
                <input
                  type="text"
                  value={passwordConfirm}
                  onChange={handleChange("passwordConfirm")}
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
                  SignUp
                </button>
              </div>
            </div>
          </form>
          <p className="mt-4 text-gray-600 text-center">
            Already have an account?
            <Link href={`/user/login`} className="text-primary">
              LogIn Now
            </Link>
          </p>
        </div>
      </div>
      {/* </Layout> */}
    </>
  );
};

export default SignUp;
