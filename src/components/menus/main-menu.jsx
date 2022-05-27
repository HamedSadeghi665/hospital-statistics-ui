import React, { useState, useEffect } from "react";
import { useMount } from "react-use";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import pagesService from "../../services/app/pages-service";
import Colors from "../../resources/colors";
import Words from "../../resources/words";
import TabTitle from "../common/tab-title";
import {
  AiOutlineDashboard as DashboardIcon,
} from "react-icons/ai";
import {
  GiModernCity as CityIcon,
} from "react-icons/gi";
import {
  FaChartPie as ChartIcon,
  FaMapMarkerAlt as MapIcon,
  FaUsers as MemberIcon,
  FaDatabase as ManageInfo,
  FaUserMd as DoctorIcon,
  FaUserCheck as ExpertIcon,
  FaStar as ExpertiseIcon,
  FaBed as ActiveBedIcon,
  FaCube as GeneralSectionIcon,
  FaCubes as GeneralSectionPartIcon,
  FaThLarge as SectionIcon
} from "react-icons/fa";
import { SiKeycdn as KeyIcon } from "react-icons/si";
import { GoSettings as BasicSettingsIcon } from "react-icons/go";
import { FiSettings as SettingsIcon } from "react-icons/fi";

const { SubMenu } = Menu;

const iconSize = 20;

const mapper = (pageID) => {
  let link = "";
  let icon = null;

  switch (pageID) {
    //--- Security Tab  
    case 1:
        link = "members";
            icon = (
              <MemberIcon style={{ color: Colors.magenta[6] }} size={iconSize} />
        );
      break;
    
    case 2:
        link = "doctors";
            icon = (
              <DoctorIcon style={{ color: Colors.blue[6] }} size={iconSize} />
        );
    break;
    
    case 3:
        link = "provinces";
            icon = (
              <MapIcon style={{ color: Colors.red[6] }} size={iconSize} />
          );
        break;

    case 4:
        link = "cities";
            icon = (
              <CityIcon style={{ color: Colors.cyan[7] }} size={iconSize} />
          );
      break;
    
    case 5:
      link = "expertises";
          icon = (
            <ExpertiseIcon style={{ color: '#E91E63' }} size={iconSize} />
        );
      break;
    
    case 6:
      link = "sections";
          icon = (
            <SectionIcon style={{ color: '#FCB900' }} size={iconSize} />
        );
      break;
    
      case 7:
        link = "section-active-beds";
            icon = (
              <ActiveBedIcon style={{ color: Colors.volcano[7] }} size={iconSize} />
          );
      break;
    
      case 8:
        link = "section-experts";
            icon = (
              <ExpertIcon style={{ color: Colors.orange[7] }} size={iconSize} />
          );
      break;
    
      case 9:
        link = "general-sections";
            icon = (
              <GeneralSectionIcon style={{ color: Colors.green[8] }} size={iconSize} />
          );
      break;
    
      case 10:
        link = "general-section-parts";
            icon = (
              <GeneralSectionPartIcon style={{ color: Colors.cyan[7] }} size={iconSize} />
          );
      break;
    
      case 11:
        link = "daily-forms";
            icon = (
              <GeneralSectionPartIcon style={{ color: Colors.cyan[7] }} size={iconSize} />
          );
      break;
      
      case 28:
        link = "page-accesses";
            icon = (
              <KeyIcon style={{ color: Colors.red[6] }} size={iconSize} />
          );
        break;


    default:
      break;
  }

  return { link, icon };
};

