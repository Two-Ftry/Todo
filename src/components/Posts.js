
import React from 'react';
import PropTypes from 'prop-types';

class Posts extends React.Component {
    render () {
        const posts = this.props.posts;
        let emptyTips = '';
        if (this.props.isFetching) {
          emptyTips = (<div>数据加载中...</div>);
        } else if (!posts || posts.length <= 0) {
          emptyTips = (<div>暂时没有内容</div>);
        }
        return (
            <div className="posts-box">
              <ul>
                {posts.map((item) => (<li key={item.id}>{item.title}</li>))}
              </ul>
              {emptyTips}
            </div>
        );
    }
}

Posts.propTypes = {
  posts: PropTypes.array
};

export default Posts;
