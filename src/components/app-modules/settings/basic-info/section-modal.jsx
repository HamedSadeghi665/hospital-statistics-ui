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
import sectionsService from "./../../../../services/settings/basic-info/sections-service";
import SwitchItem from "../../../form-controls/switch-item";
import {
  useModalContext,
  useResetContext,
} from "../../../contexts/modal-context";

const schema = {
    SectionID: Joi.number().required(),
    //ParentID: Joi.number(),
    SectionTitle: Joi.string()
    .min(2)
    .max(50)
    .required()
    .label(Words.title)
    .regex(/^[آ-یa-zA-Z0-9.\-()\s]+$/),
    IsActive: Joi.boolean(),
};

const initRecord = {
    SectionID: 0,
    ParentID: 0,
    SectionTitle: "",
    IsActive: false,
};

const formRef = React.createRef();

const SectionModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
    const {
        progress,
        setProgress,
        record,
        setRecord,
        errors,
        setErrors,
        parentSections,
        setParentSections,
    } = useModalContext();

  const resetContext = useResetContext();

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.SectionTitle = "";
    record.ParentID = 0;
    record.IsActive = false;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord(initRecord);
    initModal(formRef, selectedObject, setRecord);
      
    const data = await sectionsService.getParams();
    setParentSections(data);
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
                <InputItem
                title={Words.title}
                fieldName="SectionTitle"
                required
                autoFocus
                maxLength={50}
                formConfig={formConfig}
                />
            </Col>
            <Col xs={24}>
                <DropdownItem
                title={Words.section}
                dataSource={parentSections}
                keyColumn="SectionID"
                valueColumn="SectionTitle"
                formConfig={formConfig}
                />
            </Col>
            <Col xs={24}>
                <SwitchItem
                title={Words.status}
                fieldName="IsActive"
                initialValue={false}
                checkedTitle={Words.active}
                unCheckedTitle={Words.inactive}
                formConfig={formConfig}
                />
            </Col>
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default SectionModal;
