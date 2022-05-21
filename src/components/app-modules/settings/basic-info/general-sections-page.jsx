import React, { useState } from "react";
import { useMount } from "react-use";
import { Spin, Row, Col, Typography, Button, Tooltip } from "antd";
import { GiModernCity as CityIcon } from "react-icons/gi";
import Words from "../../../../resources/words";
import Colors from "../../../../resources/colors";
import utils from "./../../../../tools/utils";
import service from "./../../../../services/settings/basic-info/general-sections-service";
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
import GeneralSectionModal from "./general-section-modal";
import { usePageContext } from "./../../../contexts/page-context";

const { Text } = Typography;

const getSheets = (records) => [
  {
    title: "GeneralSections",
    data: records,
    columns: [
      { label: Words.id, value: "GeneralSectionID" },
      { label: Words.title, value: "GeneralSectionTitle" },
    ],
  },
];

const baseColumns = [
  {
    title: Words.id,
    width: 100,
    align: "center",
    dataIndex: "GeneralSectionID",
    sorter: getSorter("GeneralSectionID"),
    render: (GeneralSectionID) => <Text>{utils.farsiNum(`${GeneralSectionID}`)}</Text>,
  },
  {
    title: Words.title,
    width: 200,
    align: "center",
    dataIndex: "GeneralSectionTitle",
    sorter: getSorter("GeneralSectionTitle"),
    render: (GeneralSectionTitle) => <Text>{utils.farsiNum(GeneralSectionTitle)}</Text>,
  },
  {
    title: Words.status,
    width: 75,
    align: "center",
    sorter: getSorter("IsActive"),
    render: (record) =>
      record.IsActive ? (
        <CheckIcon style={{ color: Colors.green[6] }} />
      ) : (
        <LockIcon style={{ color: Colors.red[6] }} />
      ),
  },
];

const recordID = "GeneralSectionID";

const GeneralSectionsPage = ({ pageName }) => {
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
            title={Words.general_sections}
            searchText={searchText}
            sheets={getSheets(records)}
            fileName="GeneralSections"
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
        <GeneralSectionModal
          onOk={handleSave}
          onCancel={handleCloseModal}
          isOpen={showModal}
          selectedObject={selectedObject}
        />
      )}
    </>
  );
};

export default GeneralSectionsPage;
