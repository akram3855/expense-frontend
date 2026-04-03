import { useState, useEffect } from "react";
import { getExpenses, deleteExpense, updateExpense } from "../services/expenseService";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  // 🔐 Protect route + load data
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    loadExpenses();
  }, []);

  // 🔄 Load expenses
  const loadExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      alert("Session expired. Please login again");
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  // ➕ ADD or ✏️ UPDATE
  const addExpense = async () => {
    const token = localStorage.getItem("token");

    if (!title || !amount) {
      alert("Title and amount are required");
      return;
    }

    if (editingId) {
      await updateExpense(editingId, {
        title,
        amount,
        category,
        date
      });
      setEditingId(null);
    } else {
      await fetch("https://expense-tracker-backend-td59.onrender.com/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          title,
          amount: Number(amount),
          category,
          date
        })
      });
    }

    // reset form
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");

    loadExpenses();
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    await deleteExpense(id);
    loadExpenses();
  };

  // ✏️ EDIT
  const handleEdit = (expense) => {
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category || "");
    setDate(expense.date || "");
    setEditingId(expense.id);
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
  <div className="min-h-screen bg-gray-100 p-6">

    <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">💰 Expense Tracker</h2>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* TOTAL CARD */}
      <div className="bg-blue-500 text-white p-4 rounded-xl mb-6 shadow">
        <h3 className="text-lg">Total Expense</h3>
        <p className="text-2xl font-bold">₹{total}</p>
      </div>

      {/* FORM */}
      <h3 className="text-lg font-semibold mb-3">
        {editingId ? "Update Expense" : "Add Expense"}
      </h3>

      <div className="grid grid-cols-2 gap-3 mb-4">

        <input
          className="border p-2 rounded-lg"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 rounded-lg"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          className="border p-2 rounded-lg"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="border p-2 rounded-lg"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

      </div>

      <button
        onClick={addExpense}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      >
        {editingId ? "Update Expense" : "Add Expense"}
      </button>

      {/* LIST */}
      <div className="mt-6 space-y-3">

        {expenses.map((e) => (
          <div
            key={e.id}
            className="flex justify-between items-center bg-gray-50 p-4 rounded-xl shadow-sm"
          >
            <div>
              <p className="font-semibold">{e.title}</p>
              <p className="text-sm text-gray-500">
                ₹{e.amount} • {e.category} • {e.date}
              </p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => handleEdit(e)}
                className="bg-yellow-400 px-3 py-1 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(e.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>

    </div>
  </div>
);
}

export default Dashboard;