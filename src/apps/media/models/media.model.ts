export function collectMediaChunks(chunks: any[], receivedLength: number, type: string) {
  const chunksAll = new Uint8Array(receivedLength);
  let position = 0;
  chunks.forEach((chunk) => {
    chunksAll.set(chunk, position);
    position += chunk.length;
  });
  const options = type ? { type } : {};
  return new Blob([chunksAll.buffer], options);
}
