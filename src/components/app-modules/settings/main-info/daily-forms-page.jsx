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
import service from "../../../../services/settings/main-info/daily-forms-serevice";
import {
  getSorter,
  checkAccess,
  getColumns,
  GetSimplaDataPageMethods,
} from "../../../../tools/form-manager";
import SimpleDataTable from "../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../common/simple-data-page-header";
import DailyFormModal from "./daily-form-modal";
import DailyFormDetailsModal from "./daily-forms-details-modal";
import Colors from "../../../../resources/colors";
import MemberProfileImage from "../../../common/member-profile-image";
import { usePageContext } from "../../../contexts/page-context";

const { Text } = Typography;

const getSheets = (records) => [
  {
    title: "DailyForms",
    data: records,
    columns: [
        { label: Words.id, value: "ID" },
        { label: Words.section, value: "SectionTitle" },
        { label: Words.date, value: "Date" },
        { label: Words.acctive_beds, value: "ActiveBeds" },
        { label: Words.extra_beds, value: "ExtraBeds" },
        { label: Words.in_patients, value: "InPatients" },
        { label: Words.new_in_patients, value: "NewInPatients" },
        { label: Words.new_in_patients_from_section, value: "NewInPatientsFromSection" },
        { label: Words.new_in_patients_from_hospital, value: "NewInPatientsFromHospital" },
        { label: Words.discharged_patients, value: "DischargedPatients" },
        { label: Words.discharged_patients_to_section, value: "DischargedPatientsToSection" },
        { label: Words.discharged_patients_to_hospital, value: "DischargedPatientsToHospital" },
        { label: Words.died_patients_on_24_hour, value: "DiedPatientsOn24Hour" },
        { label: Words.died_patients_more_than_24_hour, value: "DiedPatientsMorThan24Hour" },
        { label: Words.patients_less_than_six_hour, value: "PatientsLessThanSixHour" },
        { label: Words.patients_between_6_and_24_hour, value: "PatientsBetween6And24Hour" },
        { label: Words.patients_in_7_morning, value: "PatientsIn7Morning" },
        { label: Words.matching_beds_with_active_and_extra, value: "MatchingBedsWithActiveAndExtra" },
        { label: Words.reg_date, value: "RegDate" },
        { label: Words.reg_time, value: "RegTime" },
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
        title: Words.acctive_beds,
        width: 100,
        align: "center",
        dataIndex: "ActiveBeds",
        sorter: getSorter("ActiveBeds"),
        render: (ActiveBeds) => (
            <Text style={{ color: Colors.orange[6] }}>
                {utils.farsiNum(ActiveBeds)}
            </Text>
        ),
    },
    {
        title: Words.extra_beds,
        width: 120,
        align: "center",
        dataIndex: "ExtraBeds",
        sorter: getSorter("ExtraBeds"),
        render: (ExtraBeds) => (
            <Text style={{ color: Colors.magenta[6] }}>
                {utils.farsiNum(ExtraBeds)}
            </Text>
        ),
    },
    {
        title: Words.in_patients,
        width: 120,
        align: "center",
        dataIndex: "InPatients",
        sorter: getSorter("InPatients"),
        render: (InPatients) => (
            <Text style={{ color: Colors.magenta[6] }}>
                {utils.farsiNum(InPatients)}
            </Text>
        ),
    },
    {
        title: Words.discharged_patients,
        width: 120,
        align: "center",
        dataIndex: "DischargedPatients",
        sorter: getSorter("DischargedPatients"),
        render: (DischargedPatients) => (
            <Text style={{ color: Colors.magenta[6] }}>
                {utils.farsiNum(DischargedPatients)}
            </Text>
        ),
    },
    {
        title: Words.died_patients_on_24_hour,
        width: 120,
        align: "center",
        dataIndex: "DiedPatientsOn24Hour",
        sorter: getSorter("DiedPatientsOn24Hour"),
        render: (DiedPatientsOn24Hour) => (
            <Text style={{ color: Colors.magenta[6] }}>
                {utils.farsiNum(DiedPatientsOn24Hour)}
            </Text>
        ),
        },
];

const recordID = "ID";

const DailyFormsPage = ({ pageName }) => {
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
            title={Words.daily_forms}
            searchText={searchText}
            sheets={getSheets(records)}
            fileName="DailyForms"
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
        <DailyFormModal
          onOk={handleSave}
          onCancel={handleCloseModal}
          isOpen={showModal}
          selectedObject={selectedObject}
        />
      )}

      {showDetails && (
        <DailyFormDetailsModal
          onOk={() => {
            setShowDetails(false);
            setSelectedObject(null);
          }}
          isOpen={showDetails}
          member={selectedObject}
        />
      )}
    </>
  );
};

export default DailyFormsPage;
