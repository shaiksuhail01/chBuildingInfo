import React, { useState } from 'react';
import DraggableDialog from '../DailogueBox';
import { Scrollbars } from 'react-custom-scrollbars';
import TextField from '@mui/material/TextField';
import {  MenuItem, } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import Header from '../Header';


const suggestionList=[
    {
        id:1,
        krookieNumber:'CV-2356',
        plotAddress:'kadiri'
        
    },
    {
        id:2,
        krookieNumber:'CV-2357',
        plotAddress:'Hyderabad'
    },
    {
        id:3,
        krookieNumber:'CV-2358',
        plotAddress:'Bangalore'
    },
    {
        id:4,
        krookieNumber:'CV-2359',
        plotAddress:'Mumbai'
    },

]



const advertisementTypes = [
  { value: 'RadioAds', label: 'Radio Ads' },
  { value: 'OnlineVideoAds', label: 'Online Video Ads' },
  { value: 'EmailMarketing', label: 'Email Marketing' },
  { value: 'Newspaper', label: 'Newspaper' },
  { value: 'EventSponsorship', label: 'Event Sponsorship' },
];

const stageOptions = ['Option1', 'Option2', 'Option3', 'Option4'];

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});



const ChBuildingInfo = () => {
  const [plotNumber,setPlotNumber]=useState('')
  const [krookieNumber, setKrookieNumber] = useState('');
  const [plotAddress, setPlotAddress] = useState('');
  const [advertisementType, setAdvertisementType] = useState('');
  const [constructionStages, setConstructionStages] = useState([1, 2]); 
  const [selectedValues, setSelectedValues] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState(false);

  const { t,i18n } = useTranslation();
  const isArabic = i18n.language === 'ar'; 
  const [buildingData, setBuildingData] = useState([
    { buildingNumber: '', totalSize: '', numberOfFloors: '' },
    { buildingNumber: '', totalSize: '', numberOfFloors: '' },
    { buildingNumber: '', totalSize: '', numberOfFloors: '' },
  
   
  ]);



  const [errors, setErrors] = useState({
    plotNumber: false,
    krookieNumber: false,
    plotAddress: false,
    consultantCode: false,
    consultantName: false,
    advertisementType:false,

  });



  const handleKrookieChange = (event) => {
    const enteredKrookieNumber = event.target.value;
    setKrookieNumber(enteredKrookieNumber);
    handleResetError('krookieNumber');
    const suggestion = suggestionList.find(item => item.krookieNumber.toString() === enteredKrookieNumber);

    if (suggestion) {
      setPlotAddress(suggestion.plotAddress);
      handleResetError('plotAddress');
    
    } else {
      setPlotAddress('');
     
    }
  };

  const handlePlotNumberChange = (event) => {
    setPlotNumber(event.target.value);
    handleResetError('plotNumber');
  };


  const handlePlotAddressChange = (event) => {
    setPlotAddress(event.target.value);
    handleResetError('plotAddress');
  };

  const handleAdvertisementTypeChange = (event) => {
    setAdvertisementType(event.target.value);
    handleResetError('advertisementType');
  };


  const handleAddStage = () => {
    setConstructionStages((prevStages) => [...prevStages, prevStages.length + 1]);
  };


  const handleAddBuildingStage = () => {
    setBuildingData(prevData => [
      ...prevData,
      { buildingNumber: '', totalSize: '', numberOfFloors: '' },
    ]);
  };
  

  const handleStageChange = (stage, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [stage]: value,
    }));
  };


  const handleInputChange = (index, field, value) => {  
    setBuildingData(prevData => {
      const newData = [...prevData];
      newData[index][field] = value;
      return newData;
    });
  };

  
  const handleNextButtonClick = () => {
    const requiredFields = [
      plotNumber,
      krookieNumber,
      plotAddress,
      advertisementType,
    ];

    const emptyStages = constructionStages.some(stage => !selectedValues[stage]);
    const emptyBuildingDetails = buildingData.some(building => !building.totalSize || !building.numberOfFloors);

    if (requiredFields.some(field => field === '') || emptyStages || emptyBuildingDetails) {
      // Show the confirmation dialog with the "All the fields required" message
      setShowModal(false);
      setConfirmationDialog(true);
    } else {
      // Toggle the state to show the main dialog
      setConfirmationDialog(false);
      setShowModal(true);
    }
  };
  


  const handleDeleteStage = (stage) => {
    setConstructionStages((prevStages) => prevStages.filter((s) => s !== stage));
    setSelectedValues((prevValues) => {
      const { [stage]: _, ...newValues } = prevValues;
      return newValues;
    });
  };


  const handleDeleteBuilding = (index) => {
    setBuildingData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);  
      return newData;
    });
  };

  const handleResetError = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
  };
  const handleBlur = (field, value) => {
    let isError = false;
  
    if (typeof value === 'string') {
      // For string values, check if it's an empty string after trimming
      isError = !value.trim();
    } else if (value === null || value === undefined) {
      // For null or undefined values, consider it an error
      isError = true;
    }
  
    setErrors((prevErrors) => ({ ...prevErrors, [field]: isError }));
  };
  const handleFieldClick = (field) => {
    handleResetError(field);
  };


  
  return (
    <div className='buildingInfoBg'>
     <Header />
      <div className={`buildinInfoContainer ${isArabic ? 'rtl' : ''}`} >
      <h1 className="headingInfo p-4">{t('buildingInfoHeader')}</h1>
    <div>
        <div className="card bg-white mb-3 shadow rounded border-0">
  <div className="p-3">
  <h1 className="subHeadings">{t('plotInfoHeader')}</h1>
  </div>
  <div className="card-body d-flex pb-5">
  
  {i18n.language === 'ar' ? (
  <CacheProvider value={cacheRtl}>
          <TextField
            id="plotNum"
            label={errors.plotNumber ? <span className="error-text">قم تصريح البناء {t('Required')}*</span> : t('plotNumberLabel')}
            variant="outlined"
            className={`form-control inputEl  ${errors.plotNumber ? 'error' : ''}`}
            value={plotNumber}
            onChange={handlePlotNumberChange}
            onBlur={() => handleBlur('plotNumber', plotNumber)}
            onClick={() => handleFieldClick('plotNumber')}
            style={{ marginLeft: '0.75rem' }}
            
          />

      <TextField
      id="krookie"
      label={errors.krookieNumber ? <span className="error-text">رقم الكروكي {t('Required')}*</span> : t('krookieNumberLabel')}
      variant="outlined"
      className={`form-control inputEl  ${errors.krookieNumber ? 'error' : ''}`}
      value={krookieNumber}
      onChange={handleKrookieChange}
      onBlur={() => handleBlur('krookieNumber', krookieNumber)}
      onClick={() => handleFieldClick('krookieNumber')}
      style={{ marginLeft: '0.75rem' }}
    />


    
      <TextField
      id="plotAdd"
      label={errors.plotAddress ? <span className="error-text">عنوان القطعة {t('Required')}*</span> : t('plotAddressLabel')}
      variant="outlined"
      className={`form-control inputEl  ${errors.plotAddress ? 'error' : ''}`}
      value={plotAddress}
      onChange={handlePlotAddressChange}
      onBlur={() => handleBlur('plotAddress', plotAddress)}
      onClick={() => handleFieldClick('plotAddress')}
      style={{ marginLeft: '0.75rem' }}
    />


  
    </CacheProvider>

  ):(
    <>
    <TextField
          id="plotNum"
          label={errors.plotNumber ? <span className="error-text">*Building Permit Number {t('Required')}</span> : t('plotNumberLabel')}
          variant="outlined"
          className={`form-control inputEl  ${errors.plotNumber ? 'error' : ''}`}
          value={plotNumber}
          onChange={handlePlotNumberChange}
          onBlur={() => handleBlur('plotNumber', plotNumber)}
          onClick={() => handleFieldClick('plotNumber')}
          
        />

     <TextField
      id="krookie"
      label={errors.krookieNumber ? <span className="error-text">*KROOKIE Number {t('Required')}</span> : t('krookieNumberLabel')}
      variant="outlined"
      className={`form-control inputEl ${errors.krookieNumber ? 'error' : ''}`}
      value={krookieNumber}
      onChange={handleKrookieChange}
      onBlur={() => handleBlur('krookieNumber', krookieNumber)}
      onClick={() => handleFieldClick('krookieNumber')}
      style={{ marginLeft: '0.75rem' }}
    />


    <TextField
      id="plotAdd"
      label={errors.plotAddress ? <span className="error-text">*Plot Address {t('Required')}</span> : t('plotAddressLabel')}
      variant="outlined"
      className={`form-control inputEl ${errors.plotAddress ? 'error' : ''}`}
      value={plotAddress}
      onChange={handlePlotAddressChange}
      onBlur={() => handleBlur('plotAddress', plotAddress)}
      onClick={() => handleFieldClick('plotAddress')}
      style={{ marginLeft: '0.75rem' }}
    />


    </>
      )}
  </div>
</div>

    
     </div>
 

     
        <div className='plotConstructionContainer'>
        <div className="card bg-white m-3 shadow rounded border-0 ">
        <div className="p-3">
        <h1 className="subHeadings">{t('constructionDetailsHeader')}</h1>
        </div>
        <div className="card-body">
        {i18n.language === 'ar' ? (
      <CacheProvider value={cacheRtl}>
      <TextField
      labelId="advertisement-label"
      id="advertisement"
      select
      value={advertisementType}
      onChange={handleAdvertisementTypeChange}
      label={errors.advertisementType ? <span className="error-text">نوع الإعلان {t('Required')}*</span> : t('advertisementTypeLabel')}
      variant="outlined"
      className={`form-control inputEl mb-3 ${errors.advertisementType ? 'error' : ''}`}
      style={{ width: '100%', marginTop: '15px' }}
      onBlur={() => handleBlur('advertisementType', advertisementType)}
      onMouseDown={() => handleFieldClick('advertisementType')}
    >
      {advertisementTypes.map((option) => (
        <MenuItem key={option.value} value={option.value} className={`${isArabic ? 'rtl' : ''}`}>
        {t(option.value)}
        </MenuItem>
      ))}
    </TextField>
    </CacheProvider>
        ):(
          <>
          <TextField
      labelId="advertisement-label"
      id="advertisement"
      select
      value={advertisementType}
      onChange={handleAdvertisementTypeChange}
      label={errors.advertisementType ? <span className="error-text">*Advertisement Type {t('Required')}</span> : t('advertisementTypeLabel')}
      variant="outlined"
      className={`form-control inputEl mb-3 ${errors.advertisementType ? 'error' : ''}`}
      style={{ width: '100%', marginTop: '15px' }}
      onBlur={() => handleBlur('advertisementType', advertisementType)}
      onMouseDown={() => handleFieldClick('advertisementType')}
    >
      {advertisementTypes.map((option) => (
        <MenuItem key={option.value} value={option.value}>
        {t(option.value)}
        </MenuItem>
      ))}
    </TextField>
          </>
        )}
  
        </div>
        <div className='constructionStagesContainer'>
        
        <div className="d-flex justify-content-between align-items-center p-3">
        <h1 className="subHeadings mb-0">{t('stagesHeader')}</h1>
    
        <button type="button" className="p-2 buttonAdd" onClick={handleAddStage}>
                {t('addStageButton')}
              </button>

</div>

   
<Scrollbars style={{ height: '200px'}} autoHide autoHideTimeout={100} autoHideDuration={100}>
    {constructionStages.map((stage) => (
      <div key={stage} className="m-3 mb-0 d-flex align-items-center">
      {i18n.language === 'ar' ? (
        <CacheProvider value={cacheRtl}>
      <TextField
      select
      value={selectedValues[stage] || ''}
      onChange={(e) => handleStageChange(stage, e.target.value)}
      label={errors[stage] ? <span className="error-text">{t('Required')}</span> : t('stagesHeader')}
      variant="outlined"
      className={`form-control inputEl m-2 ${errors[stage] ? 'error' : ''}`}
      style={{ width: '100%', marginTop: '15px' }}
      onBlur={() => handleBlur(stage, selectedValues[stage])}
      onMouseDown={() => handleFieldClick(stage)}
    >
      {stageOptions.map((option) => (
        <MenuItem key={option} value={option} className={`${isArabic ? 'rtl' : ''}`}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
    </CacheProvider>
      ):(
        <>
        <TextField
      select
      value={selectedValues[stage] || ''}
      onChange={(e) => handleStageChange(stage, e.target.value)}
      label={errors[stage] ? <span className="error-text">{t('Required')}</span> : t('stagesHeader')}
      variant="outlined"
      className={`form-control inputEl m-2 ${errors[stage] ? 'error' : ''}`}
      style={{ width: '100%', marginTop: '15px' }}
      onBlur={() => handleBlur(stage, selectedValues[stage])}
      onMouseDown={() => handleFieldClick(stage)}
    >
      {stageOptions.map((option) => (
        <MenuItem key={option} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
        </>
      )}
        <button
          type="button"
          className="ml-3 mb-1 btn mt-1"
          onClick={() => handleDeleteStage(stage)}
        >
          <i className="fas fa-minus-circle red-icon"></i>
        </button>
      </div>
    ))}
  </Scrollbars>

  </div>
        </div>
 
  

     <div className="card bg-white m-3 shadow rounded border-0">
        <div className='buildingDetailsContainer'>
        <div className="d-flex justify-content-between align-items-center p-3">
        <h1 className="subHeadings mb-0">{t('buildingsDetailsHeader')}</h1>
            <button type="button" className="p-2 buttonAdd" onClick={handleAddBuildingStage}>
              {t('addBuildingButton')}
            </button>
         </div>
        
         <div className="card-body">
         <div className="table-responsive">
         <Scrollbars style={{ height: '200px' }} autoHide autoHideTimeout={100} autoHideDuration={100}>
                <table className="table table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th  style={{ color: '#6c757d' }}>{t('buildingNumberLabel')}</th>
                      <th  style={{ color: '#6c757d' }}>{t('totalSizeLabel')}</th>
                      <th  style={{ color: '#6c757d' }}>{t('numberOfFloorsLabel')}</th>
                      <th  style={{ color: '#6c757d' }}>{t('deleteLabel')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buildingData.map((building, index) => (
                      <tr key={index}>
                         <input
                          type="text"
                          className="no-outline-input"
                          value={building.buildingNumber}
                          onChange={(e) => handleInputChange(index, 'buildingNumber', e.target.value)}
                          />
                        <td>
                          <input
                            type="text"
                            className="no-outline-input"
                            value={building.totalSize}
                            onChange={(e) => handleInputChange(index, 'totalSize', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="no-outline-input"
                            value={building.numberOfFloors}
                            onChange={(e) => handleInputChange(index, 'numberOfFloors', e.target.value)}
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn"
                            onClick={() => handleDeleteBuilding(index)}
                          >
                            <i className="fas fa-minus-circle red-icon"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Scrollbars>
        </div>
      </div>
      </div>
      </div>

      </div>

      <div style={{ marginBottom: '28px' }}></div>
      <div className='nextButtonCont'> 
      <button className="buttonAdd w-40 p-2" onClick={handleNextButtonClick}>
            {t('nextButton')}
          </button>
      </div>
   
      <DraggableDialog
          open={showModal}
          onClose={() => setShowModal(false)}
          allFieldsFilled={!confirmationDialog}
        />

        <DraggableDialog
          open={confirmationDialog}
          onClose={() => setConfirmationDialog(false)}
          allFieldsFilled={false}
        />
</div>
</div>
   
)};

export default ChBuildingInfo;
