import { auth} from "@/auth";
import { Button } from "@/components/ui/button";

const AdminPage = async () => {
  const session = await auth();

  return (
    <div>
      <h1>{JSON.stringify(session)}</h1>
      
    </div>
  );
};

export default AdminPage;
