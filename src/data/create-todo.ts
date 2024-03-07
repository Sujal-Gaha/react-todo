export async function createTodo(title: string, description: string) {
    const response = await fetch("http://localhost:8080/api/v1/todos/", 
    {
        method: "POST",
        body: JSON.stringify({
          title,
          description
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })  
    const data = await response.json();
    return data;
  }
  