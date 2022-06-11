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
import NumericInputItem from "../../../form-controls/numeric-input-item";
import DropdownItem from "./../../../form-controls/dropdown-item";
import monthlyFormService from "./../../../../services/settings/main-info/monthly-forms-service";
import {
  useModalContext,
  useResetContext,
} from "../../../contexts/modal-context";

const schema = {
    ID: Joi.number().required(),
    SectionID: Joi.number(),
    MonthID: Joi.number(),
    Year: Joi.number()
        .min(1390)
        .max(1450)
        .required()
        .label(Words.year),
    OutPatients: Joi.number()
        .min(0)
        .max(500)
        .required()
        .label(Words.out_patients),
    InPatients: Joi.number()
        .min(0)
        .max(500)
        .required()
        .label(Words.in_patients),
};

const initRecord = {
    ID: 0,
    SectionID: 0,
    MonthID: 0,
    Year: 0,
    OutPatients: 0,
    InPatients: 0,
};

const formRef = React.createRef();

const MonthlyFormModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
    const {
        progress,
        setProgress,
        record,
        setRecord,
        errors,
        setErrors,
        sections,
        setSections,
        monthes,
        setMonthes,
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
    monthes,
    setMonthes,
  };

  const clearRecord = () => {
    record.SectionID = 0;
    record.MonthID = 0;
    record.Year = 0;
    record.OutPatients = 0;
    record.InPatients = 0;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord(initRecord);
    initModal(formRef, selectedObject, setRecord);
        
    const data = await monthlyFormService.getParams();
        
    setMonthes(data.Monthes);
    setSections(data.Sections);
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
      width={600}
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
                  
                <Col xs={24}>
                    <DropdownItem
                    title={Words.month}
                    dataSource={monthes}
                    keyColumn="MonthID"
                    valueColumn="MonthTitle"
                    formConfig={formConfig}
                    required
                    />
                </Col>
                <Col xs={24} >
                    <NumericInputItem
                    title={Words.year}
                    fieldName="Year"
                    horizontal
                    required
                    min={1300}
                    max={1450}
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
                <Col xs={24} >
                    <NumericInputItem
                    title={Words.out_patients}
                    fieldName="OutPatients"
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

export default MonthlyFormModal;
