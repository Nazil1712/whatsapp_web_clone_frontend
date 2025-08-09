const API_URL = import.meta.env.VITE_API_URL;

export async function fetchAllUsers() {
  // console.log("Called Me")
    const response = await fetch(`${API_URL}/api/users/`);
    const data = await response.json();
    // console.log("Data", data);
    return { data };
}


export async function fetchUserById(userId) {
  // console.log("Called Me")
    const response = await fetch(`${API_URL}/api/users/${userId}`);
    const data = await response.json();
    // console.log("Data", data);
    return { data };
}