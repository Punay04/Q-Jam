import { ClerkProvider } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <ClerkProvider>
      <div></div>
    </ClerkProvider>
  );
}
