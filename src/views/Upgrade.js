// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   CardTitle,
//   Row,
//   Col,
//   Table,
//   Form,
//   FormGroup,
//   Input,
//   Button,
// } from 'reactstrap';

// function Qr_code() {
//   const [qrCodes, setQRCodes] = useState([]);
//   const [editingQRCode, setEditingQRCode] = useState(null);
//   const [qrCodeCount, setQRCodeCount] = useState(0);

//   useEffect(() => {
//     fetchQRCodes();
//   }, []);

//   const fetchQRCodes = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/qrcodes');
//       if (response.data.success) {
//         setQRCodes(response.data.data);
//         setQRCodeCount(response.data.data.length);
//       } else {
//         console.error('API request was not successful:', response.data.errors);
//       }
//     } catch (error) {
//       console.error('Error fetching QR codes:', error);
//     }
//   };

//   const createQRCode = async () => {
//     try {
//       const newQRCode = {
//         // Define the properties of a QR code from your form input fields
//       };

//       await axios.post('http://localhost:3000/qrcodes', newQRCode);
//       fetchQRCodes();
//       // Reset your form input fields here
//     } catch (error) {
//       console.error('Error creating QR code:', error);
//     }
//   };

//   const updateQRCode = async () => {
//     try {
//       await axios.put(`http://localhost:3000/qrcodes/${editingQRCode.id}`, editingQRCode);
//       fetchQRCodes();
//       setEditingQRCode(null);
//     } catch (error) {
//       console.error('Error updating QR code:', error);
//     }
//   };

//   const deleteQRCode = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/qrcodes/${id}`);
//       fetchQRCodes();
//     } catch (error) {
//       console.error('Error deleting QR code:', error);
//     }
//   };

//   return (
//     <>
//       <div className="content">
//         <Row>
//           <Col md="12">
//             <Card>
//               <CardHeader>
//                 <CardTitle tag="h4">QR Codes</CardTitle>
//               </CardHeader>
//               <CardBody>
//                 <Form>
//                   <Row>
//                     <Col md="4">
//                       <FormGroup>
//                         <label>Property 1:</label>
//                         <Input
//                           type="text"
//                           name="property1"
//                           // Add an id attribute if needed
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col md="4">
//                       <FormGroup>
//                         <label>Property 2:</label>
//                         <Input
//                           type="text"
//                           name="property2"
//                           // Add an id attribute if needed
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col md="4">
//                       <Button
//                         className="btn-round"
//                         color="primary"
//                         onClick={createQRCode}
//                       >
//                         Create QR Code
//                       </Button>
//                     </Col>
//                   </Row>
//                 </Form>
//                 <CardFooter>
//                   <div>Total QR codes: {qrCodeCount}</div>
//                 </CardFooter>
//                 <Table responsive>
//                   <thead className="text-primary">
//                     <tr>
//                       <th>Property 1</th>
//                       <th>Property 2</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {qrCodes.map((qrCode) => (
//                       <tr key={qrCode.id}>
//                         <td>{qrCode.property1}</td>
//                         <td>{qrCode.property2}</td>
//                         <td>
//                           <Button
//                             color="success"
//                             onClick={() => setEditingQRCode(qrCode)}
//                           >
//                             Edit
//                           </Button>{' '}
//                           <Button
//                             color="danger"
//                             onClick={() => deleteQRCode(qrCode.id)}
//                           >
//                             Delete
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </CardBody>
//               {editingQRCode && (
//                 <CardFooter>
//                   <Form>
//                     <Row>
//                       <Col md="4">
//                         <FormGroup>
//                           <label>Edit Property 1:</label>
//                           <Input
//                             type="text"
//                             name="property1"
//                             value={editingQRCode.property1}
//                             onChange={(e) =>
//                               setEditingQRCode({
//                                 ...editingQRCode,
//                                 property1: e.target.value,
//                               })
//                             }
//                           />
//                         </FormGroup>
//                       </Col>
//                       <Col md="4">
//                         <FormGroup>
//                           <label>Edit Property 2:</label>
//                           <Input
//                             type="text"
//                             name="property2"
//                             value={editingQRCode.property2}
//                             onChange={(e) =>
//                               setEditingQRCode({
//                                 ...editingQRCode,
//                                 property2: e.target.value,
//                               })
//                             }
//                           />
//                         </FormGroup>
//                       </Col>
//                       <Col md="4">
//                         <Button
//                           className="btn-round"
//                           color="info"
//                           onClick={updateQRCode}
//                         >
//                           Update QR Code
//                         </Button>{' '}
//                         <Button
//                           className="btn-round"
//                           color="secondary"
//                           onClick={() => setEditingQRCode(null)}
//                         >
//                           Cancel
//                         </Button>
//                       </Col>
//                     </Row>
//                   </Form>
//                 </CardFooter>
//               )}
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// }

// export default Qr_code;
