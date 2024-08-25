const base_bot_url = "http://127.0.0.1:8081";

export async function askAssistant(query: string): Promise<string> {
  const url = `${base_bot_url}/ask`;
  const requestBody = `{"query": "${query}"}`;
  const response = await fetch(url, {
    body: requestBody,
    method: "POST",
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Cannot get response from assistant... Try again later.");
  }

  return (await response.json())["responseId"];
}

export async function getState(messagingId: string): Promise<string> {
  const url = `${base_bot_url}/state/${messagingId}`;
  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    console.log(response);
    throw new Error("Cannot get response from assistant... Try again later.");
  }
  return (await response.json())["state"];
}

export async function getResponse(messagingId: string): Promise<string> {
  const url = `${base_bot_url}/response/${messagingId}`;

  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    console.log(response);
    throw new Error("Cannot get response from assistant... Try again later.");
  }

  return (await response.json())["response"];
}
