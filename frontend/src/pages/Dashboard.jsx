import { useEffect, useRef, useState } from "react";
import { api } from "../services/api";

/* ---------- Date helpers ---------- */
const isToday = (date) =>
  new Date(date).toDateString() === new Date().toDateString();

const isTomorrow = (date) => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return new Date(date).toDateString() === d.toDateString();
};

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("📝");
  const [dueDate, setDueDate] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("today");
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  /* ---------- Load tasks ---------- */
  const loadTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  /* ---------- Keyboard shortcuts ---------- */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
      if (e.key.toLowerCase() === "n") inputRef.current?.focus();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* ---------- CRUD ---------- */
  const addTask = async () => {
    if (!title || !dueDate) {
      setError("Please enter task title and date");
      return;
    }

    setError("");
    await api.post("/tasks", { title, dueDate, emoji });
    setTitle("");
    setEmoji("📝");
    setDueDate("");
    loadTasks();
  };

  const toggleComplete = async (task) => {
    await api.put(`/tasks/${task._id}`, {
      completed: !task.completed,
    });
    loadTasks();
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  /* ---------- Filters ---------- */
  const filteredTasks = tasks.filter((t) => {
    if (activeView === "today") return !t.completed && isToday(t.dueDate);
    if (activeView === "tomorrow") return !t.completed && isTomorrow(t.dueDate);
    if (activeView === "upcoming")
      return !t.completed && !isToday(t.dueDate) && !isTomorrow(t.dueDate);
    if (activeView === "completed") return t.completed;
    return false;
  });

  /* ---------- Counts ---------- */
  const counts = {
    today: tasks.filter((t) => !t.completed && isToday(t.dueDate)).length,
    tomorrow: tasks.filter((t) => !t.completed && isTomorrow(t.dueDate)).length,
    upcoming: tasks.filter(
      (t) =>
        !t.completed &&
        !isToday(t.dueDate) &&
        !isTomorrow(t.dueDate)
    ).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ---------- SIDEBAR ---------- */}
      {sidebarOpen && (
        <aside className="w-64 bg-slate-900 text-white p-5">
          <h2 className="text-lg font-semibold mb-4">Views</h2>

          {[
            ["today", "Today"],
            ["tomorrow", "Tomorrow"],
            ["upcoming", "Upcoming"],
            ["completed", "Completed"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setActiveView(key);
                setSidebarOpen(false);
              }}
              className={`w-full flex justify-between px-4 py-2 rounded mb-2 ${
                activeView === key
                  ? "bg-indigo-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <span>{label}</span>
              <span className="text-sm opacity-70">{counts[key]}</span>
            </button>
          ))}
        </aside>
      )}

      {/* ---------- MAIN ---------- */}
      <main className="flex-1 p-6">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-2xl text-indigo-600 hover:text-indigo-800"
            >
              ☰
            </button>
            <h1 className="text-2xl font-bold capitalize">{activeView}</h1>
          </div>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </div>

        {/* Add task */}
        <div className="bg-white p-4 rounded-lg shadow mb-4 flex gap-2">
          <select
            className="border p-2 rounded"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
          >
            <option value="📝">📝 Normal</option>
            <option value="🔥">🔥 Important</option>
            <option value="⭐">⭐ Priority</option>
            <option value="❗">❗ Urgent</option>
            <option value="💼">💼 Work</option>
          </select>

          <input
            ref={inputRef}
            className="border p-2 rounded flex-1"
            placeholder="New task (press N)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            className="border p-2 rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button
            onClick={addTask}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        {/* Empty state */}
        {filteredTasks.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg font-medium">No tasks here 🎉</p>
            <p className="text-sm mt-2">
              Add a task above to stay productive.
            </p>
          </div>
        )}

        {/* Task list */}
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="flex justify-between items-center bg-white border rounded-lg p-3 mb-2 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task)}
              />
              <span className="text-xl">{task.emoji}</span>
              <span
                className={
                  task.completed
                    ? "line-through text-gray-400 italic"
                    : ""
                }
              >
                {task.title}
              </span>
              {task.completed && (
                <span className="text-green-600 text-sm font-medium">
                  ✅ Done
                </span>
              )}
            </div>

            <button
              onClick={() => deleteTask(task._id)}
              className="text-red-500 hover:text-red-700"
            >
              🗑
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
