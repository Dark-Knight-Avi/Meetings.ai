import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>

      <h1 className="text-3xl font-bold underline">Welcome to Next.js!</h1>
      <p className="mt-4 text-lg">
        This is a simple example of a Next.js application using Tailwind CSS.
      </p>
      <Button variant={"destructive"}>
        click me
      </Button>
    </div>
  );
}
