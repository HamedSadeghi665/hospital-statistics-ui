import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col, Typography } from "antd";
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
import InputItem from "../../../form-controls/input-item";
import SwitchItem from "../../../form-controls/switch-item";
import NumericInputItem from "../../../form-controls/numeric-input-item";
import DateItem from "../../../form-controls/date-item";
import DropdownItem from "./../../../form-controls/dropdown-item";
import DeathFormService from "./../../../../services/settings/main-info/death-forms-service";
import {
  useModalContext,
  useResetContext,
} from "../../../contexts/modal-context";

const schema = {
    ID: Joi.number().required(),
    SectionID: Joi.number(),
    DoctorID: Joi.number(),
    MonthID: Joi.number(),
    Year: Joi.number().min(1390).max(1410).required().label(Words.year),
    FullName: Joi.string().min(2).max(50).required().label(Words.title).regex(/^[آ-یa-zA-Z0-9.\-()\s]+$/),
    GenderID: Joi.number().required().min(1),
    Age: Joi.number().min(0).max(50).required().label(Words.age),
    AcceptDate: Joi.string().min(3).max(10).required().label(Words.accept_date).regex(/^[0-9]+$/),
    DeathDate: Joi.string().min(3).max(10).required().label(Words.death_date).regex(/^[0-9]+$/),
    ICDCategoryID: Joi.number(),
    DeathCause: Joi.string().min(2).max(50).required().label(Words.death_cause).regex(/^[آ-یa-zA-Z0-9.\-()\s]+$/),
    DeathSectionID: Joi.number(),
    TimePeriodID: Joi.number(),
    AgeCategoryID: Joi.number(),
    MotherDeath: Joi.boolean(),
    FileNumber: Joi.string().min(3).max(20).required().label(Words.file_number).regex(/^[0-9]+$/),
};

const initRecord = {
    ID: 0,
    SectionID: 0,
    DoctorID: 0,
    MonthID: 0,
    Year: 0,
    FullName: "",
    GenderID: 0,
    Age: 0,
    AcceptDate: "",
    DeathDate: "",
    ICDCategoryID: 0,
    DeathCause: "",
    DeathSectionID: 0,
    TimePeriodID: 0,
    AgeCategoryID: 0,
    MotherDeath: false,
    FileNumber: "",
};

const genders = [
    { GenderID: 1, GenderTitle: Words.male },
    { GenderID: 2, GenderTitle: Words.female },
  ];

const formRef = React.createRef();

const DeathFormModal = ({ isOpen, selectedObject, onOk, onCancel }) => {

    const [baseSections, setBaseSections] = useState([]);
    const [deathSections, setDeathSections] = useState([]);

    const {
        progress,
        setProgress,
        record,
        setRecord,
        errors,
        setErrors,
        doctors,
        setDoctors,
        monthes,
        setMonthes,
        ageCategories,
        setAgeCategories,
        icd10Categories,
        setIcd10Categories,
        timePeriods,
        setTimePeriods,
    } = useModalContext();

  const resetContext = useResetContext();

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
    doctors,
    setDoctors,
    ageCategories,
    setAgeCategories,
    icd10Categories,
    setIcd10Categories,
    timePeriods,
    setTimePeriods,
  };

  const clearRecord = () => {
    record.Date = "";
    record.SectionID = 0;
    record.DoctorID = 0;
    record.MonthID = 0;
    record.Year = 0;
    record.FullName = "";
    record.GenderID = 0;
    record.Age = 0;
    record.AcceptDate = "";
    record.DeathDate = "";
    record.ICDCategoryID = 0;
    record.DeathCause = "";
    record.DeathSectionID = 0;
    record.TimePeriodID = 0;
    record.AgeCategoryID = 0;
    record.MotherDeath = 0;
    record.FileNumber = "";

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };
  
  const setSections = (sections, column_id, set_func) => {
    const items = [...sections];
    items.forEach((section) => {
        section[column_id] = section.SectionID;
    });
    set_func(items);
  };

  useMount(async () => {
    resetContext();
    setRecord(initRecord);
    initModal(formRef, selectedObject, setRecord);
        
    const data = await DeathFormService.getParams();

    const { Sections, Doctors, Monthes, AgeCategories, ICD10Categories, TimePeriods} = data;
    
    setSections(Sections, "SectionID", setBaseSections);
    setSections(Sections, "DeathSectionID", setDeathSections);
        
    setDoctors(Doctors);
    setMonthes(Monthes);
    setAgeCategories(AgeCategories);
    setIcd10Categories(ICD10Categories);
    setTimePeriods(TimePeriods);
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
                    dataSource={baseSections}
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
                <Col xs={24}>
                    <DropdownItem
                    title={Words.doctor}
                    dataSource={doctors}
                    keyColumn="DoctorID"
                    valueColumn="FullName"
                    formConfig={formConfig}
                    required
                    />
                </Col>
                <Col xs={24}>
                    <InputItem
                    title={Words.full_name}
                    fieldName="FullName"
                    required
                    maxLength={50}
                    formConfig={formConfig}
                    />
                  </Col>
                <Col xs={24}>
                    <DropdownItem
                    title={Words.gender}
                    dataSource={genders}
                    keyColumn="GenderID"
                    valueColumn="GenderTitle"
                    formConfig={formConfig}
                    required
                    />
                    </Col>
                <Col xs={24} >
                    <NumericInputItem
                    title={Words.age}
                    fieldName="Age"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24} >
                    <DateItem
                    horizontal
                    title={Words.accept_date}
                    fieldName="AcceptDate"
                    formConfig={formConfig}
                    required
                    />
                </Col>
                <Col xs={24} >
                    <DateItem
                    horizontal
                    title={Words.death_date}
                    fieldName="DeathDate"
                    formConfig={formConfig}
                    required
                    />
                </Col>
                <Col xs={24}>
                    <InputItem
                    title={Words.death_cause}
                    fieldName="DeathCause"
                    required
                    maxLength={50}
                    formConfig={formConfig}
                    />
                  </Col>
                <Col xs={24}>
                    <DropdownItem
                    title={Words.death_section}
                    dataSource={deathSections}
                    keyColumn="DeathSectionID"
                    valueColumn="SectionTitle"
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
                    min={1390}
                    max={1410}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}>
                    <DropdownItem
                    title={Words.icd10_category}
                    dataSource={icd10Categories}
                    keyColumn="ICDCategoryID"
                    valueColumn="ICDCategoryTitle"
                    formConfig={formConfig}
                    required
                    />
                  </Col>
                <Col xs={24}>
                    <DropdownItem
                    title={Words.under_five_age_death}
                    dataSource={ageCategories}
                    keyColumn="AgeCategoryID"
                    valueColumn="AgeCategoryTitle"
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}>
                    <DropdownItem
                    title={Words.times_periods}
                    dataSource={timePeriods}
                    keyColumn="TimePeriodID"
                    valueColumn="TimePeriodTitle"
                    formConfig={formConfig}
                    required
                    />
                </Col>
                <Col xs={24}>
                    <SwitchItem
                    title={Words.mother_death}
                    fieldName="MotherDeath"
                    initialValue={false}
                    checkedTitle={Words.yes}
                    unCheckedTitle={Words.no}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}>
                    <InputItem
                    title={Words.file_number}
                    fieldName="FileNumber"
                    required
                    maxLength={50}
                    formConfig={formConfig}
                    />
                  </Col>
        </Row>
        </Form>
    </ModalWindow>
  );
};

export default DeathFormModal;
