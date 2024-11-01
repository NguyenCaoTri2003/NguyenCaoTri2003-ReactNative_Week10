import { 
  SET_TASKS, 
  FETCH_TASKS_SUCCESS, 
  FETCH_TASKS_FAILURE, 
  UPDATE_TASK_REQUEST, 
  DELETE_TASK_REQUEST,
  ADD_TASK_SUCCESS, 
  ADD_TASK_FAILURE 
} from './actions';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return { ...state, tasks: action.payload, loading: false };
    
    case FETCH_TASKS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    
    case UPDATE_TASK_REQUEST: {
      const updatedTasks = state.tasks.map(task =>
        task.id === action.payload.id ? action.payload : task
      );
      return { ...state, tasks: updatedTasks };
    }

    case DELETE_TASK_REQUEST: {
      const filteredTasks = state.tasks.filter(task => task.id !== action.payload);
      return { ...state, tasks: filteredTasks };
    }
    case ADD_TASK_SUCCESS: {
      return { ...state, tasks: [...state.tasks, action.payload], loading: false };
    }

    case ADD_TASK_FAILURE: {
      return { ...state, error: action.payload, loading: false };
    }
    default:
      return state;
  }
};

export default rootReducer;
