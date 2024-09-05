import { auth, signOut } from "../../src/auth";

async function Dashboard() {
  const session = await auth();

  if (!session?.user) return <div>Access Denied</div>;
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}

export default Dashboard;
