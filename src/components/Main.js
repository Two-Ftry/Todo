require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import { connect } from 'react-redux';

import {
  fetchPostsIfNeeded,
  selectedSubredditAction,
  invalidateSubreddit
} from '../actions/actions';

import Picker from './Picker';
import Posts from './Posts';

class AppComponent extends React.Component {
  constructor (props) {
    super(props);
    this.changeFilter = this.changeFilter.bind(this);
    this.handleFresh = this.handleFresh.bind(this);
  }

  componentWillMount () {
     const {
        selectedSubreddit,
        dispatch
     } = this.props;
    const next = dispatch(fetchPostsIfNeeded(selectedSubreddit));
    console.log('@@@next', next);
  }

  componentDidUpdate (prevProp) {
    if (this.props.selectedSubreddit !== prevProp.selectedSubreddit) {
      const { dispatch } = this.props;
      dispatch(fetchPostsIfNeeded(this.props.selectedSubreddit));
    }
  }

  render() {
    return (
      <div className="index">
        <Picker value={this.props.selectedSubreddit}
                onFresh={this.handleFresh}
                onChange={this.changeFilter}/>
        <Posts posts={this.props.items} isFetching={this.props.isFetching}/>
      </div>
    );
  }

  changeFilter (subreddit) {
    const {
      selectedSubreddit,
      dispatch
    } = this.props;
    if (selectedSubreddit !== subreddit) {
      dispatch(selectedSubredditAction(subreddit));
      dispatch(fetchPostsIfNeeded(subreddit))
    }
  }

  handleFresh () {
    const {
      selectedSubreddit,
      dispatch
    } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }
}


const mapStateToProps = (state) => {
  const { selectedSubreddit, postsBySubreddit } = state
  const {
    isFetching,
    lastUpdated,
    items
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  };

  return {
    selectedSubreddit,
    items,
    isFetching,
    lastUpdated
  };
};

export default connect(mapStateToProps)(AppComponent);
