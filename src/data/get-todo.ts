export async function getTodo() {
  const response = await fetch(
    "http://localhost:8080/api/v1/todos?query=reactjs&complete=false",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
}
