import { FETCH_DATA } from '../actions/types';
import { FETCH_PAGINATION } from '../actions/types';
import { POST_DRAFT } from '../actions/types';
import { UPDATE_DRAFT } from '../actions/types';


export default function(state = [], action) {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload;
    case FETCH_PAGINATION:
      return action.payload;
    case POST_DRAFT:
      return state
    case UPDATE_DRAFT:
      return state;
    default:
      return state;
  }
}
