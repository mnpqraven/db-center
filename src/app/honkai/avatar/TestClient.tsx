"use client";

import { trpc } from "@/app/_trpc/client";

export function TestClient() {
  const getTodos = trpc.honkai.avatar.useQuery();
  return <div>{getTodos.data?.join(',')}</div>;
}
