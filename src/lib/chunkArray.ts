// divides provided array into arrays with n number of items
// for example chunkArray([1,2,3,4,5,6,7], 3) will return [[1,2,3], [4,5,6],[7]] 
export const chunkArray = (arr, n) => {
  if (arr.length === 0) {
    return [];
  }
  if (arr.length <= n) {
    return [arr];
  }
  let fullChunksNum = Math.floor(arr.length / n);
  let lastChunkLength = arr.length % n;

  let chunks = lastChunkLength === 0 ? Array(fullChunksNum).fill([]) : Array(fullChunksNum + 1).fill([]);
  return chunks.map((a, i) => {
    return arr.slice(i * n, i * n + n)
  });

} 