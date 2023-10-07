import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <p className="font-bold text-xl">Honkai</p>
      <div className="flex flex-col border rounded-md p-4">
        <div className="flex justify-around items-center">
          <span >avatar</span>
          <div className="flex gap-2">
            <Button>
              <Link href={"/honkai/avatar"}>Table</Link>
            </Button>
            <Button>
              <Link href={"/api/honkai/avatar"}>Api</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
