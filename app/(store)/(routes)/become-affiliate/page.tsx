import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const BecomeAffiliate = () => {
  return (
    <section className="bg-black min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-primary font-serif text-5xl font-bold mb-6">
        HELLO Affiliate
      </h1>
      <h2 className="text-yellow-300 font-mono text-3xl mb-4">
        We&apos;re launching something amazing!
      </h2>
      <p className="text-primary font-serif text-3xl">
        Stay tuned, our affiliate program is coming soon.
      </p>
      <Link href="/" className="mt-6">
        <Button variant={"outline"}   className="border-primary hover:bg-primary hover:text-white z-50 w-full">Go back to home</Button>
      </Link>
    </section>
  );
};

export default BecomeAffiliate;
