const API_URL = import.meta.env.VITE_API_URL;

export async function fetchMessagesByUserId(userId) {
  // console.log("Called Me")
    const response = await fetch(`${API_URL}api/messages/user/${userId}`);
    const data = await response.json();
    // console.log("Data", data);
    return { data };
}