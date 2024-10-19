import { redirect } from "next/navigation";

export async function POST(request) {
  const { user, pin } = await request.json();
  const isUser = getUser(user, Number(pin));

  if (!isUser) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Redirect if login is successful
  return redirect("/account");
}
