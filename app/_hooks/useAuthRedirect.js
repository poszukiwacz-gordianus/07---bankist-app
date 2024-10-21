import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAccount } from "../_context/UserAccountContext";

export default function useAuthRedirect() {
  const router = useRouter();
  const {
    state: { currentUser },
  } = useUserAccount();

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  return currentUser;
}
