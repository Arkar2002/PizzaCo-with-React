import API_URL from "./API_URL";

export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);
  const data = await res.json();
  return data;
}

export async function getMenus() {
  const res = await fetch(`${API_URL}/menu`);
  const data = await res.json();
  return data;
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newOrder),
    });
    if (!res.ok) throw Error;
    const { data } = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateOrder(id, updateOrder) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateOrder),
    });
    if (!res.ok) throw Error;
  } catch (error) {
    throw new Error(error.message);
  }
}
