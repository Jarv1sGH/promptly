import Prompt from "@models/promptModel";
import { connectToDataBase } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDataBase();

    const post = await Prompt.findById(params.id).populate("promptCreator");

    if (!post) {
      return Response("Post not found", { status: 404 });
    }
    return new Response(JSON.stringify(post), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch posts", {
      status: 500,
    });
  }
};

//update post
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDataBase();
    const existingPost = await Prompt.findById(params.id);

    if (!existingPost) {
      return Response("Post not found", { status: 404 });
    }
    existingPost.prompt = prompt;
    existingPost.tag = tag;

    await existingPost.save();

    return new Response(JSON.stringify(existingPost), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to update post", {
      status: 500,
    });
  }
};
//update post
export const DELETE = async (req, { params }) => {
  try {
    await connectToDataBase();
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Post deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to delete post", {
      status: 500,
    });
  }
};
