import { useAuth } from "@/context/AuthProvider";
import Layout from "./Layout";

export default function ProtectedLayout({ type, children }) {
  const { user } = useAuth();
  return (
    <div>
      {user?.type === type ? (
        <Layout>{children}</Layout>
      ) : (
        <div className="flex w-screen h-screen items-center justify-center">
          <h1>You don't have access to this page</h1>
        </div>
      )}
    </div>
  );
}
