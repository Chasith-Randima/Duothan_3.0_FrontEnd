import fetch from "isomorphic-fetch";
import cookie from "js-cookie";

// import Router from "next/router";

let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;

if (process.env.NEXT_PUBLIC_PRODUCTION == true) {
  API = process.env.NEXT_PUBLIC_API_PRODUCTION;
}

export const signup = async (user) => {
  console.log(API);
  let url = `${API}/pharmacy/signup`;
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      //   console.log(response.statusText);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const logIn = async (user) => {
  let url = `${API}/pharmacy/login`;
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const logOut = async (next) => {
  removeCookie("token");
  removeLocalStorage("pharmacy");
  next();
  let url = `${API}/users/logout`;
  return fetch(url, {
    method: "GET",
  })
    .then((response) => {
      // console.log("Logout Success");
      return response;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key, value) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

export const authenticate = (data, next) => {
  // console.log(data.token, data.user, data);
  setCookie("token", data.token);
  setLocalStorage("pharmacy", data.pharmacy);
  next();
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (
        localStorage.getItem("pharmacy") &&
        localStorage.getItem("pharmacy") != "undefined"
      ) {
        // console.log(typeof localStorage.getItem("pharmacy"));
        return JSON.parse(localStorage.getItem("pharmacy"));
        // return JSON.parse(localStorage.getItem("pharmacy"));
      } else {
        return false;
      }
    }
  }
};

export const updateMyPassword = (id, user, token) => {
  let url = `${API}/users/updateMyPassword/${id}`;
  // console.log(id, user, token);

  return fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
