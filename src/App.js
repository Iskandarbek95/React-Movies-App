import React, {useState, useEffect} from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Home from "./components/Home/Home";
import Movies from "./components/Movies/Movies";
import NavBar from "./components/NavBar/NavBar";
import { ApiContext } from "./utils/ApiContext";

function App() {

  const [apiState, setApiState] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/trending/all/week?api_key=0818de05c9ad65582a0e308e69552133').then(res => {
      setApiState(res.data.results);
    })
  }, []);

  return (
    <BrowserRouter>
      <ApiContext.Provider value={{apiState, search, setSearch}} >
        <div className="App">
          <NavBar />
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/movies" component={Movies} />
            </Switch>
          </Container>
        </div>
      </ApiContext.Provider>
    </BrowserRouter>
  );
}

export default App;
