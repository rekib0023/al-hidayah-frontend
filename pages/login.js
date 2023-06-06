import LoginForm from "@/components/LoginForm";
import { getUserType } from "@/utils/constants";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const { type } = router.query;

  return <LoginForm userType={getUserType(type)} />;
}
