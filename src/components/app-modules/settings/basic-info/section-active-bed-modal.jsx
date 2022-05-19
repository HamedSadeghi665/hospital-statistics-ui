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
import InputItem from "../../../form-controls/input-item";
import DropdownItem from "./../../../form-controls/dropdown-item";
import sectionActiveBedsService from "./../../../../services/settings/basic-info/section-active-beds-service";
import {
  useModalContext,
  useResetContext,
} from "../../../contexts/modal-context";

const schema = {
  ID: Joi.number().required(),
  SectionID: Joi.number().required(),
  ActiveBeds: Joi.string()
  .min(1)
  .max(3)
  .required()
  .label(Words.title)
  .regex(/^[0-9]+$/)
};

const initRecord = {
    ID: 0,
    SectionID: 0,
    ActiveBeds: 0,
};

const formRef = React.createRef();

const SectionActiveBedModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
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
    record.ID = 0;
    record.SectionID = 0;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord(initRecord);
    initModal(formRef, selectedObject, setRecord);
      
    const data = await sectionActiveBedsService.getParams();
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
    >
      <Form ref={formRef} name="dataForm">
        <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
            <Col xs={24}>
                <DropdownItem
                title={Words.section}
                dataSource={sections}
                required
                keyColumn="SectionID"
                valueColumn="SectionTitle"
                formConfig={formConfig}
                />
            </Col>
            <Col xs={24}>
                <InputItem
                title={Words.activeBed}
                fieldName="ActiveBeds"
                required
                autoFocus
                maxLength={3}
                formConfig={formConfig}
                />
            </Col>
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default SectionActiveBedModal;
