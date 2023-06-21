import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
  const response = await openai
    .createCompletion({
      model: `${model}`,
      prompt: `${prompt}`,
      temperature: 0.7,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].text?.trim())
    .catch(
      (err) =>
        `Chat GPT was unable to find an answer for that! (ERROR: ${err.message})`
    );

  return response;
};

export default query;
