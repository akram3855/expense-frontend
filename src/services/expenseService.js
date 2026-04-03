// 🔥 GET EXPENSES
export const getExpenses = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8080/api/expenses", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return await res.json();
};


// 🔥 DELETE EXPENSE
export const deleteExpense = async (id) => {
  const token = localStorage.getItem("token");

  await fetch(`http://localhost:8080/api/expenses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  });
};


// 🔥 UPDATE EXPENSE
export const updateExpense = async (id, data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:8080/api/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(data)
  });

  return await res.json();
};