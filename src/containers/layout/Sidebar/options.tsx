import {
  AppstoreOutlined,
  UserOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

import { FaBoxOpen, FaCodeBranch, FaListUl, FaUser } from "react-icons/fa6";

import { IoIosSettings } from "react-icons/io";

import { FaBuilding, FaBriefcase } from 'react-icons/fa';
import { FaVideo } from "react-icons/fa";

import { IoHomeSharp } from "react-icons/io5";
import { MdOutlineWork } from "react-icons/md";
import { FaTag } from 'react-icons/fa';
import { MdContactPhone } from "react-icons/md";

import { CgMoreO } from "react-icons/cg";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { MdContentPaste } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { MdOutlineFeaturedPlayList } from "react-icons/md";

import { MdIntegrationInstructions } from "react-icons/md";
import {FaHandshake} from "react-icons/fa"
import { FaInbox } from 'react-icons/fa';
import { FaServicestack } from "react-icons/fa";

// Registrations



interface MenuItem {
  key: string;
  to?: string;
  icon?: any;
  label: any;
  onClick?: () => void;
  hidden?: boolean;
  disabled?: boolean;
  children?: MenuItem[];
}
const getMenuItems: (profile) => MenuItem[] = (profile) =>{ 
  return [
  
  {
    key: "Contents",
    to: "Contents",
    label: <FormattedMessage id="contents" />,
    icon: <MdContentPaste className="!text-xl" />,
    disabled: false,
  },
  {
    key: "Pages",
    to: "Pages",
    label: <FormattedMessage id="pages" />,
    icon: <RiPagesLine className="!text-xl" />,
    disabled: false,
  },
  {
    key: "Features",
    to: "Features",
    label: <FormattedMessage id="features" />,
    icon: <MdOutlineFeaturedPlayList className="!text-xl" />,
    disabled: false,
  },
  {
    key: "Integrations",
    to: "Integrations",
    label: <FormattedMessage id="integrations" />,
    icon: <MdIntegrationInstructions className="!text-xl" />,
    disabled: false,
  },
  {
    key: "partners",
    to: "partners",
    label: <FormattedMessage id="partners" />,
    icon: <FaHandshake  className="!text-xl" />,
    disabled: false,
  },
  {
    key: "Services",
    to: "Services",
    label: <FormattedMessage id="services" />,
    icon: <FaServicestack className="!text-xl" />,
    disabled: false,
  },
  {
    key: "Services-List",
    to: "Services-List",
    label: <FormattedMessage id="Services-List" />,
    icon: <FaListUl className="!text-xl" />,
    disabled: false,
  },
  {
    key: "Socials",
    to: "Socials",
    label: <FormattedMessage id="Socials" />,
    icon: <FaInbox className="!text-xl" />,
    disabled: false,
  },
  
  
  {
    key: "Contact-Us",
    to: "Contact-Us",
    label: <FormattedMessage id="contacts" />,
    icon: <MdContactPhone    className="!text-xl" />,
    disabled: false,
    hidden: false,
    
  },
  

  
  
  

  // {
  //   key: "offers-group",
  //   label: <FormattedMessage id={"offers"} />,
  //   icon: <IoMdSettings className="!text-xl" />,
  //   disabled: false,
  //   children: [
  //     {
  //       key: "offers",
  //       to: "offers",
  //       label: <FormattedMessage id="offers" />,
  //       icon: <MdPolicy className="!text-xl" />,
  //       disabled: false,
  //       hidden: false,
  //     },
  //     {
  //       key: "voucher",
  //       to: `voucher`,
  //       label: <FormattedMessage id="voucher" />,
  //       icon: <AppstoreOutlined />,
  //       disabled: false,
  //       // hidden: !getPermissions("permissions", "Get", profile),
  //     },
  //   ],
  // },
]};
export default getMenuItems;

