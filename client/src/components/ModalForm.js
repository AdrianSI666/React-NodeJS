import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import {Button, Modal, Form} from 'react-bootstrap'
import React from "react";
function ModalForm(props, {addRecipes}) {
  const [nazwa, setNazwa] = useState("")
  const [skladniki, setSkladniki] = useState("")
  const [przepis, setPrzepis] = useState("")
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Dodanie przepisu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={(e) => {
                                addRecipes(e, nazwa, skladniki, przepis)
                              }}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Nazwa</Form.Label>
            <Form.Control value={nazwa} type="text" placeholder="Podaj nazwe" onChange={e => setNazwa(e.target.value)}  />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Skladniki</Form.Label>
            <Form.Control value={skladniki} name="skladniki" as="textarea" rows="3" placeholder="Podaj skladniki" onChange={e => setSkladniki(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Przepis</Form.Label>
            <Form.Control value={przepis} name="przepis" as="textarea" rows="3" placeholder="Podaj przepis" onChange={e => setPrzepis(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Dodaj
          </Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Zamknij</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  export default ModalForm;