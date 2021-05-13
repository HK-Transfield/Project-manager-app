import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import CreateProjectModal from './components/CreateProjectModal';
import Searchbar from './components/Searchbar';
import ProjectCollection from './components/ProjectCollection';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {

  const myProjects = useSelector(state => state.myProjects);
  const dispatch = useDispatch();
  // TO-DO: Figure out a better way to make sure that useEffect does not infinitely loop
  const [newProjects, setNewProjects] = useState(false);

  /**
   * Lifecycle method. Used to fetch the data from the server
   * and then add them to the redux store.
   */
  useEffect(() => {
    fetch('./data.json')
    .then(response => response.json())
    .then(result => {
      result.map(project => {
        dispatch({
          type: 'ADD_PROJECT',
          payload: project
        })
      });
    });
  }, [newProjects]);     

  return (
    <div className='App'>
      <Header title='Project Manager'/>
      <div className='project_manager-container'>
        <div className='input-container'>
            <CreateProjectModal/>
            <Searchbar/>
        </div>
        <ProjectCollection projects={myProjects}/>
      </div>
    </div>
  );
}

export default App;
