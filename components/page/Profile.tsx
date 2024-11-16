import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserForm } from "@/components/UserForm";
import { cookies } from "next/headers";

export async function UserProfile() {
  const cks = await cookies();
  const authToken = cks.get("next-auth.session-token")?.value;

  // Fetch user data from backend using the authToken
  const userReq = await fetch("http://frontend-backend-1:6000/users/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  const userData = await userReq.json();

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>
            View and edit your profile information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm userData={userData} />
        </CardContent>
      </Card>
    </div>
  );
}
