import React, { useState, useEffect, useRef }  from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import CandidatesTable from './CandidatesTable';
//import ReactBootstrapStyle from 'react-bootstrap/Internal';



export default function CandidatesPage() {



  
  const [candidateRequest, setCandidateRequest] = useState(null);
  const txtSkillsValue = useRef(null);
  
    // setTableData({data: [{ firstName: 'Mehmet', lastName: 'Baran', email: 1987, skills: 63 }]   });
  return(
    <>
    <h1 className="mt-5 mb-5">Candidates</h1>
    
      <Row className="d-flex flex-row-reverse">
            <Col className="p-2 col-sm-6">

            <InputGroup className="mb-3 " size="sm">
                <FormControl
                  ref={txtSkillsValue}
                  placeholder="Enter comma-separated skills"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                
                  
                />
                <InputGroup.Append>
                  <Button size="sm" onClick={() => {  setCandidateRequest(txtSkillsValue.current.value)  }}>Get Candidates</Button>
                </InputGroup.Append>
              </InputGroup>            
              
                
            </Col> 
    </Row>
    <Row className="d-flex flex-row">
            <Col className="p-2">
                <CandidatesTable candidatesSkills={candidateRequest} />
            </Col> 
    </Row>
    
    
    </>
    
    )  
}