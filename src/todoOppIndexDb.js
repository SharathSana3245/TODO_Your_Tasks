const DB_NAME = "TodoAppDB";
const DB_VERSION = 1;
const STORE_NAME = "todos";

// Open IndexedDB connection
export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Failed to open database");
  });
}

// ✅ Get all todos
export const getAllTodosIDB = async () => {
  const db = await openDB();
  const objectStore = db
    .transaction(STORE_NAME, "readonly")
    .objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = objectStore.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Failed to fetch todos");
  });
};

// ✅ Add a new todo
export const addTodoIDB = async (todo) => {
  const db = await openDB();
  const objectStore = db
    .transaction(STORE_NAME, "readwrite")
    .objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = objectStore.add(todo);
    request.onsuccess = () => resolve("Todo added");
    request.onerror = () => reject("Failed to add todo");
  });
};

// ✅ Update a todo (requires todo.id to exist)
export const updateTodoIDB = async (todo) => {
  const db = await openDB();
  const objectStore = db
    .transaction(STORE_NAME, "readwrite")
    .objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = objectStore.put(todo); // replaces the existing record with same id
    request.onsuccess = () => resolve("Todo updated");
    request.onerror = () => reject("Failed to update todo");
  });
};

// ✅ Delete a todo by ID
export const deleteTodoIDB = async (id) => {
  const db = await openDB();
  const objectStore = db
    .transaction(STORE_NAME, "readwrite")
    .objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = objectStore.delete(id);
    request.onsuccess = () => resolve("Todo deleted");
    request.onerror = () => reject("Failed to delete todo");
  });
};
