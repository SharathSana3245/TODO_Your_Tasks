// src/todoOps.js
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "./utils/firebase";
import {
  openDB,
  addTodoIDB,
  updateTodoIDB,
  deleteTodoIDB,
  getAllTodosIDB,
} from "./todoOppIndexDb";

const getUserTodosRef = () =>
  collection(db, "users", auth.currentUser.uid, "todos");

// ✅ Add Todo (Firebase + IndexedDB)
export const addTodo = async (todo) => {
  const ref = await addDoc(getUserTodosRef(), todo);
  const todoWithId = { ...todo, id: ref.id };
  await addTodoIDB(todoWithId);
  return ref.id;
};

// ✅ Fetch Todos (Firebase → sync into IndexedDB → return IndexedDB)
export const fetchTodos = async () => {
  const snapshot = await getDocs(getUserTodosRef());
  const todos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  // Sync with IndexedDB
  const db = await openDB();
  const tx = db.transaction("todos", "readwrite");
  const store = tx.objectStore("todos");

  store.clear(); // Clear old local data

  todos.forEach((todo) => store.put(todo));
  await tx.done;

  return todos;
};

// ✅ Delete Todo (Firebase + IndexedDB)
export const deleteTodo = async (id) => {
  const docRef = doc(db, "users", auth.currentUser.uid, "todos", id);
  await deleteDoc(docRef);
  await deleteTodoIDB(id);
};

// ✅ Update Todo (Firebase + IndexedDB)
export const updateTodo = async (id, updated) => {
  const docRef = doc(db, "users", auth.currentUser.uid, "todos", id);
  await updateDoc(docRef, updated);
  await updateTodoIDB({ ...updated, id });
};

// ✅ Get Todos Offline (From IndexedDB only)
export const getOfflineTodos = async () => {
  return await getAllTodosIDB();
};
