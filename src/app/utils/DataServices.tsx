const apiName: string = 'https://potterhead-api.vercel.app/';

export const callAPI = async (route: string) => {
    const promise = await fetch(apiName + route);
    const data = await promise.json();
    console.log(data);

    return data;
}