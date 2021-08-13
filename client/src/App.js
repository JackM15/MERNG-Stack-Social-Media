import { BrowserRouter as Router, Route } from "react-router-dom"

//Auth Provider
import { AuthProvider } from "./context/auth"

//Route that authorized users cant see (register and login mainly)
import AuthRoute from "./utils/AuthRoute"

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
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
