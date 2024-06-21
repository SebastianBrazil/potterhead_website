export const callAPI = async () => {
    const promise = await fetch('https://potterhead-api.vercel.app/api/characters');
    const data = await promise.json();
    return data;
}