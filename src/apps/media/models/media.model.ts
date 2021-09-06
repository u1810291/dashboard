export function collectMediaChunks(chunks: any[], receivedLength: number) {
  const chunksAll = new Uint8Array(receivedLength);
  let position = 0;
  chunks.forEach((chunk) => {
    chunksAll.set(chunk, position);
    position += chunk.length;
  });
  return new Blob([chunksAll.buffer]);
}
