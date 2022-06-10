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
import birthFormService from "./../../../../services/settings/main-info/birth-forms-service";
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
    DoctorID: Joi.number(),
    Births: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.births),
    NaturalBirths: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.natural_births),
    CesareanBirths: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.cesarean_births),
    NaturalBirthsFactorDr: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.natural_births_factor_doctor),
    NaturalBirthsFactorMidwife: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.natural_births_factor_midwife),
    CesElectiveCesareans: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.cesarean_elective_cesareans),
    CesPreviousCesareans: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.cesarean_previous_cesareans),
    CesAbnormalViews: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.cesarean_abnormal_views),
    CesFetalDistresses: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.cesarean_fetal_distresses),
    CesCPDs: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.cesarean_CPDs),
    CesLackOfProgresses: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.cesarean_lack_Of_progresses),
    CesMultipleChilds: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.cesarean_multiple_childs),
    CesPostTerms: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.cesarean_post_terms),
    CesMedicalAndSurgicalCauses: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.cesarean_medical_and_surgical_causes),
    NaturalBirthFirstBorns: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.natural_birth_first_borns),
    CesareanBirthFirstBorns: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.cesarean_birth_first_borns),
    FirstBornsCount: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.first_borns_count),
    NaturalBirthsAfterCesarean: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.natural_births_after_cesarean),
    NaturalBirthsWithSpinalAnalgesia: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.natural_births_with_spinal_analgesia),
    NaturalBirthsWithEpiduralAnalgesia: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.natural_births_with_epidural_analgesia),
    DeathsInDeliveryRome: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.deaths_in_delivery_rome),
    IUFDs: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.iUFDs),
    MultiTwin: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.multi_twin),
    MultiTriple: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.multi_triple),
    MultiFourTwins: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.multi_four_twins),
    MultiFiveTwins: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.multi_five_twins),
    MultiOtherMultiTwins: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.multi_other_multi_twins),
    MultiOtherCount: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.multi_other_count),
    LiveBirths: Joi.number()
        .min(0)
        .max(50)
        .required()
        .label(Words.live_births),
};

const initRecord = {
    ID: 0,
    SectionID: 0,
    Date: "",
    DoctorID: 0,
    Births: 0,
    NaturalBirths: 0,
    CesareanBirths: 0,
    NaturalBirthsFactorDr: 0,
    NaturalBirthsFactorMidwife: 0,
    CesElectiveCesareans: 0,
    CesPreviousCesareans: 0,
    CesAbnormalViews: 0,
    CesFetalDistresses: 0,
    CesCPDs: 0,
    CesLackOfProgresses: 0,
    CesMultipleChilds: 0,
    CesPostTerms: 0,
    CesPlacentaPrevias: 0,
    CesMedicalAndSurgicalCauses: 0,
    CesOthers: 0,
    NaturalBirthFirstBorns: 0,
    CesareanBirthFirstBorns: 0,
    FirstBornsCount: 0,
    NaturalBirthsAfterCesarean: 0,
    NaturalBirthsWithSpinalAnalgesia: 0,
    NaturalBirthsWithEpiduralAnalgesia: 0,
    DeathsInDeliveryRome: 0,
    IUFDs: 0,
    MultiTwin: 0,
    MultiTriple: 0,
    MultiFourTwins: 0,
    MultiFiveTwins: 0,
    MultiOtherMultiTwins: 0,
    MultiOtherCount: 0,
    LiveBirths: 0,
};

const formRef = React.createRef();

const BirthFormModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
    const {
        progress,
        setProgress,
        record,
        setRecord,
        errors,
        setErrors,
        sections,
        setSections,
        doctors,
        setDoctors,
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
    doctors,
    setDoctors,
  };

  const clearRecord = () => {
    record.Date = "";
    record.SectionID = 0;
    record.DoctorID = 0;
    record.Births = 0;
    record.NaturalBirths = 0;
    record.CesareanBirths = 0;
    record.NaturalBirthsFactorDr = 0;
    record.NaturalBirthsFactorMidwife = 0;
    record.CesElectiveCesareans = 0;
    record.CesPreviousCesareans = 0;
    record.CesAbnormalViews = 0;
    record.CesFetalDistresses = 0;
    record.CesCPDs = 0;
    record.CesLackOfProgresses = 0;
    record.CesMultipleChilds = 0;
    record.CesPostTerms = 0;
    record.CesPlacentaPrevias = 0;
    record.CesMedicalAndSurgicalCauses = 0;
    record.CesOthers = 0;
    record.NaturalBirthFirstBorns = 0;
    record.CesareanBirthFirstBorns = 0;
    record.FirstBornsCount = 0;
    record.NaturalBirthsAfterCesarean = 0;
    record.NaturalBirthsWithSpinalAnalgesia = 0;
    record.NaturalBirthsWithEpiduralAnalgesia = 0;
    record.DeathsInDeliveryRome = 0;
    record.IUFDs = 0;
    record.MultiTwin = 0;
    record.MultiTriple = 0;
    record.MultiFourTwins = 0;
    record.MultiFiveTwins = 0;
    record.MultiOtherMultiTwins = 0;
    record.MultiOtherCount = 0;
    record.LiveBirths = 0;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord(initRecord);
    initModal(formRef, selectedObject, setRecord);
        
    const data = await birthFormService.getParams();
        
    setDoctors(data.Doctors);
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
                    title={Words.doctor}
                    dataSource={doctors}
                    keyColumn="DoctorID"
                    valueColumn="FullName"
                    formConfig={formConfig}
                    required
                    />
                </Col>
                <Col xs={24} >
                    <DateItem
                        horizontal
                        title={Words.date}
                        fieldName="Date"
                          formConfig={formConfig}
                          required
                    />
                </Col>
                <Col xs={24} >
                    <NumericInputItem
                    title={Words.births}
                    fieldName="Births"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24} >
                    <NumericInputItem
                    title={Words.natural_births}
                    fieldName="NaturalBirths"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24} >
                    <NumericInputItem
                    title={Words.cesarean_births}
                    fieldName="CesareanBirths"
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
                    title={Words.natural_births_factor_doctor}
                    fieldName="NaturalBirthsFactorDr"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24} >
                    <NumericInputItem
                    title={Words.natural_births_factor_midwife}
                    fieldName="NaturalBirthsFactorMidwife"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24} >
                    <NumericInputItem
                    title={Words.cesarean_elective_cesareans}
                    fieldName="CesElectiveCesareans"
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
                    title={Words.cesarean_previous_cesareans}
                    fieldName="CesPreviousCesareans"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.cesarean_abnormal_views}
                    fieldName="CesAbnormalViews"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.cesarean_fetal_distresses}
                    fieldName="CesFetalDistresses"
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
                    title={Words.cesarean_CPDs}
                    fieldName="CesCPDs"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.cesarean_lack_Of_progresses}
                    fieldName="CesLackOfProgresses"
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
                    title={Words.cesarean_multiple_childs}
                    fieldName="CesMultipleChilds"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.cesarean_post_terms}
                    fieldName="CesPostTerms"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.cesarean_medical_and_surgical_causes}
                    fieldName="CesMedicalAndSurgicalCauses"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.natural_birth_first_borns}
                    fieldName="NaturalBirthFirstBorns"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.cesarean_birth_first_borns}
                    fieldName="CesareanBirthFirstBorns"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.first_borns_count}
                    fieldName="FirstBornsCount"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.natural_births_after_cesarean}
                    fieldName="NaturalBirthsAfterCesarean"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.natural_births_with_spinal_analgesia}
                    fieldName="NaturalBirthsWithSpinalAnalgesia"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.natural_births_with_epidural_analgesia}
                    fieldName="NaturalBirthsWithEpiduralAnalgesia"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.deaths_in_delivery_rome}
                    fieldName="DeathsInDeliveryRome"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.iUFDs}
                    fieldName="IUFDs"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.multi_twin}
                    fieldName="MultiTwin"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.multi_triple}
                    fieldName="MultiTriple"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.multi_four_twins}
                    fieldName="MultiFourTwins"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.multi_five_twins}
                    fieldName="MultiFiveTwins"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.multi_other_multi_twins}
                    fieldName="MultiOtherMultiTwins"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.multi_other_count}
                    fieldName="MultiOtherCount"
                    horizontal
                    required
                    min={0}
                    max={50}
                    formConfig={formConfig}
                    />
                </Col>
                <Col xs={24}  >
                    <NumericInputItem
                    title={Words.live_births}
                    fieldName="LiveBirths"
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

export default BirthFormModal;
