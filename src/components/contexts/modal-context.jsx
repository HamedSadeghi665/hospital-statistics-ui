import { useState, createContext, useContext } from "react";

const ModalContext = createContext();

const useModalContext = () => useContext(ModalContext);

const ModalContextProvider = ({ children }) => {
  const [progress, setProgress] = useState(false);
  const [record, setRecord] = useState({});
  const [errors, setErrors] = useState({});
  const [memberSearchProgress, setMemberSearchProgress] = useState(false);
  const [members, setMembers] = useState([]);
  const [expertises, setExpertises] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [sections, setSections] = useState([]);
  const [parentSections, setParentSections] = useState([]);
  const [generalSections, setGeneralSections] = useState([]);
  const [selectedProvinceID, setSelectedProvinceID] = useState(0);
  const [cities, setCities] = useState([]);
  const [monthes, setMonthes] = useState([]);
  const [years, setYears] = useState([]);
  const [eduLevels, setEduLevels] = useState([]);
  const [eduFields, setEduFields] = useState([]);
  const [regTypes, setRegTypes] = useState([]);
  const [swapMembers, setSwapMembers] = useState([]);
  const [searchTypes, setSearchTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [models, setModels] = useState([]);
  const [types, setTypes] = useState([]);
  const [showModal, setShowModal] = useState([]);
  const [commandSources, setCommandSources] = useState([]);
  const [fileList, setFileList] = useState({});

  const contextValue = {
    progress,
    setProgress,
    record,
    setRecord,
    errors,
    setErrors,
    memberSearchProgress,
    setMemberSearchProgress,
    members,
    setMembers,
    expertises,
    setExpertises,
    provinces,
    setProvinces,
    sections,
    setSections,
    parentSections,
    setParentSections,
    generalSections,
    setGeneralSections,
    selectedProvinceID,
    setSelectedProvinceID,
    cities,
    setCities,
    monthes,
    setMonthes,
    years,
    setYears,
    eduLevels,
    setEduLevels,
    eduFields,
    setEduFields,
    regTypes,
    setRegTypes,
    swapMembers,
    setSwapMembers,
    searchTypes,
    setSearchTypes,
    statuses,
    setStatuses,
    models,
    setModels,
    types,
    setTypes,
    showModal,
    setShowModal,
    commandSources,
    setCommandSources,
    fileList,
    setFileList,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

const useResetContext = () => {
  const { setProgress, setRecord, setErrors } = useModalContext();

  const resetContext = () => {
    setProgress(false);
    setRecord({});
    setErrors({});
  };

  return resetContext;
};

export { ModalContextProvider, useModalContext, useResetContext };
