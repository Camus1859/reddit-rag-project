import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI();

const getEmbedding = async (text: string): Promise<number[]> => {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
    encoding_format: "float",
  });

  if (response.data && response.data.length > 0 && response.data[0]) {
    return response.data[0].embedding;
  }
  throw new Error("Failed to generate embedding");
};

const getEmbeddings = async (texts: string[]): Promise<number[][]> => {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
    encoding_format: "float",
  });

  return response.data.map((item) => item.embedding);
};

export { getEmbedding, getEmbeddings };
