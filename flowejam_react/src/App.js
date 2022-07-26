import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {useState} from 'react'; 
import HomePage from './pages/HomePage';
import EditExercisePage from './pages/EditExercisePage';
import AddExercisePage from './pages/AddExercisePage';

function App() {
	const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>
        <div className="App-header">
			<header>
				<h1>Exercise List App</h1>
				<p>App for editing a list of exercises</p>
			</header>

			<nav>
				<Link to='/'>Home Page</Link> | <Link to='/add-exercises'>Add an exercise</Link>
			</nav>

          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit}/>
          </Route>

          <Route path="/edit-exercises" exact>
            <EditExercisePage exerciseToEdit={exerciseToEdit}/>
          </Route>

          <Route path="/add-exercises" exact>
            <AddExercisePage />
          </Route>

			<footer>
				<p>© 2022 flowejam</p>
			</footer>
          </div>
      </Router>
    </div>
  );
}

export default App;
