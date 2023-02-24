import React from "react";
import { allPharmacy, deletePharmacy } from "../../actions/pharmacy";
import { getCookie } from "actions/auth";
import { withRouter } from "next/router";
import Sidebar from "components/Sidebar";

const Pharmacies = ({ pharmacy_list, results, totalCount }) => {
  const deletePharmacyClick = (id) => {
    // setAlert({ ...alert, loading: true });
    let token = getCookie("token");
    return deletePharmacy(id, token)
      .then((data) => {
        if (data.data.status == "success") {
          // console.log(data);
          // setAlert({
          //   ...alert,
          //   loading: false,
          //   message: data.message,
          //   error: false,
          //   success: true,
          // });
        //   window.setTimeout(() => {
        //     setAlert({ ...alert, success: false, message: "" });
        //   }, 1500);
          Router.reload();
          return data;
        } else {
          // setAlert({
          //   ...alert,
          //   loading: false,
          //   message: data.message,
          //   error: true,
          //   success: false,
          // });
        }
      })
      .catch((err) => {
        console.log(err);
        // setAlert({
        //   ...alert,
        //   loading: false,
        //   message: err.message,
        //   error: true,
        //   success: false,
        // });
      });
  };

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <Sidebar />
        </div>
        <div class="relative overflow-x-auto col-span-9">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  ID
                </th>
                <th scope="col" class="px-6 py-3">
                  Pharmacy Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Pharmacy Email
                </th>
                <th scope="col" class="px-6 py-3">
                  Owner Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Verification Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pharmacy_list.map((pharm, key) => {
                return (
                  <>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {pharm._id}
                      </th>
                      <td class="px-6 py-4">{pharm.name}</td>
                      <td class="px-6 py-4">{pharm.email}</td>
                      {/* <td class="px-6 py-4">{pharm.supplier}</td> */}
                      <td class="px-6 py-4">{pharm.owner}</td>
                      {/* <td class="px-6 py-4">{pharm.expireDate}</td> */}
                      <td class="px-6 py-4">{pharm.approved}</td>
                      <td class="px-6 py-4 flex justify-between gap-3">
                        <span
                          className="pd-8 bg-red-500 rounded"
                          onClick={() => deletePharmacyClick(pharm._id)}
                        >
                          delete
                        </span>
                        <span className="pd-8 bg-blue-500 rounded">update</span>
                      </td>
                    </tr>
                  </>
                );
              })}

              {/* <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Microsoft Surface Pro
              </th>
              <td class="px-6 py-4">White</td>
              <td class="px-6 py-4">Laptop PC</td>
              <td class="px-6 py-4">$1999</td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Magic Mouse 2
              </th>
              <td class="px-6 py-4">Black</td>
              <td class="px-6 py-4">Accessories</td>
              <td class="px-6 py-4">$99</td>
            </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

Pharmacies.getInitialProps = async () => {
  let page = 1;
  let limit = 9;
  let brandname;
  let location;
  let priceMin;
  let priceMax;
  let sort;

  return await allPharmacy(
    limit,
    page,
    brandname,
    location,
    priceMin,
    priceMax,
    sort
  ).then((data) => {
    console.log(data.data.doc);

    return {
      pharmacy_list: data.data.doc,
      results: data.data.results,
      totalCount: data.data.totalCount,
    };
    // return {};
  });
};

export default withRouter(Pharmacies);
