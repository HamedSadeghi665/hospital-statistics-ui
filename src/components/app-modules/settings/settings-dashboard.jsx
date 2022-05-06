import React, { useState } from "react";
import { useMount } from "react-use";
import { Row, Col } from "antd";
import DashboardTile from "./../../common/dashboard-tile";
import { GoSettings as BasicSettingsIcon } from "react-icons/go";
import {
  AiOutlineFieldTime as TimexSettingsIcon,
  AiFillBank as OrgIcon,
  AiFillCar as CarIcon,
} from "react-icons/ai";
import { SiKeycdn as KeyIcon } from "react-icons/si";
import Colors from "./../../../resources/colors";
import pagesService from "./../../../services/app/pages-service";

const iconProps = {
  size: 55,
  style: { marginTop: 10 },
};

const mapper = (moduleID) => {
  let link = "";
  let icon = null;
  let backColor = Colors.blue[3];

  switch (moduleID) {
    case 1:
      link = "accesses";
      icon = <KeyIcon {...iconProps} />;
      backColor = Colors.red[3];
      break;

    case 2:
      link = "basic-info";
      icon = <BasicSettingsIcon {...iconProps} />;
      backColor = Colors.blue[3];
      break;

    case 3:
      link = "org";
      icon = <OrgIcon {...iconProps} />;
      backColor = Colors.green[3];
      break;

    case 4:
      link = "timex";
      icon = <TimexSettingsIcon {...iconProps} />;
      backColor = Colors.orange[3];
      break;

    case 7:
      link = "transmission";
      icon = <CarIcon {...iconProps} />;
      backColor = Colors.cyan[3];
      break;

    default:
      break;
  }

  return { link, icon, backColor };
};

const OfficialDashboard = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);

  useMount(async () => {
    const settings_category_id = 1;
    const accessiblePages = await pagesService.accessiblePages(
      settings_category_id
    );

    setAccessiblePages(accessiblePages);
  });

  return (
    <Row gutter={[10, 16]}>
      {accessiblePages.map((module) => (
        <Col xs={24} md={8} lg={6} key={module.PageID}>
          <DashboardTile
            to={`settings/${mapper(module.PageID).link}`}
            //icon={mapper(module.ModuleID).icon}
            backColor={mapper(module.PageID).backColor}
            title={module.PageTitle}
          />
        </Col>
      ))}
    </Row>
  );
};

export default OfficialDashboard;
