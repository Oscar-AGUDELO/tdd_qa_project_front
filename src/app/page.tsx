"use client";
import { Page } from "@/components/main/main";
import { F_IsAdmin } from "@/functions/F_IsAdmin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const isAdmin = await F_IsAdmin();

      if (isAdmin) {
        router.replace("/admin/dashboard");
      }
    };
    checkAdmin();
  }, [router]);
  return (
    <Page pageTitle="Home">
      <></>
    </Page>
  );
}
