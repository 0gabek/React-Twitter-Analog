import { Component } from "react";
import AppHeader from "../AppHeader/AppHeader";
import PostAddForm from "../PostAddForm/PostAddForm";
import PostList from "../PostList/PostList";
import PostStatusFilter from "../PostStatusFilter/PostStatusFilter";
import SearchPanel from "../SearchPanel/SearchPanel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          label: "Going to learn React JS?",
          like: false,
          important: false,
          id: 1,
        },
        {
          label: "Learn JavaScript before learning React.",
          important: false,
          like: false,
          id: 2,
        },
        {
          label: "You have to learn HTML before all!",
          important: false,
          like: false,
          id: 3,
        },
        {
          label: "If you do like this, You Can Make Much MoNeY!",
          important: false,
          like: false,
          id: 4,
        },
      ],
      term: "",
      filter: "all",
    };
    this.id = 5;
  }
  ordinalNumber = (num) => {
    if (num === 1) {
      return `${num}st`;
    } else if (num === 2) {
      return `${num}nd`;
    } else if (num === 3) {
      return `${num}rd`;
    } else {
      return `${num}th`;
    }
  };
  deleteItem = (id) => {
    toast.error(`${this.ordinalNumber(id)} post was deleted!`, {
      toastId: id,
    });
    this.setState({ posts: this.state.posts.filter((item) => item.id !== id) });
  };
  addItem = (value) => {
    toast.success("New post added successfully!");
    const newItem = {
      label: value,
      important: false,
      id: this.id++,
    };
    this.setState(({ posts }) => {
      const newArr = [...posts, newItem];
      return { posts: newArr };
    });
  };
  onToggleImportant = (id) => {
    this.setState(({ posts }) => {
      const index = posts.findIndex((el) => el.id === id);
      const oldItem = posts[index];
      const newItem = { ...oldItem, important: !oldItem.important };
      newItem.important
        ? toast.info(`${this.ordinalNumber(id)} post highlighted!`, {
            toastId: id,
          })
        : toast.warn(`${this.ordinalNumber(id)} post not highlighted!`, {
            toastId: id,
          });
      const newArr = [
        ...posts.slice(0, index),
        newItem,
        ...posts.slice(index + 1),
      ];
      return { posts: newArr };
    });
  };
  onToggleLiked = (id) => {
    this.setState(({ posts }) => {
      const index = posts.findIndex((el) => el.id === id);
      const oldItem = posts[index];
      const newItem = { ...oldItem, like: !oldItem.like };
      newItem.like
        ? toast(`${this.ordinalNumber(id)} post liked!`, { toastId: id })
        : toast.warn(`${this.ordinalNumber(id)} post disliked!`, {
            toastId: id,
          });
      const newArr = [
        ...posts.slice(0, index),
        newItem,
        ...posts.slice(index + 1),
      ];
      console.log(id);
      return { posts: newArr };
    });
  };
  searchPost = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter(
      (item) => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    );
  };
  filterPost = (items, filter) => {
    if (filter === "like") {
      return items.filter((item) => item.like);
    } else {
      return items;
    }
  };
  onUpdateSearch = (term) => {
    this.setState({ term });
  };
  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { term, posts, filter } = this.state;
    const liked = posts.filter((item) => item.like).length;
    const allPosts = posts.length;
    const visiblePosts = this.filterPost(this.searchPost(posts, term), filter);

    return (
      <div className="app">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <AppHeader liked={liked} allPosts={allPosts} />
        <div className="search-panel d-flex">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <PostStatusFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}
          />
        </div>
        <PostList
          posts={visiblePosts}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked}
        />
        <PostAddForm onAdd={this.addItem} />
      </div>
    );
  }
}
