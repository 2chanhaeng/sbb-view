import { getPostInitFromForm } from "@/utils/form";
import { redirect } from "next/navigation";

export default function Signup() {
  return (
    <main>
      <form
        action={postSignup}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "20rem",
        }}
      >
        <label>
          <b>Username</b>
        </label>
        <input
          name="username"
          style={{
            flex: 1,
          }}
        />
        <label>
          <b>Password</b>
        </label>
        <input
          name="password"
          type="password"
          style={{
            flex: 1,
          }}
        />
        <label>
          <b>Email</b>
        </label>
        <input
          name="email"
          type="email"
          style={{
            flex: 1,
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

async function postSignup(form: FormData) {
  "use server";
  const init = getPostInitFromForm(["username", "password", "email"])(form);
  const res = await fetch(`${process.env.API_URL}/user/signup`, init);
  console.log(res);
  console.log("text", await res.clone().text());
  const { success, message } = await res.json();
  if (success) return redirect("/login");
  return redirect(`/signup?error=${message}`);
}
