import Image from "next/image";
import Link from "next/link";
import { signIn } from "../../src/auth";

async function getTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos") 
  const todos = await res.json() as {
    userId: number,
    id: number,
    title: string,
    completed: boolean
  }[]
  return todos.slice(0, 10)
}

export default async function Home() {
  console.log("Home AUTH_GITHUB_ID", process.env.AUTH_GITHUB_ID);
  console.log("Home NEXT_PUBLIC_GITHUB_CALLBACK_URL", process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL);
  const todos = await getTodos()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home</h1>
      <section>
        <h2>Auth server side</h2>
        <form action={async () => {
          "use server";
          await signIn(undefined, { redirectTo: "/dashboard" });
        }}>
          <button type="submit">Sign in</button>
        </form>
        <form action={async () => {
          "use server";
          await signIn('github', { redirectTo: "/dashboard", callbackUrl: process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL });
        }}>
          <button type="submit">Sign in with Github</button>
        </form>
      </section>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title} - {todo.completed ? "Completed" : "Not Completed"}</li>
        ))}
      </ul>
    </main>
  );
}
