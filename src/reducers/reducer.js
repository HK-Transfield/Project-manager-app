/**
 * The state that the store will be in when 
 * the user firsts loads or refreshes the 
 * page. There are no projects stored
 */
const initialState = {
  allProjects: [],      // stores every project the user adds to the app
  filteredProjects: [], // used to track any filters or search terms applied 
  searchFilter: '',     // tracks what is currently in the search filter
  recentlyDeleted: ''   // tracks the name of the most recent project deleted
};

/**
 * Reducer function to determine changes to the project
 * manager application's state.
 * 
 * @param {object} state The properties of the reducer.
 * @param {prop} action Carries the payload of data from the application to the store
 * 
 * @returns The state of the reducer, where the projects can be accessed.
 * 
 * @author Harmon Transfield
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {

    /**
     * If there are projects loaded from a server or added via
     * the CreateProjectForm, it will call the ADD_PROJECT
     * action, adding it to the state
     */
    case "ADD_PROJECT":
      let newProject = action.payload;

      if(!state.searchFilter)  // no filter or input applied by search bar
        return Object.assign({}, state, {
          allProjects: [...state.allProjects, newProject],
          filteredProjects: [...state.allProjects, newProject]
        });

      else { // there are still characters in the search bar
        
        let newFilteredProjects = filterProjects(state.filteredProjects, state.searchFilter);
        let newProjectHasFilter = hasSearchFilter(newProject, state.searchFilter);
        
        /* if there are still search filters applied, and the user
        enters a project that matches those filters it will appear
        in the list of projects. Otherwise it is stored with
        allProjects */
        return Object.assign({}, state, {
          allProjects: [...state.allProjects, newProject],
          filteredProjects: newProjectHasFilter ? 
            newFilteredProjects.concat(newProject) : newFilteredProjects, // concat the new project if it matches the search filter
        });
      }
        
    /**
     * When the user clicks the delete button on the project card it will call the 
     * DELETE_PROJECT action and the associated project will be removed from the 
     * state
     */
    case "DELETE_PROJECT":
      let {deletedProjectIdentifier, deletedProjectName} = action.payload;

      return Object.assign({}, state, {
        allProjects: state.allProjects.filter(project => project.projectIdentifier !== deletedProjectIdentifier),
        filteredProjects: state.filteredProjects.filter(project => project.projectIdentifier !== deletedProjectIdentifier),
        recentlyDeleted: deletedProjectName
      });

    /**
     * Everytime the user inputs a new character into the search bar
     * it will call the FILTER_BY_VALUE action and filter the 
     * filterProjects array based on that array
     */
    case 'FILTER_BY_VALUE':
      let searchFilter = action.payload.toLowerCase();

      if (searchFilter) // user has searched something
        return Object.assign({}, state, {
          filteredProjects: filterProjects(state.allProjects, searchFilter),
          searchFilter: searchFilter
        });

      else  // no search input, return all projects
        return Object.assign({}, state, {
          filteredProjects: state.allProjects,
          searchFilter: ''
        });
      
    /**
     * Any time the user selects one of the 'Sort By...'
     * options in the dropdown menu it will call the 
     * SORT_PROJECTS action.
     */
    case 'SORT_PROJECTS':
      let {order, field} = action.payload;
      
      if (order === 'asc') 
        return Object.assign({}, state, {
          allProjects: sortAsc(state.allProjects, field),
          filteredProjects: sortAsc(state.filteredProjects, field), 
        });

      else if (order === 'desc')
        return Object.assign({}, state, {
          allProjects: sortDesc(state.allProjects, field),
          filteredProjects: sortDesc(state.filteredProjects, field),
        });
      return state;

    default:
      return state;

    /**
     * The user closes the alert dismissable, informing them of what project
     * they have most recently deleted, clearing the recently deleted state.
     */
    case 'ACKNOWLEDGE_DELETED_PROJECT':
      return Object.assign({}, state, {
        recentlyDeleted: ''
      });
  }
}
export default reducer;




/**
 * Searches through each property of  
 * 
 * @param {object} projectObj The object that 
 * @param {string} val 
 * @returns Boolean indicating if there the value is found anywhere in the object
 */
const hasSearchFilter = (projectObj, val) => {
  return (
    projectObj.projectName.toLowerCase().includes(val) ||
    projectObj.projectIdentifier.toLowerCase().includes(val) ||
    projectObj.description.toLowerCase().includes(val) ||
    projectObj.start_date.toLowerCase().includes(val) ||
    projectObj.end_date.toLowerCase().includes(val)
  );
}

/**
 * Filters an array based on a search value is passed
 * into it.
 * 
 * @param {array} projectArray The original array that will be filtered
 * @param {string} val The value so search in the array
 * 
 * @returns The newly filtered array 
 */
 const filterProjects = (projectArray, val) => {
  return projectArray.filter((item) => 
    hasSearchFilter(item, val)             
  );
}

/**
 * Sorts items in an array in ascending order.
 * 
 * @param {array} projectArray The array that will be sorted
 * @param {prop} field Which property of an item used to sort
 *  
 * @returns The newly sorted array
 */
const sortAsc = (projectArray, field) => {
  return projectArray.sort(
    (a,b) => {
      if(a[field] > b[field])
        return 1;
      
      if(b[field] > a[field])
        return -1;
      
      return 0;
    }
  );
}

/**
 * Sort items in an array in descending order.
 * 
 * @param {array} projectArray The array that will be sorted
 * @param {prop} field Which property of an item used to sort
 *  
 * @returns 
 */
const sortDesc = (projectArray, field) => {
  return projectArray.sort(
    (a,b) => {
      if(a[field] > b[field])
        return -1;
      
      if(b[field] > a[field])
        return 1;
  
      return 0;
    }
  );
}