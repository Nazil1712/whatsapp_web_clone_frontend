export async function fetchMessagesByUserId(userId) {
  // console.log("Called Me")
    const response = await fetch(`/api/messages/${userId}`);
    const data = await response.json();
    console.log("Data", data);
    return { data };
}
