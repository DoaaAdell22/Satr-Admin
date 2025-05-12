import { useState, Fragment } from "react";
import { Link, Navigate, json, useLoaderData, useNavigate, useNavigation , } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion'
import LangSwitcher from "containers/layout/Topbar/LangSwitcher";
import ThemesSwitcher from "containers/layout/Topbar/ThemesSwitcher";
import { routes } from "../routers/index";
import { Button, Card } from "antd";
import { useSelector } from "react-redux";
import SmallLogo from "components/LogoWraper/small-logo";
import { FormattedMessage } from "react-intl";

function Index() {

  const data = useLoaderData();
  console.log(data);
  const [visiable, setVisiable] = useState(true);
 
const navigate = useNavigate()


return (
<Navigate to={'/dashboard'} />

)
}

export default Index;
