import { auth, signOut} from "@/auth";
import { Button } from "@/components/ui/button";

const AdminPage = async () => {
  const session = await auth();

  return (
    <div>
      <h1>{JSON.stringify(session)}</h1>
      <form action={async () => {
        "use server";

        await signOut({redirectTo: "/login"});
      }} >
        <Button type="submit" >
          Sign Out
        </Button>
      </form>
    </div>
  );
};

export default AdminPage;
