const API_URL = "https://expense-tracker-backend-td59.onrender.com";

export const getExpenses = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/expenses`, {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return await res.json();
};


export const deleteExpense = async (id) => {
  const token = localStorage.getItem("token");

  await fetch(`${API_URL}/api/expenses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  });
};


export const updateExpense = async (id, data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(data)
  });

  return await res.json();
};