import Image from "next/image";
import Link from "next/link";
// import { signIn } from "../../src/auth";

async function getTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos") 
  const todos = await res.json() as {
    userId: number,
    id: number,
    title: string,
    completed: boolean
  }[]
  return todos
}

export default async function Home() {
  const todos = await getTodos()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <form
        action={async () => {
          "use server";
          await signIn(undefined,{ redirectTo: "/dashboard" });
        }}
      >
        <button type="submit">Sign in</button>
      </form> */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title} - {todo.completed ? "Completed" : "Not Completed"}</li>
        ))}
      </ul>
    </main>
  );
}
