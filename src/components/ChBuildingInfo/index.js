import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DraggableDialog from '../DailogueBox';
import { Scrollbars } from 'react-custom-scrollbars';
import TextField from '@mui/material/TextField';
import { MenuItem, } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import Header from '../Header';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { styled, useTheme } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';



const suggestionList = [
  {
    id: 1,
    krookieNumber: 'CV-2356',
    plotAddress: 'kadiri'

  },
  {
    id: 2,
    krookieNumber: 'CV-2357',
    plotAddress: 'Hyderabad'
  },
  {
    id: 3,
    krookieNumber: 'CV-2358',
    plotAddress: 'Bangalore'
  },
  {
    id: 4,
    krookieNumber: 'CV-2359',
    plotAddress: 'Mumbai'
  },

]


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300], // You can adjust the shade of gray (e.g., grey[100], grey[200], grey[300], etc.)
  color: theme.palette.common.black,
  fontWeight: 'bold',
  fontSize: 16,
  border: `1px solid ${theme.palette.grey[400]}`
}));



const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});



const ChBuildingInfo = () => {
  const [plotNumber, setPlotNumber] = useState('')
  const [systemId, setSystemId] = useState('');
  const [krookieNumber, setKrookieNumber] = useState('');
  const [plotAddress, setPlotAddress] = useState('');
  const [fullAddresses, setFullAddresses] = useState([]);
  const [advertisementType, setAdvertisementType] = useState('');
  const [advertisementTypes, setAdvertisementTypes] = useState([]);
  const [constructionStages, setConstructionStages] = useState([1]);
  const [stageOptions, setStageOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState(false);

  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [buildingData, setBuildingData] = useState([
    { buildingNumber: '', totalSize: '', numberOfFloors: '' },
  


  ]);
  const theme = useTheme();


  const [errors, setErrors] = useState({
    plotNumber: false,
    krookieNumber: false,
    plotAddress: false,
    consultantCode: false,
    consultantName: false,
    advertisementType: false,

  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://it7863:8080/api/v1/plot?bpnumber=${plotNumber}`);
        const data = await response.json();
        setKrookieNumber(data.krookie);
        setSystemId(data.systemId);
        //setPlotNumber(data.)
      } catch (error) {
        setKrookieNumber(''); //setPlotNumber('')
        setSystemId('');
        console.log('Error fetching data:', error);
      }
    };
    if (plotNumber !== '') {
      fetchData();
    }
  }, [plotNumber]);


  useEffect(() => {
    const fetchFullAddresses = async () => {
      try {
        if (systemId) {
          const response = await fetch(`http://it7863:8080/api/v1/plotaddress?systemid=${systemId}`);
          const data1 = await response.json();
          setFullAddresses(data1);
        }
      } catch (error) {
        console.log('Error fetching full addresses:', error);
      }
    };

    fetchFullAddresses();
  }, [systemId]);

  useEffect(() => {
    const fetchAdvertisementTypes = async () => {
      try {
        const response = await fetch('http://it7863:8080/api/v1/flexvalue/cpboardtypes');
        const data = await response.json();
        const types = data.map((item) => item.description);
        setAdvertisementTypes(types);
      } catch (error) {
        console.log('Error fetching advertisement types:', error);
      }
    };

    fetchAdvertisementTypes();
  }, []);

  useEffect(() => {
    const fetchConstructionStages = async () => {
      try {
        const response = await fetch('http://it7863:8080/api/v1/constructionstage');
        const data = await response.json();
        const stageDescs = data.map((item) => item.stageDesc);

        setStageOptions(stageDescs);
      } catch (error) {
        console.log('Error fetching construction stages:', error);
      }
    };

    fetchConstructionStages();
  }, []);


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
    const requiredFields = [plotNumber, krookieNumber, plotAddress, advertisementType];

    const emptyStages = constructionStages.some((stage) => !selectedValues[stage]);
    const emptyBuildingDetails = buildingData.some(
      (building) => !building.totalSize || !building.numberOfFloors
    );

    if (requiredFields.some((field) => field === '') || emptyStages || emptyBuildingDetails) {

      // Show the confirmation dialog with the "All the fields required" message
      setShowModal(false);
      setConfirmationDialog(true);


    } else {
      downloadJsonFile();
      console.log('Data to be sent to the server:', {
        plotNumber,
        krookieNumber,
        plotAddress,
        advertisementType,
        selectedValues,
        buildingData,
      });
      setPlotAddress('');
      setPlotNumber('');
      setConstructionStages([1]);
      setKrookieNumber('');
      setAdvertisementType([]);
      selectedValues({});
      setBuildingData([
        { buildingNumber: '', totalSize: '', numberOfFloors: '' },
      ]);
      // Toggle the state to show the main dialog
      setConfirmationDialog(false);
      setShowModal(true);

      // Log the data before sending it to the server


      // Assuming postDataToServer is a function that sends data to the server

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


  const downloadJsonFile = () => {
    // Create a JSON object
    const jsonData = {
      plotNumber,
      krookieNumber,
      plotAddress,
      advertisementType,
      selectedValues,
      buildingData,

    };

    // Convert JSON object to a string with formatting
    const jsonString = JSON.stringify(jsonData, null, 2);

    // Create Blob and download link
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'userData.json';
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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



  const formatSizeInput = (input) => {
    // Remove non-numeric characters and convert to number
    const numericValue = parseFloat(input.replace(/[^0-9.]/g, ''));
  
    // Check if the input is a valid number
    if (!isNaN(numericValue)) {
      // Format the number with commas for thousands
      return numericValue.toLocaleString();
    }
  
    // If input is not a valid number, return the original value
    return input;
  };


  return (
    <div className='buildingInfoBg'>
      <Header />
      <div className={`buildinInfoContainer ${isArabic ? 'rtl' : ''}`} >
        <h1 className="headingInfo p-4">{t('buildingInfoHeader')}</h1>
      
          <div className="card bg-white mb-3 shadow rounded border-0">
            <div className="p-3">
              <h1 className="subHeadings">{t('plotInfoHeader')}</h1>
            </div>
            <div className="card-body plotConstructionContainer d-flex pb-5">

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
                  />

                  <TextField
                    id="krookie"
                    label={errors.krookieNumber ? <span className="error-text">رقم الكروكي {t('Required')}*</span> : t('krookieNumberLabel')}
                    variant="outlined"
                    className={`form-control inputEl inputEl2 ${errors.krookieNumber ? 'error' : ''}`}
                    value={krookieNumber}
                    onChange={handleKrookieChange}
                    onBlur={() => handleBlur('krookieNumber', krookieNumber)}
                    onClick={() => handleFieldClick('krookieNumber')}


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
                    select
                  >
                    {fullAddresses.map((address) => (
                      <MenuItem key={address.instanceId} value={address.fullAddress}>
                        {address.fullAddress}
                      </MenuItem>
                    ))}

                  </TextField>

                </CacheProvider>

              ) : (
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
                    className={`form-control inputEl inputEl2 ${errors.krookieNumber ? 'error' : ''}`}
                    value={krookieNumber}
                    onChange={handleKrookieChange}
                    onBlur={() => handleBlur('krookieNumber', krookieNumber)}
                    onClick={() => handleFieldClick('krookieNumber')}

                  />

                  <TextField
                    id="plotAdd"
                    label={
                      errors.plotAddress ? (
                        <span className="error-text">*Plot Address Required</span>
                      ) : (
                        'Plot Address'
                      )
                    }
                    variant="outlined"
                    className={`form-control inputEl ${errors.plotAddress ? 'error' : ''}`}
                    value={plotAddress}
                    onChange={handlePlotAddressChange}
                    onBlur={() => handleBlur('plotAddress', plotAddress)}
                    onClick={() => handleFieldClick('plotAddress')}
                    select
                  >
                    {fullAddresses.map((address) => (
                      <MenuItem key={address.instanceId} value={address.fullAddress}>
                        {address.fullAddress}
                      </MenuItem>
                    ))}
                  </TextField>
                </>
              )}
            </div>
          
        </div>
        <div className='plotConstructionContainer'>
          <div className="card bg-white m-3 shadow rounded border-0 ">
            <div className="p-3">
              <h1 className="subHeadings mt-3">{t('constructionDetailsHeader')}</h1>
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
                    style={{ width: '100%', marginTop: '2px' }}
                    onBlur={() => handleBlur('advertisementType', advertisementType)}
                    onMouseDown={() => handleFieldClick('advertisementType')}
                  >
                    {advertisementTypes.map((option) => (
                      <MenuItem key={option} value={option} className={`${isArabic ? 'rtl' : ''}`}>
                        {t(option)}
                      </MenuItem>
                    ))}
                  </TextField>
                </CacheProvider>
              ) : (
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
                    style={{ width: '100%', marginTop: '2px' }}
                    onBlur={() => handleBlur('advertisementType', advertisementType)}
                    onMouseDown={() => handleFieldClick('advertisementType')}
                  >
                    {advertisementTypes.map((option) => (
                      <MenuItem key={option} value={option}>
                        {t(option)}
                      </MenuItem>
                    ))}
                  </TextField>
                </>
              )}

            </div>
            <div className='constructionStagesContainer' style={{ marginTop: '2px' }}>

              <div className="d-flex justify-content-between align-items-center p-3">
                <h1 className="subHeadings">{t('stagesHeader')}</h1>

                <button type="button" className="p-2 buttonAdd" onClick={handleAddStage}>
                  {t('addStageButton')}
                </button>

              </div>


              <Scrollbars style={{ height: '200px' }} autoHide autoHideTimeout={100} autoHideDuration={100}>
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
                    ) : (
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
                <button type="button" className="p-2 buttonAdd mt-2" onClick={handleAddBuildingStage}>
                  {t('addBuildingButton')}
                </button>
              </div>

              <div className="card-body">
                <div className="table-responsive" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: '100%' }} >
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell style={{ color: '#6c757d', fontWeight: 'bold', fontSize: '16px' }}>{t('buildingNumberLabel')}</StyledTableCell>
                            <StyledTableCell style={{ color: '#6c757d', fontWeight: 'bold', fontSize: '16px' }}>{t('totalSizeLabel')}</StyledTableCell>
                            <StyledTableCell style={{ color: '#6c757d', fontWeight: 'bold', fontSize: '16px' }}>{t('numberOfFloorsLabel')}</StyledTableCell>
                            <StyledTableCell style={{ color: '#6c757d', fontWeight: 'bold', fontSize: '16px' }}>{t('deleteLabel')}</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {buildingData.map((building, index) => (
                            <TableRow key={index}>
                            <TableCell style={{ border: `1px solid ${theme.palette.grey[400]}` }}>
                            <span>{index + 1}</span>
                                </TableCell>
                             
                             <TableCell style={{ border: `1px solid ${theme.palette.grey[400]}` }}> 
                                <Input
                                  type="text"
                                  className="no-outline-input"
                                  value={building.totalSize}
                                  onChange={(e) => handleInputChange(index, 'totalSize', formatSizeInput(e.target.value))}
                                  />
                                  </TableCell>  
                              <TableCell style={{ border: `1px solid ${theme.palette.grey[400]}` }}>
                                <Input
                                  type="text"
                                  className="no-outline-input"
                                  value={building.numberOfFloors}
                                  onChange={(e) => handleInputChange(index, 'numberOfFloors', e.target.value)}
                                />
                              </TableCell>
                              <TableCell style={{ border: `1px solid ${theme.palette.grey[400]}` }}>
                                <Button
                                  type="button"
                                  onClick={() => handleDeleteBuilding(index)}
                                >
                                  <i className="fas fa-minus-circle red-icon"></i>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                  </Paper>
                </div>
              </div>
            </div>
          </div>

        </div>

       <div className='nextButtonContainer'>
        <div style={{ marginBottom: '50px', textAlign: 'left' }}>
        <div className='nextButtonCont'style={{ float: 'right', marginTop: '10px', marginLeft:'20px'}}>
        <Link to="/">
        <button className="buttonAdd w-40 p-2">
          Back
        </button>
      </Link>
        </div>
        </div>



        <div style={{ marginBottom: '50px', textAlign: 'right' }}>
        <div className='nextButtonCont'style={{ float: 'right', marginTop: '10px',marginRight: '18px' }}>
          <button className="buttonAdd w-40 p-2" onClick={handleNextButtonClick}>
            {t('nextButton')}
          </button>
        </div>
        </div>
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

  )
};

export default ChBuildingInfo;
