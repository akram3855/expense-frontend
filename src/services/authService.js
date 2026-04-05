export const registerUser = async (data) => {
  const res = await fetch("https://expense-tracker-backend-td59.onrender.com/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Register failed");
  }

  return await res.text();
};
export const loginUser = async (data) => {
  const res = await fetch("https://expense-tracker-backend-td59.onrender.com/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return await res.text(); 
};

