/**
 * The state that the store will be in when 
 * the user firsts loads or refreshes the 
 * page.
 */
const initialState = {
  allProjects: [],      // tracks every project the user adds to the app
  filteredProjects: [], // tracks any filters or search terms applied 
  searchValue: ''
};

/**
 * Reducer function to determine changes to an application's state.
 * 
 * @param {object} state 
 * @param {prop} action Determines the changes being made to the state.
 * 
 * @returns The state of the reducer, where projects can be accessed.
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
      if(!state.searchValue)  // no input in search bar
        return Object.assign({}, state, {
          allProjects: [...state.allProjects, action.payload],
          filteredProjects: [...state.allProjects, action.payload]
        });
      else  // characters are found in the search bar
        return Object.assign({}, state, {
          allProjects: [...state.allProjects, action.payload],
          filteredProjects: filterProjects(state.filteredProjects, state.searchValue).concat(action.payload),
        });
      
        
    /**
     * When the user clicks the delete button on the project card it will call the 
     * DELETE_PROJECT action and the associated project will be removed from the 
     * state
     */
    case "DELETE_PROJECT":
      return Object.assign({}, state, {
        allProjects: state.allProjects.filter(project => project.projectIdentifier !== action.payload),
        filteredProjects: state.filteredProjects.filter(project => project.projectIdentifier !== action.payload),
      });

    /**
     * Everytime the user inputs a new character into the search bar
     * it will call the FILTER_BY_VALUE action and filter the 
     * filterProjects array based on that array
     */
    case 'FILTER_BY_VALUE':
      let searchValue = action.payload.toLowerCase();

      if (searchValue) // user has searched something
        return Object.assign({}, state, {
          filteredProjects: filterProjects(state.allProjects, searchValue),
          searchValue: searchValue
        });

      else  // no search input, return all projects
        return Object.assign({}, state, {
          filteredProjects: state.allProjects,
          searchValue: ''
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
  }
}
export default reducer;


/**
 * Filters an array based on a search value is passed
 * into it.
 * 
 * @param {array} arr The original array that will be filtered
 * @param {string} val The value so search in the array
 * 
 * @returns The newly filtered array 
 */
const filterProjects = (arr, val) => {
  return arr.filter((item) => 
    item.projectName.toLowerCase().includes(val) ||
    item.projectIdentifier.toLowerCase().includes(val) ||
    item.description.toLowerCase().includes(val) ||
    item.start_date.toLowerCase().includes(val) ||
    item.end_date.toLowerCase().includes(val)              
  );
}

/**
 * Sorts items in an array in ascending order.
 * 
 * @param {array} arr The array that will be sorted
 * @param {prop} field Which property of an item used to sort
 *  
 * @returns The newly sorted array
 */
const sortAsc = (arr, field) => {
  return arr.sort(
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
 * @param {array} arr The array that will be sorted
 * @param {prop} field Which property of an item used to sort
 *  
 * @returns 
 */
const sortDesc = (arr, field) => {
  return arr.sort(
    (a,b) => {
      if(a[field] > b[field])
        return -1;
      
      if(b[field] > a[field])
        return 1;
  
      return 0;
    }
  );
}