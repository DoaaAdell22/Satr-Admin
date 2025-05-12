// import { Alert, Badge, Button, Card, Typography } from "antd";
// import { useEffect, useState } from "react";
// import DemoMix from 'components/charts/test'

// import { useDispatch, useSelector } from "react-redux";
// import axios from "utlis/library/helpers/axios";
// import { getPermissions } from "utlis/library/helpers/permissions";
// import {
//   FaUsers,
//   FaProductHunt,
//   FaFileImport,
//   FaShoppingBag,
// } from "react-icons/fa";
// import { GiSellCard } from "react-icons/gi";
// import { FormattedMessage } from "react-intl";
// import ApexChart from "components/charts/apex";
import Labelline from "components/charts/Labelline";
import DemoColumn from "components/charts/Bar";
import { FormattedMessage } from "react-intl";
import RollerLoading from "components/loading/roller";
import { Empty } from "antd";
// import authAction from "store/auth/actions";

// const { Title } = Typography;
// const { setTokenAsExpired } = authAction;

function Statistics() {
  // const { locale } = useSelector(
  //   ({ LanguageSwitcher }: { LanguageSwitcher: ILanguageSwitcher }) =>
  //     LanguageSwitcher.language
  // );
  // const auth= useSelector((state: any) => state.Auth);
// const dispatch = useDispatch()

  // useEffect(() => {
  //   setLoading(true);
  //   axios["get"](``, {
  //     headers: {
  //       "X-Portal": "dashboard",
  //       Authorization: `Bearer ${idToken}`,
  //     },
  //   })
  //     .then((response) => {
  //       setData(response.data.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //     });
  // }, []);

//   const META_DATA = {
//     suppliersCount: {
//       icon: <GiSellCard className="text-xl" />,
//     },
//     importingOrdersCount: {
//       icon: <FaFileImport className="text-xl" />,
//     },
//     salesOrdersCount: {
//       icon: <FaShoppingBag className="text-xl" />,
//     },
//     productsCount: {
//       icon: <FaProductHunt className="text-xl" />,
//     },
//     clientsCount: {
//       icon: <FaUsers className="text-xl" />,
//     },
//     ordersCount: {
//       icon: <FaShoppingBag className="text-xl" />,
//     },
//   };

// console.log({auth})

const border = "border border-solid border-light-border dark:border-dark-border "
  return (
    <div className="flex flex-col gap-2   rounded-lg  mx-auto pt-16">
      <Empty />
      {/* <Button onClick={()=>{
dispatch(setTokenAsExpired())
      }}>expire token</Button> */}
    {/* <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 ">
      <div className={`${border} flex items-center p-4 bg-white dark:bg-dark-layout-bg rounded`}>
        <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
          <svg
            className="w-6 h-6 fill-current text-green-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-grow flex flex-col ms-4">
          <span className="text-xl font-bold">$8,430 </span>
          <div className="flex items-center justify-between">
            <span className="text-gray-500"><FormattedMessage id="revenue-last-30-days" /></span>
            <span className="text-green-500 text-sm font-semibold ms-2">
              +12.6%
            </span>
          </div>
        </div>
      </div>
      <div className={`${border} flex items-center p-4 bg-white dark:bg-dark-layout-bg rounded`}>
        <div className="flex flex-shrink-0 items-center justify-center bg-red-200 h-16 w-16 rounded">
          <svg
            className="w-6 h-6 fill-current text-red-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-grow flex flex-col ms-4">
          <span className="text-xl font-bold">211</span>
          <div className="flex items-center justify-between">
            <span className="text-gray-500"><FormattedMessage id="sales-last-30-days" /></span>
            <span className="text-red-500 text-sm font-semibold ms-2">
              -8.1%
            </span>
          </div>
        </div>
      </div>
      <div className={`${border} flex items-center p-4 bg-white dark:bg-dark-layout-bg rounded`}>
        <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
          <svg
            className="w-6 h-6 fill-current text-green-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-grow flex flex-col ms-4">
          <span className="text-xl font-bold">140</span>
          <div className="flex items-center justify-between">
            <span className="text-gray-500"><FormattedMessage id="customers-last-30-days" /></span>
            <span className="text-green-500 text-sm font-semibold ms-2">
              +28.4%
            </span>
          </div>
        </div>
      </div>
      <div className={`${border} flex items-center p-4 bg-white dark:bg-dark-layout-bg rounded`}>
        <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
          <svg
            className="w-6 h-6 fill-current text-green-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-grow flex flex-col ms-4">
          <span className="text-xl font-bold">140</span>
          <div className="flex items-center justify-between">
            <span className="text-gray-500"><FormattedMessage id="customers-last-30-days" /></span>
            <span className="text-green-500 text-sm font-semibold ms-2">
              +28.4%
            </span>
          </div>
        </div>
      </div>
    </div>
      <section className="my-4 text-center grid lg:grid-cols-2 md:grid-cols-1 gap-6">
      <div className={`${border} p-4 bg-white dark:bg-dark-layout-bg rounded`}><Labelline/> </div>
      </section> */}

      {/* <section className={`${border} my-4 text-center grid lg:grid-cols-1 md:grid-cols-1 gap-6`}>
      <div className="p-4 bg-white dark:bg-dark-layout-bg rounded"><DemoColumn/> </div>
      </section> */}
    </div>
  );
}

export default Statistics;
