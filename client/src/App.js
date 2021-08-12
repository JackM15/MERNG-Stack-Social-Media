import { BrowserRouter as Router, Route } from "react-router-dom"

//css
import "semantic-ui-css/semantic.min.css"
import "./App.css"

//components
import MenuBar from "./components/MenuBar"

//semantic imports
import { Container } from "semantic-ui-react"

//pages
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"

function App() {
  return (
    <Router>
      <Container>
        <MenuBar />
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Container>
    </Router>
  )
}

export default App
