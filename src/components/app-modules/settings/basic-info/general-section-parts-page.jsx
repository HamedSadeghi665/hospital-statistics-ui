import React from "react";
import { useMount } from "react-use";
import { Spin, Row, Col, Typography, Button } from "antd";
import { InfoCircleOutlined as InfoIcon } from "@ant-design/icons";
import {
  AiFillLock as LockIcon,
  AiOutlineCheck as CheckIcon,
} from "react-icons/ai";
import Words from "../../../../resources/words";
import utils from "../../../../tools/utils";
import service from "../../../../services/settings/basic-info/general-section-parts-service";
import {
  getSorter,
  checkAccess,
  getColumns,
  GetSimplaDataPageMethods,
} from "../../../../tools/form-manager";
import SimpleDataTable from "../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../common/simple-data-page-header";
import Colors from "../../../../resources/colors";
import { usePageContext } from "../../../contexts/page-context";
import GeneralSectionPartModal from "./general-section-part-modal";

const { Text } = Typography;

const getSheets = (records) => [
  {
    title: "GenralSectionParts",
    data: records,
    columns: [
      { label: Words.id, value: "ID" },
      { label: Words.general_section, value: "GeneralSectionTitle" },
      { label: Words.section, value: "SectionTitle" },
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
    title: Words.general_section,
    width: 140,
    align: "center",
    sorter: getSorter("GeneralSectionTitle"),
    render: (record) => (
      <Text
        style={{ color: Colors.blue[8] }}
      >{`${record.GeneralSectionTitle}`}</Text>
    ),
  },
  {
    title: Words.section,
    width: 140,
    align: "center",
    sorter: getSorter("SectionTitle"),
    render: (record) => (
      <Text
        style={{ color: Colors.blue[8] }}
      >{`${record.SectionTitle}`}</Text>
    ),
  },
];

const recordID = "ID";

const GeneralSectionPartsPage = ({ pageName }) => {
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
            title={Words.general_section_parts}
            searchText={searchText}
            sheets={getSheets(records)}
            fileName="GenralSectionParts"
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
        <GeneralSectionPartModal
          onOk={handleSave}
          onCancel={handleCloseModal}
          isOpen={showModal}
          selectedObject={selectedObject}
        />
      )}
    </>
  );
};

export default GeneralSectionPartsPage;
