/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState, memo, useCallback } from "react";

import { useBlogContext } from "./BlogContext";

import { Archive } from "./components/Archive";
// import Test from "./Test";

function App() {
  const [isFakeDark, setIsFakeDark] = useState(false);
  // const { handleAddPost: onAddPost, posts } = useBlogContext();

  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  // const handleAddPost = useCallback(onAddPost, [onAddPost]);

  // const archiveOptions = useMemo(() => {
  //   return { show: false, title: `Post archive to ${posts.length}` };
  // }, [posts.length]);

  return (
    <section>
      <button
        onClick={() => setIsFakeDark(isFakeDark => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>
      <Header />
      <Main />
      <Archive />
      <Footer />
    </section>
  );
}

function Header() {
  const { onClearPosts } = useBlogContext();
  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}

function SearchPosts() {
  const { searchQuery, setSearchQuery } = useBlogContext();
  return (
    <input
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}

function Results() {
  const { posts } = useBlogContext();
  return <p>🚀 {posts.length} atomic posts found</p>;
}

const Main = memo(function Main() {
  return (
    <main>
      <FormAddPost />
      <Posts />
    </main>
  );
});

function Posts() {
  return (
    <section>
      <List />
    </section>
  );
}

function FormAddPost() {
  const { onAddPost } = useBlogContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title) return;
    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button>Add post</button>
    </form>
  );
}

function List() {
  const { posts } = useBlogContext();
  return (
    <>
      <ul>
        {posts.map((post, i) => (
          <li key={i}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      {/* <Test /> */}
    </>
  );
}

function Footer() {
  return <footer>&copy; by The Atomic Blog ✌️</footer>;
}

export default App;
