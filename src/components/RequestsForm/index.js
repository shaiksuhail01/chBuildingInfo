import * as React from 'react';
import { useState } from 'react'; // Import useState hook
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from '../Header';
import Pagination from '@mui/material/Pagination';


const RequestsInfo = () => {
    const navigate = useNavigate();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1); // Initialize page to 1
    const rows = [
        { id: 1, description: 'Description 1', status: 'Completed' },
        { id: 2, description: 'Description 2', status: 'Partially Completed' },
        { id: 3, description: 'Description 1', status: 'Completed' },
        { id: 4, description: 'Description 2', status: 'Partially Completed' },
        { id: 5, description: 'Description 1', status: 'Completed' },
        { id: 6, description: 'Description 2', status: 'Partially Completed' },
        { id: 7, description: 'Description 1', status: 'Completed' },
        { id: 8, description: 'Description 2', status: 'Partially Completed' },
        { id: 9, description: 'Description 1', status: 'Completed' },
        { id: 10, description: 'Description 2', status: 'Partially Completed' },
        { id: 11, description: 'Description 1', status: 'Completed' },
        { id: 12, description: 'Description 1', status: 'Completed' },

        // Add more rows as needed
    ];
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            color: theme.palette.common.white,
            fontSize: 17, // Adjust the font size as needed
            fontWeight: 'bold', // Optionally adjust the font weight
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const handleNewRequest = () => {
        navigate('/building-info');
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    setRowsPerPage(10); 
    };

    const startIdx = (page - 1) * rowsPerPage;
    console.log(startIdx);
    const endIdx = Math.min(startIdx + rowsPerPage, rows.length);
    console.log(endIdx);

    const renderRows = () => {
        return rows.slice(startIdx, endIdx).map((row) => (
            <TableBody>
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                    1
                </StyledTableCell>
                <StyledTableCell align="left">Customer House Building Information Process Request</StyledTableCell>
                <StyledTableCell align="left">Completed</StyledTableCell>
                <StyledTableCell align="center">
                    <img src="/images/view.png" alt="viewImage" className="imageLogin" style={{ width: '30px', height: '30px' }} />
                    <img src="/images/print.png" alt="printImage" className="imageLogin" style={{ width: '25px', height: '25px', marginLeft: '10px' }} />
                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                    2
                </StyledTableCell>
                <StyledTableCell align="left">Customer House Building Information Process Request1</StyledTableCell>
                <StyledTableCell align="left">Partially Completed</StyledTableCell>
                <StyledTableCell align="center">
                    <img src="/images/edit.png" alt="loginImage" className="imageLogin" style={{ width: '35px', height: '35px' }} />
                    <img src="/images/view.png" alt="loginImage" className="imageLogin" style={{ width: '30px', height: '30px', marginLeft: '10px' }} />
                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                    3
                </StyledTableCell>
                <StyledTableCell align="left">Customer House Building Information Process Request2</StyledTableCell>
                <StyledTableCell align="left">Completed</StyledTableCell>
                <StyledTableCell align="center">

                    <img src="/images/view.png" alt="viewImage" className="imageLogin" style={{ width: '30px', height: '30px' }} />
                    <img src="/images/print.png" alt="printImage" className="imageLogin" style={{ width: '25px', height: '25px', marginLeft: '10px' }} />

                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                    4
                </StyledTableCell>
                <StyledTableCell align="left">Customer House Building Information Process Request3</StyledTableCell>
                <StyledTableCell align="left">Completed</StyledTableCell>
                <StyledTableCell align="center">
                    <img src="/images/view.png" alt="viewImage" className="imageLogin" style={{ width: '30px', height: '30px' }} />
                    <img src="/images/print.png" alt="printImage" className="imageLogin" style={{ width: '25px', height: '25px', marginLeft: '10px' }} />
                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                    5
                </StyledTableCell>
                <StyledTableCell align="left">Customer House Building Information Process Request4</StyledTableCell>
                <StyledTableCell align="left">Partially Completed</StyledTableCell>
                <StyledTableCell align="center">
                    <img src="/images/edit.png" alt="loginImage" className="imageLogin" style={{ width: '35px', height: '35px' }} />
                    <img src="/images/view.png" alt="loginImage" className="imageLogin" style={{ width: '30px', height: '30px', marginLeft: '10px' }} />
                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                    6
                </StyledTableCell>
                <StyledTableCell align="left">Customer House Building Information Process Request5</StyledTableCell>
                <StyledTableCell align="left">Completed</StyledTableCell>
                <StyledTableCell align="center">
                    <img src="/images/view.png" alt="viewImage" className="imageLogin" style={{ width: '30px', height: '30px' }} />
                    <img src="/images/print.png" alt="printImage" className="imageLogin" style={{ width: '25px', height: '25px', marginLeft: '10px' }} />
                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                    7
                </StyledTableCell>
                <StyledTableCell align="left">Customer House Building Information Process Request6</StyledTableCell>
                <StyledTableCell align="left">Partially Completed</StyledTableCell>
                <StyledTableCell align="center">
                    <img src="/images/edit.png" alt="loginImage" className="imageLogin" style={{ width: '35px', height: '35px' }} />
                    <img src="/images/view.png" alt="loginImage" className="imageLogin" style={{ width: '30px', height: '30px', marginLeft: '10px' }} />
                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                    8
                </StyledTableCell>
                <StyledTableCell align="left">Customer House Building Information Process Request7</StyledTableCell>
                <StyledTableCell align="left">Completed</StyledTableCell>
                <StyledTableCell align="center">

                    <img src="/images/view.png" alt="viewImage" className="imageLogin" style={{ width: '30px', height: '30px' }} />
                    <img src="/images/print.png" alt="printImage" className="imageLogin" style={{ width: '25px', height: '25px', marginLeft: '10px' }} />

                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                    9
                </StyledTableCell>
                <StyledTableCell align="left">Customer House Building Information Process Request8</StyledTableCell>
                <StyledTableCell align="left">Completed</StyledTableCell>
                <StyledTableCell align="center">
                    <img src="/images/view.png" alt="viewImage" className="imageLogin" style={{ width: '30px', height: '30px' }} />
                    <img src="/images/print.png" alt="printImage" className="imageLogin" style={{ width: '25px', height: '25px', marginLeft: '10px' }} />
                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                    10
                </StyledTableCell>
                <StyledTableCell align="left">Customer House Building Information Process Request9</StyledTableCell>
                <StyledTableCell align="left">Partially Completed</StyledTableCell>
                <StyledTableCell align="center">
                    <img src="/images/edit.png" alt="loginImage" className="imageLogin" style={{ width: '35px', height: '35px' }} />
                    <img src="/images/view.png" alt="loginImage" className="imageLogin" style={{ width: '30px', height: '30px', marginLeft: '10px' }} />
                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                    11
                </StyledTableCell>
                <StyledTableCell align="left">Customer House Building Information Process Request10</StyledTableCell>
                <StyledTableCell align="left">Partially Completed</StyledTableCell>
                <StyledTableCell align="center">
                    <img src="/images/edit.png" alt="loginImage" className="imageLogin" style={{ width: '35px', height: '35px' }} />
                    <img src="/images/view.png" alt="loginImage" className="imageLogin" style={{ width: '30px', height: '30px', marginLeft: '10px' }} />
                </StyledTableCell>
            </StyledTableRow>
        </TableBody>
        ));
    };

    //   const headerStyles = {
    //     backgroundColor: 'red',
    //   };
    return (
        <div className="buildingInfoBg d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Header />
            <div className="card bg-white mb-3 shadow rounded border-0 pb-2" style={{ maxWidth: '100%', height: '850px', marginTop: '50px', display: 'flex', padding: '40px', flexDirection: 'column' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="subHeadings" style={{ textAlign: 'left', fontSize: '2.5em', marginBottom: '0', marginTop: '5px' }}>Requests</h3>
                    <button className="buttonAdd" style={{ width: '8%', padding: '8px', fontSize: '1em' }} onClick={handleNewRequest}>
                        New Request
                    </button>        </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead style={{ backgroundImage: 'linear-gradient(to bottom right, #90b8cc,#9c9c9c)' }}>
                            <TableRow>
                                <StyledTableCell>S.No</StyledTableCell>
                                <StyledTableCell align="left">Request Description</StyledTableCell>
                                <StyledTableCell align="left">Status</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    1
                                </StyledTableCell>
                                <StyledTableCell align="left">Customer House Building Information Process Request</StyledTableCell>
                                <StyledTableCell align="left">Completed</StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src="/images/view.png" alt="viewImage" className="imageLogin" style={{ width: '30px', height: '30px' }} />
                                    <img src="/images/print.png" alt="printImage" className="imageLogin" style={{ width: '25px', height: '25px', marginLeft: '10px' }} />
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    2
                                </StyledTableCell>
                                <StyledTableCell align="left">Customer House Building Information Process Request1</StyledTableCell>
                                <StyledTableCell align="left">Partially Completed</StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src="/images/edit.png" alt="loginImage" className="imageLogin" style={{ width: '35px', height: '35px' }} />
                                    <img src="/images/view.png" alt="loginImage" className="imageLogin" style={{ width: '30px', height: '30px', marginLeft: '10px' }} />
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    3
                                </StyledTableCell>
                                <StyledTableCell align="left">Customer House Building Information Process Request2</StyledTableCell>
                                <StyledTableCell align="left">Completed</StyledTableCell>
                                <StyledTableCell align="center">

                                    <img src="/images/view.png" alt="viewImage" className="imageLogin" style={{ width: '30px', height: '30px' }} />
                                    <img src="/images/print.png" alt="printImage" className="imageLogin" style={{ width: '25px', height: '25px', marginLeft: '10px' }} />

                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    4
                                </StyledTableCell>
                                <StyledTableCell align="left">Customer House Building Information Process Request3</StyledTableCell>
                                <StyledTableCell align="left">Completed</StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src="/images/view.png" alt="viewImage" className="imageLogin" style={{ width: '30px', height: '30px' }} />
                                    <img src="/images/print.png" alt="printImage" className="imageLogin" style={{ width: '25px', height: '25px', marginLeft: '10px' }} />
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    5
                                </StyledTableCell>
                                <StyledTableCell align="left">Customer House Building Information Process Request4</StyledTableCell>
                                <StyledTableCell align="left">Partially Completed</StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src="/images/edit.png" alt="loginImage" className="imageLogin" style={{ width: '35px', height: '35px' }} />
                                    <img src="/images/view.png" alt="loginImage" className="imageLogin" style={{ width: '30px', height: '30px', marginLeft: '10px' }} />
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    6
                                </StyledTableCell>
                                <StyledTableCell align="left">Customer House Building Information Process Request5</StyledTableCell>
                                <StyledTableCell align="left">Completed</StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src="/images/view.png" alt="viewImage" className="imageLogin" style={{ width: '30px', height: '30px' }} />
                                    <img src="/images/print.png" alt="printImage" className="imageLogin" style={{ width: '25px', height: '25px', marginLeft: '10px' }} />
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    7
                                </StyledTableCell>
                                <StyledTableCell align="left">Customer House Building Information Process Request6</StyledTableCell>
                                <StyledTableCell align="left">Partially Completed</StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src="/images/edit.png" alt="loginImage" className="imageLogin" style={{ width: '35px', height: '35px' }} />
                                    <img src="/images/view.png" alt="loginImage" className="imageLogin" style={{ width: '30px', height: '30px', marginLeft: '10px' }} />
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    8
                                </StyledTableCell>
                                <StyledTableCell align="left">Customer House Building Information Process Request7</StyledTableCell>
                                <StyledTableCell align="left">Completed</StyledTableCell>
                                <StyledTableCell align="center">

                                    <img src="/images/view.png" alt="viewImage" className="imageLogin" style={{ width: '30px', height: '30px' }} />
                                    <img src="/images/print.png" alt="printImage" className="imageLogin" style={{ width: '25px', height: '25px', marginLeft: '10px' }} />

                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    9
                                </StyledTableCell>
                                <StyledTableCell align="left">Customer House Building Information Process Request8</StyledTableCell>
                                <StyledTableCell align="left">Completed</StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src="/images/view.png" alt="viewImage" className="imageLogin" style={{ width: '30px', height: '30px' }} />
                                    <img src="/images/print.png" alt="printImage" className="imageLogin" style={{ width: '25px', height: '25px', marginLeft: '10px' }} />
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    10
                                </StyledTableCell>
                                <StyledTableCell align="left">Customer House Building Information Process Request9</StyledTableCell>
                                <StyledTableCell align="left">Partially Completed</StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src="/images/edit.png" alt="loginImage" className="imageLogin" style={{ width: '35px', height: '35px' }} />
                                    <img src="/images/view.png" alt="loginImage" className="imageLogin" style={{ width: '30px', height: '30px', marginLeft: '10px' }} />
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    11
                                </StyledTableCell>
                                <StyledTableCell align="left">Customer House Building Information Process Request10</StyledTableCell>
                                <StyledTableCell align="left">Partially Completed</StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src="/images/edit.png" alt="loginImage" className="imageLogin" style={{ width: '35px', height: '35px' }} />
                                    <img src="/images/view.png" alt="loginImage" className="imageLogin" style={{ width: '30px', height: '30px', marginLeft: '10px' }} />
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination
                    count={Math.ceil(rows.length / rowsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    variant="outlined"
                    shape="rounded"
                    style={{ marginTop: '20px', marginBottom: '15px', alignSelf: 'center' }}
                />

            </div>
        </div>
    );
};

export default RequestsInfo;
