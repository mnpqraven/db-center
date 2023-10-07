import { ReactNode } from "react";
import { TestClient } from "./TestClient";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TestClient />
      {children}
    </>
  );
}
