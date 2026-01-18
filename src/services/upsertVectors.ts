import { pcIndex } from "./pinecone.js";
import { textsToVectors } from "./embeddings.js";
import { fireItUp } from "./youtube.js";
import { getNamespaceFromInput } from "../utils/urlParser.js";

const BATCH_SIZE = 50;

const upsertChunks = async (input: string) => {
  const namespace = getNamespaceFromInput(input);
  const chunks = await fireItUp(input);
  const vectors = await textsToVectors(chunks);

  const records = chunks.map((chunk, i) => ({
    id: `chunk-${i}`,
    values: vectors[i] as number[],
    metadata: { text: chunk },
  }));

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    await pcIndex.namespace(namespace).upsert(batch);
    console.log(`Upserted batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} chunks`);
  }

  console.log(`Total: ${records.length} chunks upserted to namespace: ${namespace}`);
};

export { upsertChunks };
