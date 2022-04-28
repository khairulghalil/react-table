import React, {useState, useRef} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableData from './TableData';
import { Button, Modal, Form, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ReactTable() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const addRowName = useRef()
    const addRowCal = useRef()
    const addRowFat = useRef()
    const addRowCarb = useRef()
    const addRowProt = useRef()
    const addRowPrice = useRef()
    const formRef = useRef()

    const [rows,editRows] = useState([
        createData('Frozen Yogurt', 159, 6.0, 24, 4.0, 3.99),
        createData('Ice Cream Sandwich', 237, 9.0, 37, 4.3, 4.99),
        createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
        createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
        createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
    ]);
    
    const addRowData = () => {
        var valid = true;
        const rowNameAdd = addRowName.current.value
        const rowCalAdd = addRowCal.current.value
        const rowFatAdd = addRowFat.current.value
        const rowCarbAdd = addRowCarb.current.value
        const rowProtAdd = addRowProt.current.value
        const rowPriceAdd = addRowPrice.current.value
        const form = formRef.current;

        const newData = createData(
            rowNameAdd, 
            parseFloat(rowCalAdd || 0), 
            parseFloat(rowFatAdd || 0), 
            parseFloat(rowCarbAdd || 0), 
            parseFloat(rowProtAdd || 0), 
            parseFloat(rowPriceAdd || 0)
        )

        if (!form.checkValidity()) {
            form.reportValidity()
            return
        } else {
            rows.map(row => {
                if (row.name === rowNameAdd) {
                    valid = false
                }
                return valid
            })
            
            if (valid === true) {
                editRows(rows => { return [...rows, newData] })
                setShow(false)
            } else {
                alert("This dessert name is already taken. \nPlease change your dessert name.")
                addRowName.current.value = null
            }
        }
    };

    function createData(name, calories, fat, carbs, protein, price) {
        return {
            name,
            calories,
            fat,
            carbs,
            protein,
            price,
            history: [
                { date: '2020-01-05', customerId: '11091700', amount: 3 },
                { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
            ],
        };
    } 
    
    function deleteData(dataName) {
        editRows(rows.filter(data => data.name !== dataName))
    }

    function updateData(updDataRow) {
        const updData =  createData(
                            updDataRow.name, 
                            parseFloat(updDataRow.calories), 
                            parseFloat(updDataRow.fat), 
                            parseFloat(updDataRow.carbs), 
                            parseFloat(updDataRow.protein), 
                            parseFloat(updDataRow.price)
                        )

        var indexx = rows.findIndex(row => row.name === updData.name)
        let updRow = [...rows]; 
        updRow[indexx] = updData; 
        editRows(updRow)
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell />
                            <TableCell style={{fontWeight: 'bold'}}>Dessert (100g serving)</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Calories</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Fat (g)</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Carbs (g)</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Protein (g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        < TableData rows = {rows} deleteData = {deleteData} updateData = {updateData}/>
                    </TableBody>
                </Table>
            </TableContainer>
            
            <div className="m-4" style={{display: 'flex', justifyContent:'flex-end'}}>
                <Button variant="primary" size="sm" style={{minWidth: "120px"}} onClick={handleShow}>Add New</Button>
            </div>
            
            <Modal show={show} onHide={handleClose} centered size="lg" id="modalView">
                <Modal.Header style={{backgroundColor: "#59949e"}}>
                    <Modal.Title style={{color: "white"}}><strong>Add New Data</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="modalForm" ref={formRef}>
                        <Form.Group className="mb-3 mt-3">
                            <Row className="mb-2">
                                <Col xs={3}><Form.Label><strong>Dessert</strong></Form.Label></Col>
                                <Col xs={2}><Form.Label><strong>:</strong></Form.Label></Col>
                                <Col><Form.Control type="input" size="sm" ref={addRowName} placeholder="Dessert" required/></Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={3}><Form.Label><strong>Calories</strong></Form.Label></Col>
                                <Col xs={2}><Form.Label><strong>:</strong></Form.Label></Col>
                                <Col><Form.Control type="number" size="sm" ref={addRowCal} placeholder="Calories" /></Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={3}><Form.Label><strong>Fat (g)</strong></Form.Label></Col>
                                <Col xs={2}><Form.Label><strong>:</strong></Form.Label></Col>
                                <Col><Form.Control type="number" size="sm" ref={addRowFat} placeholder="Fat (g)" /></Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={3}><Form.Label><strong>Carbs (g)</strong></Form.Label></Col>
                                <Col xs={2}><Form.Label><strong>:</strong></Form.Label></Col>
                                <Col><Form.Control type="number" size="sm" ref={addRowCarb} placeholder="Carbs (g)" /></Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={3}><Form.Label><strong>Protein (g)</strong></Form.Label></Col>
                                <Col xs={2}><Form.Label><strong>:</strong></Form.Label></Col>
                                <Col><Form.Control type="number" size="sm" ref={addRowProt} placeholder="Protein (g)" /></Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={3}><Form.Label><strong>Price</strong></Form.Label></Col>
                                <Col xs={2}><Form.Label><strong>:</strong></Form.Label></Col>
                                <Col><Form.Control type="number" size="sm" ref={addRowPrice} placeholder="Price" /></Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer> 
                    <Button variant="primary" size="sm" onClick={addRowData} className="btn" type="submit" >Add</Button>
                    <Button variant="secondary" size="sm" onClick={handleClose} className="btn">Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}