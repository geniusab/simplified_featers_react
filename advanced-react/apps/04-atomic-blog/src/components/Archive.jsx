import { useState } from "react";
import { List } from "react-virtualized";
import { faker } from "@faker-js/faker";
import { useBlogContext } from "../BlogContext";

function createRandomPost() {
  return {
    id: crypto.randomUUID().toString(),
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

export function Archive() {
  const { onAddPost } = useBlogContext();

  // Here we don't need the setter function. We're only using state to store these posts because the callback function passed into useState (which generates the posts) is only called once, on the initial render. So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render. We could also move the posts outside the components, but I wanted to show you this trick 😉
  const [posts] = useState(() =>
    // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
    Array.from({ length: 10000 }, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(true);

  const renderRow = ({ index, key, style }) => (
    <li key={key} style={style}>
      <p>
        <strong>{posts[index].title}:</strong> {posts[index].body}
      </p>

      <button onClick={() => onAddPost(posts[index])}>Add as new post</button>
    </li>
  );

  return (
    <aside>
      <h2>Post archive</h2>
      <button onClick={() => setShowArchive(s => !s)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>
      {showArchive && (
        <List
          width={1200}
          height={700}
          rowRenderer={renderRow}
          rowCount={posts.length}
          rowHeight={120}
        />
      )}
    </aside>
  );
}
