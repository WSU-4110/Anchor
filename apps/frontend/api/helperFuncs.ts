export const testClerkApi = async (token: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/users/currentUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        reject(new Error("API response was not ok"));
      }
      const data = await response.json();
      console.log(data);
      resolve(JSON.stringify(data, null, 2));
    } catch (err) {
      console.log(`There was an error fetching data: ${err}`);
    }
  });
};
