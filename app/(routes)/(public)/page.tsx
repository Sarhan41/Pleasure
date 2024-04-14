import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = async () => {

  return (
    <div>
      <h1>
        
        You are not Logged in
        </h1>
        <Link href="/login" className="bg-red-900" >
         Login Now
        </Link>
    </div>
  );
};

export default HomePage;
