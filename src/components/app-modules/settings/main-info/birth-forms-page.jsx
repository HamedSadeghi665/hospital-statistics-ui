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
import service from "../../../../services/settings/main-info/birth-forms-service";
import {
  getSorter,
  checkAccess,
  getColumns,
  GetSimplaDataPageMethods,
} from "../../../../tools/form-manager";
import SimpleDataTable from "../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../common/simple-data-page-header";
import BirthFormModal from "./birth-form-modal";
import BirthFormDetailsModal from "./birth-forms-details-modal";
import Colors from "../../../../resources/colors";
import { usePageContext } from "../../../contexts/page-context";

const { Text } = Typography;

const getSheets = (records) => [
  {
    title: "BirthForms",
    data: records,
    columns: [
        { label: Words.id, value: "ID" },
        { label: Words.section, value: "SectionTitle" },
        {
            label: Words.doctor,
            value: (record) => `${record.FirstName} ${record.LastName}`,
        },
        {
            label: Words.date,
            value: (record) => `${utils.slashDate(record.Date)}`,
        },
        { label: Words.births, value: "Births" },
        { label: Words.natural_births, value: "NaturalBirths" },
        { label: Words.cesarean_births, value: "CesareanBirths" },
        { label: Words.natural_births_factor_doctor, value: "NaturalBirthsFactorDr" },
        { label: Words.natural_births_factor_midwife, value: "NaturalBirthsFactorMidwife" },
        { label: Words.cesarean_elective_cesareans, value: "CesElectiveCesareans" },
        { label: Words.cesarean_previous_cesareans, value: "CesPreviousCesareans" },
        { label: Words.cesarean_abnormal_views, value: "CesAbnormalViews" },
        { label: Words.cesarean_fetal_distresses, value: "CesFetalDistresses" },
        { label: Words.cesarean_CPDs, value: "CesCPDs" },
        { label: Words.cesarean_lack_Of_progresses, value: "CesLackOfProgresses" },
        { label: Words.cesarean_multiple_childs, value: "CesMultipleChilds" },
        { label: Words.cesarean_post_terms, value: "CesPostTerms" },
        { label: Words.cesarean_medical_and_surgical_causes, value: "CesMedicalAndSurgicalCauses" },
        { label: Words.natural_birth_first_borns, value: "NaturalBirthFirstBorns" },
        { label: Words.cesarean_birth_first_borns, value: "CesareanBirthFirstBorns" },
        { label: Words.first_borns_count, value: "FirstBornsCount" },
        { label: Words.natural_births_after_cesarean, value: "NaturalBirthsAfterCesarean" },
        { label: Words.natural_births_with_spinal_analgesia, value: "NaturalBirthsWithSpinalAnalgesia" },
        { label: Words.natural_births_with_epidural_analgesia, value: "NaturalBirthsWithEpiduralAnalgesia" },
        { label: Words.deaths_in_delivery_rome, value: "DeathsInDeliveryRome" },
        { label: Words.iUFDs, value: "IUFDs" },
        { label: Words.multi_twin, value: "MultiTwin" },
        { label: Words.multi_triple, value: "MultiTriple" },
        { label: Words.multi_four_twins, value: "MultiFourTwins" },
        { label: Words.multi_five_twins, value: "MultiFiveTwins" },
        { label: Words.multi_other_multi_twins, value: "MultiOtherMultiTwins" },
        { label: Words.multi_other_count, value: "MultiOtherCount" },
        { label: Words.live_births, value: "LiveBirths" },
        { label: Words.natural_births_percent, value: "NaturalBirthsPercent" },
        { label: Words.cesarean_births_percent, value: "CesareanBirthsPercent" },
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
        sorter: getSorter("LastName"),
        render: (record) => (
            <Text style={{ color: Colors.blue[6] }}
                >{`${record.FirstName} ${record.LastName}`}
            </Text>
        ),
    },
    {
        title: Words.date,
        width: 100,
        align: "center",
        dataIndex: "Date",
        sorter: getSorter("Date"),
        render: (Date) => (
            <Text style={{ color: Colors.orange[6] }}>
                {utils.farsiNum(utils.slashDate(Date))}
            </Text>
        ),
    },
    {
        title: Words.births,
        width: 120,
        align: "center",
        dataIndex: "Births",
        sorter: getSorter("Births"),
        render: (Births) => (
            <Text style={{ color: Colors.magenta[6] }}>
                {utils.farsiNum(Births)}
            </Text>
        ),
    },
    {
        title: Words.natural_births,
        width: 120,
        align: "center",
        dataIndex: "NaturalBirths",
        sorter: getSorter("NaturalBirths"),
        render: (NaturalBirths) => (
            <Text style={{ color: Colors.magenta[6] }}>
                {utils.farsiNum(NaturalBirths)}
            </Text>
        ),
    },
    {
        title: Words.cesarean_births,
        width: 120,
        align: "center",
        dataIndex: "CesareanBirths",
        sorter: getSorter("CesareanBirths"),
        render: (CesareanBirths) => (
            <Text style={{ color: Colors.magenta[6] }}>
                {utils.farsiNum(CesareanBirths)}
            </Text>
        ),
    },
    {
        title: Words.natural_birth_first_borns,
        width: 120,
        align: "center",
        dataIndex: "NaturalBirthFirstBorns",
        sorter: getSorter("NaturalBirthFirstBorns"),
        render: (NaturalBirthFirstBorns) => (
            <Text style={{ color: Colors.magenta[6] }}>
                {utils.farsiNum(NaturalBirthFirstBorns)}
            </Text>
        ),
    },
    {
        title: Words.cesarean_birth_first_borns,
        width: 120,
        align: "center",
        dataIndex: "CesareanBirthFirstBorns",
        sorter: getSorter("CesareanBirthFirstBorns"),
        render: (CesareanBirthFirstBorns) => (
            <Text style={{ color: Colors.magenta[6] }}>
                {utils.farsiNum(CesareanBirthFirstBorns)}
            </Text>
        ),
    },
    {
        title: Words.first_borns_count,
        width: 120,
        align: "center",
        dataIndex: "FirstBornsCount",
        sorter: getSorter("FirstBornsCount"),
        render: (FirstBornsCount) => (
            <Text style={{ color: Colors.magenta[6] }}>
                {utils.farsiNum(FirstBornsCount)}
            </Text>
        ),
    },
    {
        title: Words.deaths_in_delivery_rome,
        width: 120,
        align: "center",
        dataIndex: "DeathsInDeliveryRome",
        sorter: getSorter("DeathsInDeliveryRome"),
        render: (DeathsInDeliveryRome) => (
            <Text style={{ color: Colors.magenta[6] }}>
                {utils.farsiNum(DeathsInDeliveryRome)}
            </Text>
        ),
    },
    {
        title: Words.multi_other_count,
        width: 120,
        align: "center",
        dataIndex: "MultiOtherCount",
        sorter: getSorter("MultiOtherCount"),
        render: (MultiOtherCount) => (
            <Text style={{ color: Colors.magenta[6] }}>
                {utils.farsiNum(MultiOtherCount)}
            </Text>
        ),
    },
    {
        title: Words.live_births,
        width: 120,
        align: "center",
        dataIndex: "LiveBirths",
        sorter: getSorter("LiveBirths"),
        render: (LiveBirths) => (
            <Text style={{ color: Colors.magenta[6] }}>
                {utils.farsiNum(LiveBirths)}
            </Text>
        ),
    },
    {
        title: Words.natural_births_percent,
        width: 120,
        align: "center",
        dataIndex: "NaturalBirthsPercent",
        sorter: getSorter("NaturalBirthsPercent"),
        render: (NaturalBirthsPercent) => (
            <Text style={{ color: Colors.magenta[6] }}>
                {utils.farsiNum(NaturalBirthsPercent)}
            </Text>
        ),
    },
    {
        title: Words.cesarean_births_percent,
        width: 120,
        align: "center",
        dataIndex: "CesareanBirthsPercent",
        sorter: getSorter("CesareanBirthsPercent"),
        render: (CesareanBirthsPercent) => (
            <Text style={{ color: Colors.magenta[6] }}>
                {utils.farsiNum(CesareanBirthsPercent)}
            </Text>
        ),
    },
];

const recordID = "ID";

const BirthFormsPage = ({ pageName }) => {
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
            title={Words.birth_forms}
            searchText={searchText}
            sheets={getSheets(records)}
            fileName="BirthForms"
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
        <BirthFormModal
          onOk={handleSave}
          onCancel={handleCloseModal}
          isOpen={showModal}
          selectedObject={selectedObject}
        />
      )}

      {showDetails && (
        <BirthFormDetailsModal
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

export default BirthFormsPage;
