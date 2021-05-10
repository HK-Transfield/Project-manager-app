import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import CreateProjectModal from './components/CreateProjectModal';
import Searchbar from './components/Searchbar';
import ProjectCollection from './components/ProjectCollection';


function App() {
  let projects = require('./projectData.json');
  return (
    <div className='App'>
      <Header title='Project Manager'/>
      <div className='project_manager-container'>
        <div className='input-container'>
            <CreateProjectModal/>
            <Searchbar/>
        </div>
        <ProjectCollection projects={projects}/>
      </div>
    </div>
   
  );
}

export default App;
