import "./PostList.css";
import PostListItem from "../PostListItem/PostListItem";
import { Component } from "react";

export default class PostList extends Component {
  render() {
    const {
      posts = [],
      onDelete,
      onToggleImportant,
      onToggleLiked,
    } = this.props;

    return (
      <>
        <h6
          className="text-muted"
          style={{ fontWeight: 400, marginBottom: "1.1rem" }}
        >
          Double tap to like or dislike!
        </h6>
        <ul className="app-list">
          {posts.length ? (
            posts.map(({ id, ...item }) => (
              <PostListItem
                key={id}
                {...item}
                onDelete={() => onDelete(id)}
                onToggleImportant={() => onToggleImportant(id)}
                onToggleLiked={() => onToggleLiked(id)}
              />
            ))
          ) : (
            <h5 className="text-muted">Nothing found. Add some posts!</h5>
          )}
        </ul>
      </>
    );
  }
}
