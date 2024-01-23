import React, { useState } from 'react';
import DraggableDialog from '../DailogueBox';
import { Scrollbars } from 'react-custom-scrollbars';
import TextField from '@mui/material/TextField';
import {  MenuItem, } from '@material-ui/core';

import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

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

const consultantList=[
  {
    id:1,
    consultantCode:55,
    consultantName:'Syed'
  },
  {
    id:2,
    consultantCode:56,
    consultantName:'Suhail'
  },
  {
    id:3,
  consultantCode:57,
    consultantName:'Rehan'
  },
  {
    id:4,
  consultantCode:58,
    consultantName:'Roshan'
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

const ChBuildingInfo = () => {
  const [plotNumber,setPlotNumber]=useState('')
  const [krookieNumber, setKrookieNumber] = useState('');
  const [plotAddress, setPlotAddress] = useState('');
  const [consultantCode, setConsultantCode] = useState('');
  const [consultantName, setConsultantName] = useState('');
  const [advertisementType, setAdvertisementType] = useState('');
  const [constructionStages, setConstructionStages] = useState([1, 2]); 
  const [selectedValues, setSelectedValues] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState(false);


  const [buildingData, setBuildingData] = useState([
    { buildingNumber: '1', totalSize: '', numberOfFloors: '' },
    { buildingNumber: '2', totalSize: '', numberOfFloors: '' },
   
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

  const handleConsultantCodeChange = (event) => {

    const enteredConsultantCode = event.target.value;
    setConsultantCode(enteredConsultantCode);
    handleResetError('consultantCode');
    const suggestion = consultantList.find(item => item.consultantCode.toString() === enteredConsultantCode);

    if (suggestion) {
      setConsultantName(suggestion.consultantName);
      handleResetError('consultantName')
    
    } else {
      setConsultantName('');
     
    }
  };


  const handleConsultantNameChange = (event) => {
    setConsultantName(event.target.value);
    handleResetError('consultantName');
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
      { buildingNumber: `${prevData.length + 1}`, totalSize: '', numberOfFloors: '' },
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
      consultantCode,
      consultantName,
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
    <div className="buildingInfoBg">
      <div className="buildinInfoContainer">
        <h1 className="headingInfo p-4">Customer House Building Information</h1>
      <div className='plotConstructionContainer'>
        <div className="card bg-light mb-3">
  <div className="card-header p-3">
    <h1 className="subHeadings">Plot Information</h1>
  </div>
  <div className="card-body">
  <TextField
          id="plotNum"
          label={errors.plotNumber ? <span className="error-text"> *  Required</span> : 'Plot Number'}
          variant="outlined"
          className={`form-control inputEl mb-3 ${errors.plotNumber ? 'error' : ''}`}
          value={plotNumber}
          onChange={handlePlotNumberChange}
          onBlur={() => handleBlur('plotNumber', plotNumber)}
          onClick={() => handleFieldClick('plotNumber')}
        />

        <TextField
          id="krookie"
          label={errors.krookieNumber ? <span className="error-text">*Required</span> : 'KROOKIE Number'}
          variant="outlined"
          className={`form-control inputEl mb-3 ${errors.krookieNumber ? 'error' : ''}`}
          value={krookieNumber}
          onChange={handleKrookieChange}
          onBlur={() => handleBlur('krookieNumber', krookieNumber)}
          onClick={() => handleFieldClick('krookieNumber')}
        />

        <TextField
          id="plotAdd"
          label={errors.plotAddress ? <span className="error-text">*Required</span> : 'Plot Address'}
          variant="outlined"
          className={`form-control inputEl mb-3 ${errors.plotAddress ? 'error' : ''}`}
          value={plotAddress}
          onChange={handlePlotAddressChange}
          onBlur={() => handleBlur('plotAddress', plotAddress)}
          onClick={() => handleFieldClick('plotAddress')}
        />

        <TextField
          id="consultant"
          label={errors.consultantCode ? <span className="error-text">*Required</span> : 'Consultant Code'}
          variant="outlined"
          className={`form-control inputEl mb-3 ${errors.consultantCode ? 'error' : ''}`}
          value={consultantCode}
          onChange={handleConsultantCodeChange}
          onBlur={() => handleBlur('consultantCode', consultantCode)}
          onClick={() => handleFieldClick('consultantCode')}
        />

        <TextField
          id="consultantName"
          label={errors.consultantName ? <span className="error-text">*Required</span> : 'Consultant Name'}
          variant="outlined"
          className={`form-control inputEl ${errors.consultantName ? 'error' : ''}`}
          value={consultantName}
          onChange={handleConsultantNameChange}
          onBlur={() => handleBlur('consultantName', consultantName)}
          onClick={() => handleFieldClick('consultantName')}
        />
  </div>
</div>

    <div className="card bg-light mb-3">
        <div className="card-header p-3">
        <h1 className="subHeadings">Construction Details</h1>
        </div>
        <div className="card-body">
        <TextField
        labelId="advertisement-label"
  id="advertisement"
  select
  value={advertisementType}
  onChange={handleAdvertisementTypeChange}
  label={errors.advertisementType ? <span className="error-text">*Required</span> : 'Advertisement Type'}
  variant="outlined"
  className={`form-control inputEl mb-3 ${errors.advertisementType ? 'error' : ''}`}
  style={{ width: '100%', marginTop: '15px' }}
  onBlur={() => handleBlur('advertisementType', advertisementType)}
  onMouseDown={() => handleFieldClick('advertisementType')}
      >
        {advertisementTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
  
        </div>

       
        
        <div className='constructionStagesContainer'>
        
        <div className="card-header d-flex justify-content-between align-items-center p-3">
    <h1 className="subHeadings mb-0">Stages</h1>
    
    <button type="button" className="p-2 buttonAdd" onClick={handleAddStage}>
        Add
    </button>
</div>

   
       <Scrollbars style={{height: '200px' }}>
        {constructionStages.map((stage) => (
  <div key={stage} className="m-3 mb-0 d-flex align-items-center">
    <TextField
      select
      value={selectedValues[stage] || ''}
      onChange={(e) => handleStageChange(stage, e.target.value)}
      label={errors[stage] ? <span className="error-text">*Required</span> : 'Stage'}
      variant="outlined"
      className={`form-control inputEl m-2 ${errors[stage] ? 'error' : ''}`}
      style={{ width: '100%', marginTop: '15px' }}
      onBlur={() => handleBlur(stage, selectedValues[stage])}
      onMouseDown={() => handleFieldClick(stage)}
    >
      {stageOptions.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
      
    </TextField>
    
    <button
      type='button'
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
     </div>
     







     <div className="card bg-light mb-3">
        <div className='buildingDetailsContainer'>
        <div className="card-header d-flex justify-content-between align-items-center p-3">
    <h1 className="subHeadings mb-0">Buildings Details </h1>
        <button type="button" className="p-2 buttonAdd" onClick={handleAddBuildingStage}>
              Add
            </button>
         </div>
        
         <div className="card-body">
         <div className="table-responsive">
         <Scrollbars style={{height: '200px' }}>
        <table className="table table-bordered">
    <thead className="thead-light"> 
      <tr>
        <th>Building Number</th>
        <th>Total Size</th>
        <th>Number of Floors</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
   
    {buildingData.map((building, index) => (
            <tr key={index}>
              <td>{building.buildingNumber}</td>
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
          <i class="fas fa-minus-circle red-icon"></i>
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




      <div className='nextButtonCont'>       
        <button  className="buttonAdd w-40 p-2" onClick={handleNextButtonClick}>
              Next
            </button>
      </div>
   
      <DraggableDialog
        open={showModal}
        onClose={() => setShowModal(false)}
        allFieldsFilled={!confirmationDialog} // Pass the appropriate flag
      />
    
      <DraggableDialog
        open={confirmationDialog}
        onClose={() => setConfirmationDialog(false)}
        allFieldsFilled={false} // Pass the appropriate flag
      />
</div>
</div>
   
)};

export default ChBuildingInfo;
