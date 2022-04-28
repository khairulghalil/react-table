import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button, Modal, Form, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style.css';

export default function TableData({rows, deleteData, updateData}) {
    const delItem = useRef()
    const rowName = useRef()
    const rowCal = useRef()
    const rowFat = useRef()
    const rowCarb = useRef()
    const rowProt = useRef()
    
    const useRowStyles = makeStyles({
        root: {
            '& > *': {
                borderBottom: 'unset',
            },
        },
    });

    function RowItem(props) {
        const { rowData } = props;
        const [open, setOpen] = React.useState(false);
        const classes = useRowStyles();
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const removeRowData = (event, rowData) => {
            deleteData(rowData.name);
        };

        const updateRowData = () => {
            const rowNameUpd = rowName.current.value
            const rowCalUpd = rowCal.current.value
            const rowFatUpd = rowFat.current.value
            const rowCarbUpd = rowCarb.current.value
            const rowProtUpd = rowProt.current.value
            const rowPrice = rowData.price;
            
            updateData({
                name: rowNameUpd, 
                calories: rowCalUpd || 0, 
                fat: rowFatUpd || 0, 
                carbs: rowCarbUpd || 0, 
                protein: rowProtUpd || 0, 
                price: rowPrice
            })
            setShow(false)
        };

        return (
            <>
                <React.Fragment>
                    <TableRow className={classes.root}>
                        <TableCell>
                            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </TableCell>
                        <TableCell>
                            <Button variant="warning" size="sm" className="btnForm btn" onClick={handleShow}>Edit</Button>
                            <Button variant="danger" size="sm" ref={delItem} className="btnForm btn" onClick={(e) => removeRowData(e, rowData)}>Delete</Button>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {rowData.name}
                        </TableCell>
                        <TableCell align="right">{rowData.calories}</TableCell>
                        <TableCell align="right">{rowData.fat}</TableCell>
                        <TableCell align="right">{rowData.carbs}</TableCell>
                        <TableCell align="right">{rowData.protein}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box margin={1}>
                                    <Typography variant="h6" gutterBottom component="div">
                                        History
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{fontWeight: 'bold'}}>Date</TableCell>
                                                <TableCell style={{fontWeight: 'bold'}}>Customer</TableCell>
                                                <TableCell style={{fontWeight: 'bold'}} align="right">Amount</TableCell>
                                                <TableCell style={{fontWeight: 'bold'}} align="right">Total price ($)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rowData.history.map((historyRow) => (
                                            <TableRow key={historyRow.date}>
                                                <TableCell component="th" scope="row">
                                                    {historyRow.date}
                                                </TableCell>
                                                <TableCell>{historyRow.customerId}</TableCell>
                                                <TableCell align="right">{historyRow.amount}</TableCell>
                                                <TableCell align="right">
                                                {Math.round(historyRow.amount * rowData.price * 100) / 100}
                                                </TableCell>
                                            </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </React.Fragment>
            <Modal show={show} onHide={handleClose} centered size="lg" id="modalView">
                <Modal.Header style={{backgroundColor: "#59949e"}}>
                    <Modal.Title style={{color: "white"}}><strong>Update Data</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="modalForm">
                        <Form.Group className="mb-3 mt-3">
                            <Row className="mb-2">
                                <Col xs={3}><Form.Label><strong>Dessert</strong></Form.Label></Col>
                                <Col xs={2}><Form.Label><strong>:</strong></Form.Label></Col>
                                <Col><Form.Control type="input" size="sm" ref={rowName} placeholder="Dessert" value={rowData.name} readOnly/></Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={3}><Form.Label><strong>Calories</strong></Form.Label></Col>
                                <Col xs={2}><Form.Label><strong>:</strong></Form.Label></Col>
                                <Col><Form.Control type="number" size="sm" ref={rowCal} placeholder="Calories" defaultValue={rowData.calories}/></Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={3}><Form.Label><strong>Fat (g)</strong></Form.Label></Col>
                                <Col xs={2}><Form.Label><strong>:</strong></Form.Label></Col>
                                <Col><Form.Control type="number" size="sm" ref={rowFat} placeholder="Fat (g)" defaultValue={rowData.fat}/></Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={3}><Form.Label><strong>Carbs (g)</strong></Form.Label></Col>
                                <Col xs={2}><Form.Label><strong>:</strong></Form.Label></Col>
                                <Col><Form.Control type="number" size="sm" ref={rowCarb} placeholder="Carbs (g)" defaultValue={rowData.carbs}/></Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={3}><Form.Label><strong>Protein (g)</strong></Form.Label></Col>
                                <Col xs={2}><Form.Label><strong>:</strong></Form.Label></Col>
                                <Col><Form.Control type="number" size="sm" ref={rowProt} placeholder="Protein (g)" defaultValue={rowData.protein}/></Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer> 
                    <Button variant="primary" size="sm" onClick={updateRowData} className="btn">Update</Button>
                    <Button variant="secondary" size="sm" onClick={handleClose} className="btn">Cancel</Button>
                </Modal.Footer>
            </Modal>
          </>
        );
    }
      
    RowItem.propTypes = {
        rowData: PropTypes.shape({
            calories: PropTypes.number.isRequired,
            carbs: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            history: PropTypes.arrayOf(
                PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                }),
            ).isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            protein: PropTypes.number.isRequired,
        }).isRequired,
    };

    return (
        rows.map((rowData) => (
            <RowItem key={rowData.name} rowData={rowData} />
        ))
    );
}