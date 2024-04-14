import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = async () => {
  const session = await auth();

  return (
    <div>
      {session ? (
        <div>
          <h1>Hello {session?.user?.name ?? "Guest"}</h1>
          <form
            action={async () => {
              "use server";

              await signOut({ redirectTo: "/login" });
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        </div>
      ) : (
        <div>
          <h1>You are not logged in</h1>
          <Link href="/login" className="bg-red-900">
            Login Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
