"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import Link from "next/link";
import { signIn, signOut, useSession, SessionProvider } from "next-auth/react";

Amplify.configure(outputs);

const client = generateClient<Schema>();

function SessionSection() {
  const { data: session } = useSession();
  if (!session)
    return (
      <div>
        <section>
          <h2>Auth client side</h2>
          <button
            onClick={() => signIn(undefined, { redirectTo: "/dashboard" })}
          >
            Sign in
          </button>
          <button
            onClick={() =>
              signIn("github", {
                redirectTo: "/dashboard",
                callbackUrl: process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL,
              })
            }
          >
            Sign in with Github
          </button>
          <button
            onClick={() =>
              signIn("github", {
                callbackUrl: process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL,
              })
            }
          >
            Sign in with Github (No redirect)
          </button>
        </section>
      </div>
    );
  return (
    <div>
      <p>Session: {JSON.stringify(session)}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }
  console.log(
    "NEXT_PUBLIC_GITHUB_CALLBACK_URL",
    process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL
  );
  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <SessionProvider>
        <SessionSection />
      </SessionProvider>
      <Link href="/home">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/api/hello">Hello world api</Link>
      <Link href="/api/users">Users api</Link>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
    </main>
  );
}
