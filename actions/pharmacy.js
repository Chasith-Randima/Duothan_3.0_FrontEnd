// import { privateDecrypt } from "crypto";
import fetch from "isomorphic-fetch";
// import { response } from "../../cell_phones/app";
// import isAuth from "./auth";
import queryString from "query-string";
import axios from "axios";

let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;
if (process.env.NEXT_PUBLIC_PRODUCTION == true) {
  API = process.env.NEXT_PUBLIC_API_PRODUCTION;
}

export const createPharmacy = (pharmacy, token) => {
  let url = `${API}/pharmacy`;

  // console.log(url);

  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      // "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: pharmacy,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

// limit,
// page,
// priceMin,
// priceMax,
// location,
// brandname,
// sort,
// user
export const allPharmacy = (paramsData) => {
  let url = `${API}/pharmacy`;
  let query;
  // if (paramsData.priceMin) {
  //   query = JSON.stringify(paramsData);
  //   console.log(query);
  //   query = query.replace("priceMin", "price[gte]");
  //   delete query.priceMin;

  //   // query.priceMin = undefined;
  //   query = JSON.parse(query);
  //   console.log(query);
  //   paramsData = { ...paramsData, ...query };
  //   console.log(paramsData);
  // }
  // if (paramsData.priceMax) {
  //   query = JSON.stringify(paramsData);
  //   console.log(query);
  //   query = query.replace("priceMax", "price[lte]");
  //   // query.priceMax = undefined;
  //   delete query.priceMax;
  //   delete query.priceMin;
  //   query = JSON.parse(query);
  //   console.log(query);
  //   paramsData = { ...paramsData, ...query };
  //   console.log(query);
  // }

  // console.log(paramsData);

  return axios(url, {
    method: "GET",
    // params: { ...query },
    params: {
      limit: paramsData.limit,
      page: paramsData.page,
      name: paramsData.name,
      location: paramsData.location,
      "price[gte]": paramsData.priceMin,
      "price[lte]": paramsData.priceMax,
      sort: paramsData.sort,
    },
  })
    .then((response) => {
      // console.log(response.data.doc);
      return response;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const deletePharmacy = (id, token) => {
  let url = `${API}/pharmacy/${id}`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const updatePhone = (id, phone, token) => {
  let url = `${API}/phones/${id}`;
  // console.log(phone);

  return fetch(url, {
    method: "PATCH",
    headers: {
      // Accept: "application/json",
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: phone,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const onePhone = (id) => {
  let url = `${API}/phones/${id}`;

  return fetch(url, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const allMyAdds = (user) => {
  let url = `${API}/phones`;

  return axios(url, {
    method: "GET",
    params: {
      user: user,
    },
  })
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const searchPhones = (params) => {
  // console.log(params);
  let query = queryString.stringify(params);
  // console.log(query);
  let url = `${API}/phones/search?${query}`;
  // console.log(url);

  return fetch(url, {
    method: "GET",
  })
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
