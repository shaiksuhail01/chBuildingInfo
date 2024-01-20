import React, { useState } from 'react';
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

const ChBuildingInfo = () => {
  const [plotNumber,setPlotNumber]=useState('')
  const [krookieNumber, setKrookieNumber] = useState('');
  const [plotAddress, setPlotAddress] = useState('');
  const [consultantCode, setConsultantCode] = useState('');
  const [consultantName, setConsultantName] = useState('');
  const [advertisementType, setAdvertisementType] = useState('');
  const [constructionStages, setConstructionStages] = useState([1, 2, 3]); 
  const [selectedValues, setSelectedValues] = useState({});

  const [buildingData, setBuildingData] = useState([
    { buildingNumber: '1', totalSize: '', numberOfFloors: '' },
    { buildingNumber: '2', totalSize: '', numberOfFloors: '' },
    { buildingNumber: '3', totalSize: '', numberOfFloors: '' },
  ]);

  const [showModal, setShowModal] = useState(false);

  const handleKrookieChange = (event) => {
    const enteredKrookieNumber = event.target.value;
    setKrookieNumber(enteredKrookieNumber);

    const suggestion = suggestionList.find(item => item.krookieNumber.toString() === enteredKrookieNumber);

    if (suggestion) {
      setPlotAddress(suggestion.plotAddress);
    
    } else {
      setPlotAddress('');
     
    }
  };

  const handlePlotNumberChange=(event)=>{
    setPlotNumber(event.target.value);
  };

  const handlePlotAddressChange = (event) => {
    setPlotAddress(event.target.value);
  };

  const handleConsultantCodeChange = (event) => {

    const enteredConsultantCode = event.target.value;
    setConsultantCode(enteredConsultantCode);

    const suggestion = consultantList.find(item => item.consultantCode.toString() === enteredConsultantCode);

    if (suggestion) {
      setConsultantName(suggestion.consultantName);
    
    } else {
      setConsultantName('');
     
    }
  };


  const handleConsultantNameChange = (event) => {
    setConsultantName(event.target.value);
  };

  const handleAdvertisementTypeChange = (event) => {
    setAdvertisementType(event.target.value);
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
      
      alert('Please fill in all the required fields');
    } else {
      
      setShowModal(true);
    }
  };
  
  const handleModalConfirmation = (confirmed) => {
    if (confirmed) {
      window.location.reload();
    } else {
    }


    setShowModal(false);
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


  
  return (
    <div className="buildingInfoBg">
      <div className="buildinInfoContainer">
        <h1 className="headingInfo p-4">Customer House Building Information</h1>
      
        <div className="card bg-light mb-3">
  <div className="card-header p-3">
    <h1 className="subHeadings">Plot Information</h1>
  </div>
  <div className="card-body">
    <label htmlFor="plotNum" className="label">
      Plot Number
    </label>
    <input
      type="text"
      className="form-control inputEl"
      id="plotNum"
      value={plotNumber}
      onChange={handlePlotNumberChange}
    />

    <label htmlFor="krookie" className="label">
      KROOKIE Number
    </label>
    <input
      type="text"
      className="form-control inputEl"
      id="krookie"
      value={krookieNumber}
      onChange={handleKrookieChange}
    />

    <label htmlFor="plotAdd" className="label">
      Plot Address
    </label>
    <input
      type="text"
      className="form-control inputEl"
      id="plotAdd"
      value={plotAddress}
      onChange={handlePlotAddressChange}
    />

    <label htmlFor="consultant" className="label">
      Consultant Code
    </label>
    <input
      type="text"
      className="form-control inputEl"
      id="consultant"
      value={consultantCode}
      onChange={handleConsultantCodeChange}
    />

    <label htmlFor="consultantName" className="label">
      Consultant Name
    </label>
    <input
      type="text"
      className="form-control inputEl"
      id="consultantName"
      value={consultantName}
      onChange={handleConsultantNameChange}
    />
  </div>
</div>

    <div className="card bg-light mb-3">
        <div className="card-header p-3">
        <h1 className="subHeadings">Construction Details</h1>
        </div>
        <div className="card-body">
        <label htmlFor="advertisement" className="label">Advertisement Type</label>
        <select className="form-control mb-2" id="advertisement" value={advertisementType}
            onChange={handleAdvertisementTypeChange}>
                            <option value="RadioAds">Radio Ads</option>
                            <option value="OnlineVideoAds">Online Video Ads</option>
                            <option value="EmailMarketing">Email Marketing</option>
                            <option value="Newspaper">Newspaper</option>
                            <option value="EventSponsorship">Event Sponsorship</option>
        </select>
        </div>
        </div>

        <div className="card bg-light mb-3">
        
        <div className='constructionStagesContainer'>
        
        <div className="card-header d-flex justify-content-between align-items-center p-3">
    <h1 className="subHeadings mb-0">Construction Stages</h1>
    
    <button type="button" className="p-2 buttonAdd" onClick={handleAddStage}>
        Add
    </button>
</div>

         
        <div className="card-body">

        
          
         {constructionStages.map((stage) => (
          <div key={stage} className="mb-2 d-flex align-items-center">
              <select key={stage} className="form-control mb-2"   value={selectedValues[stage] || ''} onChange={(e) => handleStageChange(stage, e.target.value)}>
                <option value="Stage1">Stage 1</option>
                <option value="Stage2">Stage 2</option>
                <option value="Stage3">Stage 3</option>
                <option value="Stage4">Stage 4</option>
              </select>
              <button
              type="button"
              className="ml-2 mb-2 btn"
              onClick={() => handleDeleteStage(stage)}
            >
            <i class="fas fa-minus-circle red-icon"></i>
            </button>
              </div>
            ))}
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
                  value={building.totalSize}
                  onChange={(e) => handleInputChange(index, 'totalSize', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
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
        </div>
      </div>
      </div>
      </div>
      <div className='nextButtonCont'>       
        <button  className="buttonAdd w-40 p-2" onClick={handleNextButtonClick}>
              Next
            </button>
      </div>
   

      <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmation</h5>
              <button type="button" className="close" onClick={() => handleModalConfirmation(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to save the info?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => handleModalConfirmation(false)}>
                No
              </button>
              <button type="button" className="btn btn-primary" onClick={() => handleModalConfirmation(true)}>
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>

      </div>
    </div>
</div>


   
)};

export default ChBuildingInfo;
