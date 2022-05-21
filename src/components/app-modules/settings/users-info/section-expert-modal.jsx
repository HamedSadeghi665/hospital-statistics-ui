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
import sectionExpertsService from "./../../../../services/settings/users-info/section-experts-service";
import SwitchItem from "../../../form-controls/switch-item";
import {
  useModalContext,
  useResetContext,
} from "../../../contexts/modal-context";

const schema = {
    ExpertID: Joi.number().required(),
    MemberID: Joi.number().required(),
    SectionID: Joi.number().required(),
    IsActive: Joi.boolean(),
};

const initRecord = {
    ExpertID: 0,
    MemberID: 0,
    SectionID: 0,
    IsActive: false,
};

const formRef = React.createRef();

const SectionExpertModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
    const {
        progress,
        setProgress,
        record,
        setRecord,
        errors,
        setErrors,
        members,
        setMembers,
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
    members,
    setMembers,
    sections,
    setSections,
  };

  const clearRecord = () => {
    record.MemberID = 0;
    record.SectionID = 0;
    record.IsActive = false;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord(initRecord);
    initModal(formRef, selectedObject, setRecord);
        
    const data = await sectionExpertsService.getParams();
      
    setMembers(data.Members);
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
                />
            </Col>
            <Col xs={24}>
                <DropdownItem
                title={Words.member}
                dataSource={members}
                keyColumn="MemberID"
                valueColumn="FullName"
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

export default SectionExpertModal;