const tabs = [
  {
    name: "users",
    title: (
      <TabTitle
        title={Words.members}
        color={Colors.orange[6]}
        icon={MemberIcon}
      />
    ),
    pages: [
      { pageName: "Members" },
      { pageName: "Doctors" },
      { pageName: "SectionExperts" },
    ],
  },
  {
    name: "basic-info",
    title: (
      <TabTitle
        title={Words.basic_info}
        color={Colors.green[6]}
        icon={BasicSettingsIcon}
      />
    ),
    pages: [
      { pageName: "Cities" },
      { pageName: "Provinces" },
      { pageName: "Expertises" },
      { pageName: "Sections" },
      { pageName: "SectionActiveBeds" },
      { pageName: "GeneralSections" },
      { pageName: "GeneralSectionParts" },
    ],
  },
  {
    name: "main-info",
    title: (
      <TabTitle
        title={Words.manage_info}
        color={Colors.geekblue[6]}
        icon={ManageInfo}
      />
    ),
    pages: [
      { pageName: "DailyForms" }
    ],
  },
  {
    name: "reports",
    title: (
      <TabTitle
        title={Words.reports}
        color={Colors.purple[6]}
        icon={ChartIcon}
      />
    ),
    pages: [

    ],
  },
  {
    name: "settings",
    title: (
      <TabTitle
        title={Words.settings}
        color={Colors.red[6]}
        icon={SettingsIcon}
      />
    ),
    pages: [
      { pageName: "page-accesses" },
    ],
  },
];

const MainMenu = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);
  const [lastPathKey, setLastPathKey] = useState("");
  const [openKeys, setOpenKeys] = React.useState([]);

  const currentLocation = useLocation();

  useMount(async () => {
    const accessiblePages = await pagesService.accessiblePages();

    setAccessiblePages(accessiblePages);
  });

  useEffect(() => {
    const pathKeys = currentLocation.pathname.split("/");
    const _lastPathKey = pathKeys[pathKeys.length - 1]
      .replaceAll("-", "")
      .toLocaleLowerCase();

    setLastPathKey(_lastPathKey);

    const parentTab = getParentTab(_lastPathKey);
    if (parentTab !== null) setOpenKeys([parentTab.name]);
  }, [currentLocation.pathname]);

  const getParentTab = (pageName) => {
    let tab = null;

    tab = tabs.find(
      (t) =>
        t.pages.filter(
          (p) => p.pageName.replace("-", "").toLocaleLowerCase() === pageName
        ).length > 0
    );

    tab = tab || null;

    return tab;
  };

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    let rootSubmenuKeys = [];
    tabs.forEach((t) => (rootSubmenuKeys = [...rootSubmenuKeys, t.name]));

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const getSubMenus = () => {
    // const panel_name = "managment";
    // const isEndsWithModuleName = currentLocation.pathname.endsWith(
    //   `/${panel_name}`
    // );
    // const prePath = isEndsWithModuleName ? `${panel_name}/` : "";

    const panel_name = "managment";

    let subMenus = [];

    tabs.forEach((tab) => {
      subMenus = [
        ...subMenus,
        <SubMenu key={tab.name} title={tab.title}>
          {accessiblePages
            .filter(
              (ap) =>
                tab.pages.filter((tp) => tp.pageName === ap.PageName)
                  .length === 1
            )
            .map((page) => (
              <Menu.Item
                key={page.PageName.replace("-", "").toLocaleLowerCase()}
                icon={mapper(page.PageID).icon}
              >
                <Link to={`/${panel_name}/${tab.name}/${mapper(page.PageID).link}`}>
                  {page.PageTitle}
                </Link>
              </Menu.Item>
            ))}
        </SubMenu>,
      ];
    });

    return subMenus;
  };

  return (
    <Menu
      mode="inline"
      theme="light"
      openKeys={openKeys}
      selectedKeys={[lastPathKey]}
      onOpenChange={onOpenChange}
    >
      <Menu.Item
        key="managment"
        icon={
          <DashboardIcon style={{ color: Colors.green[6] }} size={iconSize} />
        }
      >
        <Link to={`/managment`}>{Words.dashboard}</Link>
      </Menu.Item>
      <Menu.Divider />

      {getSubMenus()}
    </Menu>
  );
};

export default MainMenu;
