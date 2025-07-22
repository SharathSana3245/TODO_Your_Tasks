const DB_NAME = "TodoAppDB";
const DB_VERSION = 1;
const STORE_NAME = "todos";

export function openDB(todo) {
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

export const getTodos = async () => {
  const db = await openDB();
  // const tx = db.transaction("todos", "readonly");
  // const store = tx.objectStore("todos");
  const objectStore = db.transaction(STORE_NAME).objectStore(STORE_NAME);

  console.log(objectStore, "req");
  return new Promise((resolve, reject) => {
    const request = objectStore.getAll(); // ✅ fetch all entries from "todos" store

    request.onsuccess = () => {
      console.log(request.result, "Todos from DB");
      resolve(request.result);
    };

    request.onerror = () => {
      console.error("Failed to fetch todos from DB");
      reject("Failed to fetch todos");
    };
  });
};
