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
import generalSectionPartsService from "./../../../../services/settings/basic-info/general-section-parts-service";
import SwitchItem from "../../../form-controls/switch-item";
import {
  useModalContext,
  useResetContext,
} from "../../../contexts/modal-context";

const schema = {
    ID: Joi.number().required(),
    GeneralSectionID: Joi.number().required(),
    SectionID: Joi.number().required(),
};

const initRecord = {
    ID: 0,
    GeneralSectionID: 0,
    SectionID: 0,
};

const formRef = React.createRef();

const GeneralSectionPartModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
    const {
        progress,
        setProgress,
        record,
        setRecord,
        errors,
        setErrors,
        sections,
        setSections,
        generalSections,
        setGeneralSections,
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
    generalSections,
    setGeneralSections,
  };

  const clearRecord = () => {
    record.GeneralSectionID = 0;
    record.SectionID = 0;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord(initRecord);
    initModal(formRef, selectedObject, setRecord);
        
    const data = await generalSectionPartsService.getParams();
      
    setSections(data.Sections);
    setGeneralSections(data.GeneralSections);
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
                title={Words.general_section}
                dataSource={generalSections}
                keyColumn="GeneralSectionID"
                valueColumn="GeneralSectionTitle"
                formConfig={formConfig}
                />
            </Col>
            <Col xs={24}>
                <DropdownItem
                title={Words.section}
                dataSource={sections}
                keyColumn="SectionID"
                valueColumn="SectionTitle"
                formConfig={formConfig}
                />
            </Col>
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default GeneralSectionPartModal;
