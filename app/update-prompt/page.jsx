"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const params = useSearchParams();
  const postId = params.get("id");

  const [submitForm, setSubmitForm] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitForm(true);

    if (!postId) return alert("Post Id not found");
    try {
      const response = await fetch(`/api/prompt/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitForm(false);
    }
  };

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`api/prompt/${postId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (postId) {
      getPostDetails();
    }
  }, [postId]);

  return (
    <Form
      type="Update"
      typeVerb="Updating"
      post={post}
      setPost={setPost}
      submitForm={submitForm}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
