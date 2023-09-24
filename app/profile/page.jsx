"use client";
import Profile from "@components/Profile";
import Loader from "@components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const userConfirmation = confirm("Are you sure about deleting that?");
    if (userConfirmation) {
      try {
        await fetch(`api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.error(error.message);
      }
    }
  };
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const response = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await response.json();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    if (session?.user.id) {
      fetchPosts();
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Profile
          name={session?.user.name}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          data={posts}
        />
      )}
    </>
  );
};

export default MyProfile;
