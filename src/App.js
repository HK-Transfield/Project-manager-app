import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import CreateProjectModal from './components/CreateProjectModal';
import ProjectCollection from './components/ProjectCollection';
import './App.css';

/**
 * The main compononent, which will act as a container for 
 * all other components.
 * 
 * @returns The entire project manager application DOM
 * @author Harmon Transfield
 */
const App = () => {

  // declare hooks
  const myProjects = useSelector(state => state); // retrieves the project data from the store
  const dispatch = useDispatch(); // used to dispatch redux actions

  /**
   * Lifecycle method. Used to fetch the data from the server
   * and then add them to the redux store.
   */
  useEffect(() => {
    fetch('./data.json')
    .then(response => response.json())
    .then(result => {
      result.map(project => {
        return (
          dispatch({
            type: 'ADD_PROJECT',
            payload: project
          })
        );
      });
    });
  }, [dispatch]);

  return (
    <div className='App'>
      <Header title='Project Manager'/>
      <div className='project_manager-container'>

        {/* user controls for user to add, search, and filter projects */}
        <div className='input-container'>
            <CreateProjectModal/>
            <Searchbar/>
        </div>

        {/* this is where all projects will be displayed */}
        <ProjectCollection projects={myProjects.filteredProjects}/>
      </div>
    </div>
  );
}

export default App;
