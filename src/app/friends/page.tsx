"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";

export default function FriendsPage() {
  const { data: sessionData } = useSession();
  const { data: friends, isPending, refetch } = api.friend.getFriends.useQuery();
  const addFriendMutation = api.friend.addFriend.useMutation({
    onSuccess: () => {
      void refetch();
      setNewFriendId("");
    },
  });

  const [newFriendId, setNewFriendId] = useState("");

  if (isPending) {
    return <div>Loading friends...</div>;
  }

  if (!sessionData?.user) {
    return <div>Please sign in to view your friends.</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          My Friends
        </h1>

        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Add New Friend</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Friend User ID"
              className="rounded-md border border-gray-300 p-2 text-black"
              value={newFriendId}
              onChange={(e) => setNewFriendId(e.target.value)}
            />
            <button
              className="rounded-full bg-white/10 px-4 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={() => addFriendMutation.mutate({ friendId: newFriendId })}
              disabled={addFriendMutation.isPending}
            >
              {addFriendMutation.isPending ? "Adding..." : "Add Friend"}
            </button>
          </div>
          {addFriendMutation.isError && (
            <p className="text-red-500">Error: {addFriendMutation.error?.message}</p>
          )}
          {addFriendMutation.isSuccess && (
            <p className="text-green-500">Friend added successfully!</p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Your Friends ({friends?.length ?? 0})</h2>
          {friends && friends.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {friends.map((friend) => (
                <li key={friend.id} className="flex items-center justify-between rounded-lg bg-white/10 p-4">
                  <span>{friend.name} (ID: {friend.id})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>You have no friends yet. Add some!</p>
          )}
        </div>
      </div>
    </main>
  );
}
