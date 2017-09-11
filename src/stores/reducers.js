
import { combineReducers } from 'redux';
import {
  SELECTED_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POST,
  RECEIVE_POST
} from '../actions/actions';

const selectedSubreddit = (state = 'reactjs', action) => {
    switch (action.type) {
        case SELECTED_SUBREDDIT:
            return action.subreddit;
        default:
            return state;
    }
};

const getPosts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_POST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_POST:
      const obj = Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.items,
        lastUpdated: action.receiveAt
      });
      return obj;
    default:
      return state;
  }
};

const postsBySubreddit = (state = {}, action) => {
  switch(action.type) {
    case INVALIDATE_SUBREDDIT:
    case REQUEST_POST:
    case RECEIVE_POST:
      return Object.assign({}, state, {
        [action.subreddit]: getPosts(state[action.subreddit], action)
      });
    default:
      return state;
  }
}

const reducers = combineReducers({
  selectedSubreddit,
  postsBySubreddit
});

export default reducers;
