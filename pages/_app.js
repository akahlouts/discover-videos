import { Roboto_Slab } from "next/font/google";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { magic } from "@/lib/magic-client";
import { useRouter } from "next/router";
import Loading from "@/components/loading/loading";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const handleLoggedIn = async () => {
  //     const isLoggedIn = await magic.user.isLoggedIn();
  //     if (isLoggedIn) {
  //       // route to /
  //       router.push("/");
  //     } else {
  //       // route to /login
  //       router.push("/login");
  //     }
  //   };
  //   handleLoggedIn();
  // }, []);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return isLoading ? (
    <Loading />
  ) : (
    <main className={robotoSlab.className}>
      <Component {...pageProps} />
    </main>
  );
}
