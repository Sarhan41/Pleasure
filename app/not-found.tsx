import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="font-bold text-6xl text-gray-900">404</h1>
        <p className="font-semibold text-3xl text-gray-700 my-8">
          Oops! This page could not be found.
        </p>
      </div>
      <Button>
        <Link className="text-white font-semibold" href="/">
          Go to Home
        </Link>
      </Button>
    </section>
  );
}
