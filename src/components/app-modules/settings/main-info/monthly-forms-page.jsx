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
import service from "../../../../services/settings/main-info/monthly-forms-service";
import {
  getSorter,
  checkAccess,
  getColumns,
  GetSimplaDataPageMethods,
} from "../../../../tools/form-manager";
import SimpleDataTable from "../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../common/simple-data-page-header";
import MonthlyFormModal from "./monthly-form-modal";
import Colors from "../../../../resources/colors";
import { usePageContext } from "../../../contexts/page-context";

const { Text } = Typography;

const getSheets = (records) => [
  {
    title: "MonthlyForms",
    data: records,
    columns: [
        { label: Words.id, value: "ID" },
        { label: Words.section, value: "SectionTitle" },
        { label: Words.year, value: "Year" },
        { label: Words.montht, value: "MonthTitle" },
        { label: Words.in_patients, value: "InPatients" },
        { label: Words.out_patients, value: "OutPatients" },
        {
            label: Words.reg_date,
            value: (record) => `${utils.slashDate(record.RegDate)}`,
        },
        {
            label: Words.reg_time,
            value: (record) => `${utils.colonTime(record.RegTime)}`,
        },
        {
            label: Words.reg_member,
            value: (record) => `${record.RegFirstName} ${record.RegLastName}`,
        },
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
        title: Words.section,
        width: 250,
        align: "center",
        sorter: getSorter("SectionTitle"),
        render: (record) => (
            <Text style={{ color: Colors.blue[6] }}
                >{`${record.SectionTitle}`}
            </Text>
        ),
    },
    {
        title: Words.year,
        width: 100,
        align: "center",
        dataIndex: "Year",
        sorter: getSorter("Year"),
        render: (Year) => <Text>{utils.farsiNum(`${Year}`)}</Text>,
    },
    {
        title: Words.month,
        width: 250,
        align: "center",
        sorter: getSorter("MonthTitle"),
        render: (record) => (
            <Text style={{ color: Colors.blue[6] }}
                >{`${record.MonthTitle}`}
            </Text>
        ),
    },
    {
        title: Words.in_patients,
        width: 100,
        align: "center",
        dataIndex: "InPatients",
        sorter: getSorter("InPatients"),
        render: (InPatients) => <Text>{utils.farsiNum(`${InPatients}`)}</Text>,
    },
    {
        title: Words.out_patients,
        width: 100,
        align: "center",
        dataIndex: "OutPatients",
        sorter: getSorter("OutPatients"),
        render: (OutPatients) => <Text>{utils.farsiNum(`${OutPatients}`)}</Text>,
    },
];

const recordID = "ID";

const MonthlyFormsPage = ({ pageName }) => {
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
    showDetails,
    setShowDetails,
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

  const getOperationalButtons = (record) => {
    return (
      <Button
        type="link"
        icon={<InfoIcon style={{ color: Colors.green[6] }} />}
        onClick={() => {
          setSelectedObject(record);
          setShowDetails(true);
        }}
      />
    );
  };

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
            title={Words.monthly_forms}
            searchText={searchText}
            sheets={getSheets(records)}
            fileName="MonthlyForms"
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
        <MonthlyFormModal
          onOk={handleSave}
          onCancel={handleCloseModal}
          isOpen={showModal}
          selectedObject={selectedObject}
        />
      )}
    </>
  );
};

export default MonthlyFormsPage;
