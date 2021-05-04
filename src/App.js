import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectCard from './components/ProjectCard';
import Header from './components/Header';


function App() {
  let projects = require('./projectData.json');
  return (
    <div className='App'>
      <div className='project_manager-container'>
        <Header title='Project Manager'/>
        {projects.map(item => {
          return <ProjectCard {...item} key={item.projectIdentifier}/>
        })}
      </div>
    </div>
   
  );
}

export default App;
