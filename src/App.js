import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AlertDeleted } from './components/Alerts';
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import CreateProjectButton from './components/CreateProjectButton';
import ProjectList from './components/ProjectList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/**
 * The main compononent, which acts as a container for 
 * all other components.
 * 
 * @returns The entire project manager application DOM
 * 
 * @author Harmon Transfield
 */
const App = () => {

  // declare hooks
  const myProjects = useSelector(state => state); // retrieves the project data from the store
  const dispatch = useDispatch(); // used to dispatch redux actions

  // define filters for the dropdown button
  const [sortProjectNameFilters, sortStartDateFilters] = [
    {
      name: 'Project Name',
      className: 'projectName'
    }, 
    {
      name: 'Start Date',
      className: 'start_date'
    }
  ];

  /**
   * Lifecycle method. Used to fetch the data from the server
   * and then dispatch them to the redux store.
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
            <CreateProjectButton/>
            <Searchbar
              sortProjectNameFilters={sortProjectNameFilters}
              sortStartDateFilters={sortStartDateFilters}
            />
        </div>
        {/* if the recentlyDeleted state is set, it will display an alert at the top of the page */}
        {myProjects.recentlyDeleted ? <AlertDeleted deletedProjectName={myProjects.recentlyDeleted} /> : null}

        {/* this is where all projects will be displayed */}
        <ProjectList projects={myProjects.filteredProjects}/>
      </div>
    </div>
  );
}

export default App;
