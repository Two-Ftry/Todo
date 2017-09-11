/**
 * Created by jfhuang on 17/9/9.
 */

import fetch from 'isomorphic-fetch'

export const SELECTED_SUBREDDIT = 'selected_subreddit';
export const INVALIDATE_SUBREDDIT = 'invalidate_subreddit';
export const REQUEST_POST = 'request_post';
export const RECEIVE_POST = 'receive_post';

/**
 * subreddit的action
 * @param subreddit
 * @returns {{type: string, subreddit: *}}
 */
export const selectedSubredditAction = (subreddit) => {
  return {
    type: SELECTED_SUBREDDIT,
    subreddit
  };
};

export const invalidateSubreddit = (subreddit) => {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
};

/**
 * 是否发送请求
 * @param state
 * @param action
 * @returns {boolean}
 */
const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

/**
 * 发送请求的action
 * @param state
 * @param subreddit
 * @returns {{type: string, subreddit: *}}
 */
const requestPosts = (subreddit) => {
  return {
    type: REQUEST_POST,
    subreddit
  }
};

/**
 * 接收到请求的action
 * @param state
 * @param json
 * @returns {{type: string, items: (*|posts), receiveAt: number}}
 */
const receivePosts = (subreddit, json) => {
    return {
      type: RECEIVE_POST,
      subreddit,
      items: json.data.children.map((item) => item.data),
      receiveAt: Date.now()
    }
};

/**
 * 请求异步数据的action
 * @param subreddit
 * @returns {function(*)}
 */
const  fetchPosts = (subreddit) => {
  return (dispatch) => {
    dispatch(requestPosts(subreddit));
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)));
  }
};

export const fetchPostsIfNeeded = (subreddit) => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  }
};
