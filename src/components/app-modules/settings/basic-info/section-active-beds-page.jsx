import React, { useState } from "react";
import { useMount } from "react-use";
import { Spin, Row, Col, Typography, Button, Tooltip } from "antd";
import { GiModernCity as CityIcon } from "react-icons/gi";
import Words from "../../../../resources/words";
import Colors from "../../../../resources/colors";
import utils from "./../../../../tools/utils";
import service from "./../../../../services/settings/basic-info/section-active-beds-service";
import {
  getSorter,
  checkAccess,
  getColumns,
  GetSimplaDataPageMethods,
} from "../../../../tools/form-manager";
import {
  AiFillLock as LockIcon,
  AiOutlineCheck as CheckIcon,
} from "react-icons/ai";
import SimpleDataTable from "../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../common/simple-data-page-header";
import SectionModal from "./section-modal";
import { usePageContext } from "./../../../contexts/page-context";
import SectionActiveBedModal from "./section-active-bed-modal";

const { Text } = Typography;

const getSheets = (records) => [
  {
    title: "SectionActiveBeds",
    data: records,
    columns: [
        { label: Words.id, value: "ID" },
        { label: Words.title, value: "SectionTitle" },
        { label: Words.title, value: "ActiveBeds" },
    ],
  },
];

const baseColumns = [
  {
    title: Words.id,
    width: 100,
    align: "center",
    dataIndex: "ID",
    sorter: getSorter("ID"),
    render: (ID) => <Text>{utils.farsiNum(`${ID}`)}</Text>,
  },
  {
    title: Words.title,
    width: 200,
    align: "center",
    dataIndex: "SectionTitle",
    sorter: getSorter("SectionTitle"),
    render: (SectionTitle) => <Text>{utils.farsiNum(SectionTitle)}</Text>,
  },
  {
    title: Words.activeBed,
    width: 20,
    align: "center",
    dataIndex: "ActiveBeds",
    sorter: getSorter("ActiveBeds"),
    render: (ActiveBeds) => <Text>{utils.farsiNum(ActiveBeds)}</Text>,
  },
];

const recordID = "ID";

const SectionActiveBedsPage = ({ pageName }) => {
  const [showCitiesModal, setShowCitiesModal] = useState(false);

  const {
    progress,
    searched,
    searchText,
    setSearchText,
    records,
    setRecords,
    access,
    setAccess,
    selectedObject,
    setSelectedObject,
    showModal,
  } = usePageContext();

  useMount(async () => {
    handleResetContext();
    await checkAccess(setAccess, pageName);
  });

  const {
    handleCloseModal,
    handleGetAll,
    handleSearch,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSave,
    handleResetContext,
  } = GetSimplaDataPageMethods({
    service,
    recordID,
  });

  const columns = access
    ? getColumns(
        baseColumns,
        null,
        access,
        handleEdit,
        handleDelete
      )
    : [];

  //------

  return (
    <>
      <Spin spinning={progress}>
        <Row gutter={[10, 15]}>
          <SimpleDataPageHeader
            title={Words.sectionActiveBeds}
            searchText={searchText}
            sheets={getSheets(records)}
            fileName="SectionActiveBeds"
            onSearchTextChanged={(e) => setSearchText(e.target.value)}
            onSearch={handleSearch}
            onClear={() => setRecords([])}
            onGetAll={handleGetAll}
            onAdd={access?.CanAdd && handleAdd}
          />

          <Col xs={24}>
            {searched && (
              <SimpleDataTable records={records} columns={columns} />
            )}
          </Col>
        </Row>
      </Spin>

      {showModal && (
        <SectionActiveBedModal
          onOk={handleSave}
          onCancel={handleCloseModal}
          isOpen={showModal}
          selectedObject={selectedObject}
        />
      )}
    </>
  );
};

export default SectionActiveBedsPage;
