import Prompt from "@models/promptModel";
import { connectToDataBase } from "@utils/database";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDataBase();
    const newPrompt = new Prompt({
      promptCreator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    return new Response("Failed to post", {
      status: 500,
    });
  }
};
