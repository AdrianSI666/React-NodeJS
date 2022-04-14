import { Button } from 'react-bootstrap'
import React from 'react';
import { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import {Modal, Form} from 'react-bootstrap'
function RecipesList({ recipes,deleteRecipe,setRecipe }) {
    const [modalShow, setModalShow] = React.useState(false);
    const [id, setId] = useState(0);
    const [nazwa, setNazwa] = useState("")
    const [skladniki, setSkladniki] = useState("")
    const [przepis, setPrzepis] = useState("")
    const renderRecipe = recipes.map(recipe => {
        return (    <>
                        <Accordion defaultActiveKey={['0']} alwaysOpen>
                        <Accordion.Item eventKey={recipe.id}>
                            <Accordion.Header>{recipe.nazwa}</Accordion.Header>
                            <Accordion.Body>
                            <p>
                                Skladniki:
                            </p>
                            <p>
                                {recipe.skladniki}
                            </p>
                            <p>
                                Przepis:
                            </p>
                            <p>
                                {recipe.przepis}
                            </p>
                            <Button variant='success' onClick={(e) => {
                                setModalShow(true)
                                setId(recipe.id)
                                setNazwa(recipe.nazwa)
                                setSkladniki(recipe.skladniki)
                                setPrzepis(recipe.przepis)
                                }}>
                            Edytuj</Button>
                            <Button variant='danger' onClick={
                                (e) => {
                                    deleteRecipe(e, recipe.id);
                                  }
                                }>
                                    Usun
                            </Button>
                            </Accordion.Body>
                        </Accordion.Item>
                        </Accordion>
                        <Modal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            >
                            <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Modyfikowanie przepisu
                            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <Form onSubmit={(e) => {
                            setRecipe(e, id, nazwa, skladniki, przepis);
                            setModalShow(false);
                            }}>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Nazwa</Form.Label>
                                <Form.Control value={nazwa} type="text" onChange={e => setNazwa(e.target.value)}  />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Skladniki</Form.Label>
                                <Form.Control value={skladniki} name="skladniki" as="textarea" rows="3" onChange={e => setSkladniki(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Przepis</Form.Label>
                                <Form.Control value={przepis} name="przepis" as="textarea" rows="3" onChange={e => setPrzepis(e.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Zmień
                            </Button>
                            </Form>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button onClick={()=>setModalShow(false)}>Zamknij</Button>
                            </Modal.Footer>
                        </Modal>
                    </>
        )
    })
 
    return (
        <div className="d-grid gap-2">
            {renderRecipe}
        </div>
    )
}
 
export default RecipesList