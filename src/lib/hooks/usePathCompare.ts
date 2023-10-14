import { usePathname } from "next/navigation";

export function usePathCompare() {
  const pathname = usePathname();
  function isChildPath(path: string) {
    if (path == "/") return pathname == "/";
    return pathname.startsWith(path);
  }
  return { isChildPath };
}
