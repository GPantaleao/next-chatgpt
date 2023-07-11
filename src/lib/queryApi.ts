import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
  const response = await openai.createChatCompletion({
    model: `${model}`,
    messages: [
      {
        "role": "user",
        "content": `${prompt}`
      },
      {
        "role": "assistant",
        "content": `${prompt}`
      }
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
    .then((res) => res.data.choices[0].message?.content?.trim())
    .catch(
      (err) => 
        console.log(err)
    );

  return response;
};

export default query;
