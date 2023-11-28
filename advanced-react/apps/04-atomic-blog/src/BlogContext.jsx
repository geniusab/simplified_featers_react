import { faker } from "@faker-js/faker";
import { useMemo } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

export const BlogContext = createContext(null);

function BlogProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 5 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter(post =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts(posts => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  const value = useMemo(
    () => ({
      posts: searchedPosts,
      setPosts,
      setSearchQuery,
      handleAddPost,
      onClearPosts: handleClearPosts,
      onAddPost: handleAddPost,
    }),
    [searchedPosts]
  );

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

function useBlogContext() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("BlogContext was used outside of the Provider");
  }
  return context;
}

export { useBlogContext, BlogProvider };
