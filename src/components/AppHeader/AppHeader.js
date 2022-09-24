import "./AppHeader.css";
export default function AppHeader({ liked, allPosts }) {
  return (
    <div className="app-header d-flex">
      <h1>Twitter Analog</h1>
      <h2>
        {allPosts} posts, liked {liked}
      </h2>
    </div>
  );
}
