"use client";

import { api } from "~/trpc/react";
import { useState } from "react";

export default function PostsPage() {
  const { data: posts, isPending, refetch } = api.post.getMyPosts.useQuery();
  const createPostMutation = api.post.create.useMutation({
    onSuccess: () => {
      void refetch();
      setNewPostTitle("");
      setNewPostBody("");
    },
  });

  const deletePostMutation = api.post.delete.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleCreatePost = () => {
    setFormError(null);
    if (!newPostTitle.trim()) {
      setFormError("Post title cannot be empty.");
      return;
    }
    if (!newPostBody.trim()) {
      setFormError("Post body cannot be empty.");
      return;
    }
    createPostMutation.mutate({ title: newPostTitle, body: newPostBody });
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>You have no posts yet.</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          My Posts
        </h1>

        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Create New Post</h2>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Post Title"
              className="rounded-md border border-gray-300 p-2 text-white bg-transparent"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />
            <textarea
              placeholder="Post Body"
              className="rounded-md border border-gray-300 p-2 text-white bg-transparent"
              value={newPostBody}
              onChange={(e) => setNewPostBody(e.target.value)}
              rows={5}
            ></textarea>
            <button
              className="rounded-full bg-white/10 px-4 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={handleCreatePost}
              disabled={createPostMutation.isPending}
            >
              {createPostMutation.isPending ? "Creating..." : "Create Post"}
            </button>
          </div>
          {formError && (
            <p className="text-red-500">Error: {formError}</p>
          )}
          {createPostMutation.isError && (
            <p className="text-red-500">Error: {createPostMutation.error?.message}</p>
          )}
          {createPostMutation.isSuccess && (
            <p className="text-green-500">Post created successfully!</p>
          )}
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <h2 className="text-3xl font-bold">Your Posts ({posts?.length ?? 0})</h2>
          {posts.map((post) => {
            console.log("Post data:", post);
            return (
              <div key={post.id} className="rounded-lg bg-white/10 p-4 flex justify-between items-center">
                <div>
                  <p className="text-white text-lg font-semibold">{post.title}</p>
                  <p className="text-white text-sm mt-2">{post.body}</p>
                </div>
                <button
                  className="rounded-full bg-red-500/80 px-3 py-1 text-sm font-semibold text-white no-underline transition hover:bg-red-600"
                  onClick={() => deletePostMutation.mutate({ id: post.id })}
                  disabled={deletePostMutation.isPending}
                >
                  {deletePostMutation.isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
