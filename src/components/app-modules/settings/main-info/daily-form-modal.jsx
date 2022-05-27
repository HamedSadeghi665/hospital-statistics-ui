import React from "react";
import { useMount } from "react-use";
import { Form, Row, Col } from "antd";
import Joi from "joi-browser";
import ModalWindow from "../../../common/modal-window";
import Words from "../../../../resources/words";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
} from "../../../../tools/form-manager";
import { Divider } from "antd";
import NumericInputItem from "../../../form-controls/numeric-input-item";
import DateItem from "../../../form-controls/date-item";
import DropdownItem from "./../../../form-controls/dropdown-item";
import dailyFormService from "./../../../../services/settings/main-info/daily-forms-serevice";
import {
  useModalContext,
  useResetContext,
} from "../../../contexts/modal-context";

const schema = {
  ID: Joi.number().required(),
  SectionID: Joi.number(),
  Date: Joi.string()
  .min(3)
  .required()
  .label(Words.date)
  .regex(/^[0-9]+$/),
  ActiveBeds: Joi.number()
    .min(0)
    .max(50)
  .required()
  .label(Words.acctive_beds),
  ExtraBeds: Joi.number()
  .min(0)
  .max(50)
  .required()
  .label(Words.extra_beds),
  InPatients: Joi.number()
  .min(0)
  .max(50)
  .required()
  .label(Words.extra_beds),
  NewInPatients: Joi.number()
  .min(0)
  .max(50)
  .required()
  .label(Words.extra_beds),
  NewInPatientsFromSection: Joi.number()
  .min(0)
  .max(50)
  .required()
  .label(Words.extra_beds),
  NewInPatientsFromHospital: Joi.number()
  .min(0)
  .max(50)
  .required()
  .label(Words.extra_beds),
  DischargedPatients: Joi.number()
  .min(0)
  .max(50)
  .required()
  .label(Words.extra_beds),
  DischargedPatientsToSection: Joi.number()
  .min(0)
  .max(50)
  .required()
  .label(Words.extra_beds),
  DischargedPatientsToHospital: Joi.number()
  .min(0)
  .max(50)
  .required()
  .label(Words.extra_beds),
  DiedPatientsOn24Hour: Joi.number()
  .min(0)
  .max(50)
  .required()
  .label(Words.extra_beds),
  DiedPatientsMorThan24Hour: Joi.number()
  .min(0)
  .max(50)
  .required()
  .label(Words.extra_beds),
  PatientsLessThanSixHour: Joi.number()
  .min(0)
  .max(50)
  .required()
  .label(Words.extra_beds),
  PatientsBetween6And24Hour: Joi.number()
  .min(0)
  .max(50)
  .required()
  .label(Words.extra_beds),
  PatientsIn7Morning: Joi.number()
  .min(0)
  .max(50)
  .required()
  .label(Words.extra_beds),
  MatchingBedsWithActiveAndExtra: Joi.number()
  .min(0)
  .max(50)
  .required()
  .label(Words.extra_beds),
  };

const initRecord = {
  ID: 0,
  SectionID: 0,
  Date: "",
  ActiveBeds: 0,
  ExtraBeds: 0,
  InPatients: 0,
  NewInPatients: 0,
  NewInPatientsFromSection: 0,
  NewInPatientsFromHospital: 0,
  DischargedPatients: 0,
  DischargedPatientsToSection: 0,
  DischargedPatientsToHospital: 0,
  DiedPatientsOn24Hour: 0,
  DiedPatientsMorThan24Hour: 0,
  PatientsLessThanSixHour: 0,
  PatientsBetween6And24Hour: 0,
  PatientsIn7Morning: 0,
  MatchingBedsWithActiveAndExtra: 0,
};

const formRef = React.createRef();

const DailyFormModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
    const {
        progress,
        setProgress,
        record,
        setRecord,
        errors,
        setErrors,
        sections,
        setSections,
    } = useModalContext();

  const resetContext = useResetContext();

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
    sections,
    setSections,
  };

  const clearRecord = () => {
    record.Date = "";
    record.SectionID = 0;
    record.ActiveBeds = 0;
    record.ExtraBeds = 0;
    record.InPatients = 0;
    record.NewInPatients = 0;
    record.NewInPatientsFromSection = 0;
    record.NewInPatientsFromHospital = 0;
    record.DischargedPatients = 0;
    record.DischargedPatientsToSection = 0;
    record.DischargedPatientsToHospital = 0;
    record.DiedPatientsOn24Hour = 0;
    record.DiedPatientsMorThan24Hour = 0;
    record.PatientsLessThanSixHour = 0;
    record.PatientsBetween6And24Hour = 0;
    record.PatientsIn7Morning = 0;
    record.MatchingBedsWithActiveAndExtra = 0;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord(initRecord);
    initModal(formRef, selectedObject, setRecord);
      
    const data = await dailyFormService.getParams();
    setSections(data);
  });

  const isEdit = selectedObject !== null;

  const handleSubmit = async () => {
    saveModalChanges(
      formConfig,
      selectedObject,
      setProgress,
      onOk,
      clearRecord
    );
  };

  return (
    <ModalWindow
      isOpen={isOpen}
      isEdit={isEdit}
      inProgress={progress}
      disabled={validateForm({ record, schema }) && true}
      onClear={clearRecord}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      width={500}
    >
      <Form ref={formRef} name="dataForm">
        <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
          <Col xs={24}>
              <DropdownItem
              title={Words.section}
              dataSource={sections}
              keyColumn="SectionID"
              valueColumn="SectionTitle"
              formConfig={formConfig}
              required
              autoFocus
              />
          </Col>
          <Col xs={24} >
            <DateItem
              horizontal
              title={Words.date}
              fieldName="Date"
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} >
              <NumericInputItem
              title={Words.acctive_beds}
              fieldName="ActiveBeds"
              horizontal
              required
              min={0}
              max={50}
              formConfig={formConfig}
              />
          </Col>
          <Col xs={24} >
              <NumericInputItem
              title={Words.extra_beds}
              fieldName="ExtraBeds"
              horizontal
              required
              min={0}
              max={50}
              formConfig={formConfig}
              />
          </Col>
          <Col xs={24} >
              <NumericInputItem
              title={Words.in_patients}
              fieldName="InPatients"
              horizontal
              required
              min={0}
              max={50}
              formConfig={formConfig}
              />
          </Col>
          <Divider></Divider>
          <Col xs={24} >
              <NumericInputItem
              title={Words.new_in_patients}
              fieldName="NewInPatients"
              horizontal
              required
              min={0}
              max={50}
              formConfig={formConfig}
              />
          </Col>
          <Col xs={24} >
              <NumericInputItem
              title={Words.new_in_patients_from_section}
              fieldName="NewInPatientsFromSection"
              horizontal
              required
              min={0}
              max={50}
              formConfig={formConfig}
              />
          </Col>
          <Col xs={24} >
              <NumericInputItem
              title={Words.new_in_patients_from_hospital}
              fieldName="NewInPatientsFromHospital"
              horizontal
              required
              min={0}
              max={50}
              formConfig={formConfig}
              />
          </Col>
          <Divider />
          <Col xs={24}  >
              <NumericInputItem
              title={Words.discharged_patients}
              fieldName="DischargedPatients"
              horizontal
              required
              min={0}
              max={50}
              formConfig={formConfig}
              />
          </Col>
          <Col xs={24}  >
              <NumericInputItem
              title={Words.discharged_patients_to_section}
              fieldName="DischargedPatientsToSection"
              horizontal
              required
              min={0}
              max={50}
              formConfig={formConfig}
              />
          </Col>
          <Col xs={24}  >
              <NumericInputItem
              title={Words.discharged_patients_to_hospital}
              fieldName="DischargedPatientsToHospital"
              horizontal
              required
              min={0}
              max={50}
              formConfig={formConfig}
              />
          </Col>
          <Divider />
          <Col xs={24}  >
              <NumericInputItem
              title={Words.died_patients_on_24_hour}
              fieldName="DiedPatientsOn24Hour"
              horizontal
              required
              min={0}
              max={50}
              formConfig={formConfig}
              />
          </Col>
          <Col xs={24}  >
              <NumericInputItem
              title={Words.died_patients_more_than_24_hour}
              fieldName="DiedPatientsMorThan24Hour"
              horizontal
              required
              min={0}
              max={50}
              formConfig={formConfig}
              />
          </Col>
          <Divider />
          <Col xs={24}  >
              <NumericInputItem
              title={Words.patients_less_than_six_hour}
              fieldName="PatientsLessThanSixHour"
              horizontal
              required
              min={0}
              max={50}
              formConfig={formConfig}
              />
          </Col>
          <Col xs={24}  >
              <NumericInputItem
              title={Words.patients_between_6_and_24_hour}
              fieldName="PatientsBetween6And24Hour"
              horizontal
              required
              min={0}
              max={50}
              formConfig={formConfig}
              />
          </Col>
          <Col xs={24}  >
              <NumericInputItem
              title={Words.patients_in_7_morning}
              fieldName="PatientsIn7Morning"
              horizontal
              required
              min={0}
              max={50}
              formConfig={formConfig}
              />
          </Col>
          <Col xs={24}  >
              <NumericInputItem
              title={Words.matching_beds_with_active_and_extra}
              fieldName="MatchingBedsWithActiveAndExtra"
              horizontal
              required
              min={0}
              max={50}
              formConfig={formConfig}
              />
          </Col>
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default DailyFormModal;
