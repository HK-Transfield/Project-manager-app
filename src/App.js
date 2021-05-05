import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectCard from './components/ProjectCard';
import Header from './components/Header';
import DisplayModal from './components/DisplayModal';
import Searchbar from './components/Searchbar';


function App() {
  let projects = require('./projectData.json');
  return (
    <div className='App'>
      <Header title='Project Manager'/>
      <div className='project_manager-container'>
        <div className='input-container'>
            <DisplayModal/>
            <Searchbar/>
        </div>
        <div className='project_cards-container'>
          {projects.map(item => {
            return <ProjectCard {...item} key={item.projectIdentifier}/>
          })}
        </div>
      </div>
    </div>
   
  );
}

export default App;
