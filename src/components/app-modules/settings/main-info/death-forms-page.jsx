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
import service from "../../../../services/settings/main-info/death-forms-service";
import {
  getSorter,
  checkAccess,
  getColumns,
  GetSimplaDataPageMethods,
} from "../../../../tools/form-manager";
import SimpleDataTable from "../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../common/simple-data-page-header";
import DeathFormModal from "./death-form-modal";
import DeathFormDetailsModal from "./birth-forms-details-modal";
import Colors from "../../../../resources/colors";
import { usePageContext } from "../../../contexts/page-context";

const { Text } = Typography;

const getSheets = (records) => [
  {
    title: "DeathForms",
    data: records,
    columns: [
      { label: Words.id, value: "ID" },
      { label: Words.section, value: "SectionTitle" },
      {
          label: Words.doctor,
          value: (record) => `${record.DoctorFullName}`,
      },
      { label: Words.month, value: "MonthTitle" },
      { label: Words.year, value: "Year" },
      {
        label: Words.patient_fullname,
        value: (record) => `${record.FullName}`,
      },
      { label: Words.full_name, value: "FullName" },
      {
        label: Words.gender,
        value: (record) => (record.GenderID === 1 ? Words.male : Words.female),
      },
      { label: Words.age, value: "Age" },
      {
        label: Words.accept_date,
        value: (record) => `${utils.slashDate(record.AcceptDate)}`,
      },
      {
        label: Words.death_date,
        value: (record) => `${utils.slashDate(record.DeathDate)}`,
      },
      { label: Words.icd10_category, value: "ICDCategoryTitle" },
      { label: Words.death_cause, value: "DeathCause" },
      { label: Words.death_section, value: "DeathSectionTitle" },
      { label: Words.times_periods, value: "TimePeriodTitle" },
      {
        label: Words.under_five_age_death,
        value: (record) => (record.AgeCategoryID === 0 ? "" : record.AgeCategoryTitle),
      },
      {
        label: Words.mother_death,
        value: (record) => (record.MotherDeath === true ? Words.yes : Words.no),
      },
      { label: Words.file_number, value: "FileNumber" },
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
      title: Words.doctor,
      width: 250,
      align: "center",
      sorter: getSorter("DoctorFullName"),
      render: (record) => (
          <Text style={{ color: Colors.blue[6] }}
              >{`${record.DoctorFullName}`}
          </Text>
      ),
  },
  {
    title: Words.patient_fullname,
    width: 250,
    align: "center",
    sorter: getSorter("LastName"),
    render: (record) => (
        <Text style={{ color: Colors.blue[6] }}
            >{`${record.FullName}`}
        </Text>
    ),
  },
  {
      title: Words.accept_date,
      width: 100,
      align: "center",
      dataIndex: "AcceptDate",
      sorter: getSorter("AcceptDate"),
      render: (AcceptDate) => (
          <Text style={{ color: Colors.green[6] }}>
              {utils.farsiNum(utils.slashDate(AcceptDate))}
          </Text>
      ),
  },
  {
    title: Words.death_date,
    width: 100,
    align: "center",
    dataIndex: "DeathDate",
    sorter: getSorter("DeathDate"),
    render: (DeathDate) => (
        <Text style={{ color: Colors.red[6] }}>
            {utils.farsiNum(utils.slashDate(DeathDate))}
        </Text>
    ),
  },
  {
      title: Words.age,
      width: 120,
      align: "center",
      dataIndex: "Age",
      sorter: getSorter("Age"),
      render: (Age) => (
          <Text style={{ color: Colors.magenta[6] }}>
              {utils.farsiNum(Age)}
          </Text>
      ),
  },
  {
    title: Words.icd10_category,
    width: 250,
    align: "center",
    sorter: getSorter("ICDCategoryTitle"),
    render: (record) => (
        <Text style={{ color: Colors.blue[6] }}
            >{`${record.ICDCategoryTitle}`}
        </Text>
    ),
  },
  {
    title: Words.death_section,
    width: 250,
    align: "center",
    sorter: getSorter("DeathSectionTitle"),
    render: (record) => (
        <Text style={{ color: Colors.blue[6] }}
            >{`${record.DeathSectionTitle}`}
        </Text>
    ),
  },
  {
    title: Words.times_periods,
    width: 250,
    align: "center",
    sorter: getSorter("TimePeriodTitle"),
    render: (record) => (
        <Text style={{ color: Colors.blue[6] }}
            >{`${record.TimePeriodTitle}`}
        </Text>
    ),
  },
  {
    title: Words.under_five_age_death,
    width: 250,
    align: "center",
    sorter: getSorter("AgeCategoryTitle"),
    render: (record) => (
        <Text style={{ color: Colors.blue[6] }}
            >{`${(record.AgeCategoryID === 0 ? "" : record.AgeCategoryTitle)}`}
        </Text>
    ),
  },
  {
    title: Words.file_number,
    width: 250,
    align: "center",
    sorter: getSorter("FileNumber"),
    render: (record) => (
        <Text style={{ color: Colors.blue[6] }}
            >{`${record.FileNumber}`}
        </Text>
    ),
  },
];

const recordID = "ID";

const DeathFormsPage = ({ pageName }) => {
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
            title={Words.death_forms}
            searchText={searchText}
            sheets={getSheets(records)}
            fileName="DeathForms"
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
        <DeathFormModal
          onOk={handleSave}
          onCancel={handleCloseModal}
          isOpen={showModal}
          selectedObject={selectedObject}
        />
      )}

      {showDetails && (
        <DeathFormDetailsModal
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

export default DeathFormsPage;
