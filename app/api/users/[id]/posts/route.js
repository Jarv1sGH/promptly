import Prompt from "@models/promptModel";
import { connectToDataBase } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDataBase();

    const posts = await Prompt.find({ promptCreator: params.id }).populate(
      "promptCreator"
    );

    return new Response(JSON.stringify(posts), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch posts", {
      status: 500,
    });
  }
};
