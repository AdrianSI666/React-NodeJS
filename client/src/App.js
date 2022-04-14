import {useEffect, useState} from 'react'
import RecipesList from './components/RecipesList'
import Header from './components/Header'
import axios from 'axios'
import style from './App.module.css'
import React from 'react'

import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Modal, Form} from 'react-bootstrap'

function App() {
 
  const [recipes, setRecipes] = useState([])
  const [modalShow, setModalShow] = React.useState(false);
  const [nazwa, setNazwa] = useState("")
  const [skladniki, setSkladniki] = useState("")
  const [przepis, setPrzepis] = useState("")
  useEffect(() => {
 
    axios.get('http://localhost:4000/recipes')
    .then(response => setRecipes(response.data))
    .catch(err => console.log(err))
 
  }, [])
 
  function addRecipe(e, nazwa, skladniki, przepis) {
    e.preventDefault()
    const newRecipe = {
      nazwa,
      skladniki,
      przepis
    }
    axios.post('http://localhost:4000/recipes', newRecipe)
    .then(response => setRecipes([...recipes, response.data]))
    .catch(err => console.log(err))
  }

  function deleteRecipe(e, id) {
    e.preventDefault()
    axios.delete('http://localhost:4000/recipes/'+id)
    .then(response => setRecipes(recipes.filter(item => item.id !== id)))
    .catch(err => console.log(err))
  }

  function setRecipe(e, id, nazwa, skladniki, przepis){
    e.preventDefault()
    const newRecipe = {
      nazwa,
      skladniki,
      przepis
    }
    axios.put('http://localhost:4000/recipes/'+id, newRecipe)
    .then(response =>{ recipes.forEach(recipe => {
      if(recipe.id===id){
        recipe.nazwa=nazwa
        recipe.skladniki=skladniki
        recipe.przepis=przepis
      }
    })
    setRecipes([...recipes])
  }
    )
    .catch(err => console.log(err))
  }
 
  return (
    <div className={style.App}>
      <Header name="przysmaki" />
      <div className="d-grid gap-2">
      <Button variant="success" onClick={(e) => {
        setModalShow(true);
      }}>
          Dodaj recepte
        </Button>
      </div>
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
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
          addRecipe(e, nazwa, skladniki, przepis);
          setModalShow(false);
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
          <Button onClick={()=>setModalShow(false)}>Zamknij</Button>
        </Modal.Footer>
      </Modal>
      
      <RecipesList recipes={recipes} deleteRecipe={deleteRecipe} setRecipe={setRecipe} />
 
    </div>
  );
}
 
export default App;