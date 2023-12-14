import { getPostInitFromForm } from "@/utils/form";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function NewQuestionPage() {
  return (
    <main>
      <h1>New Question</h1>
      <form
        action={postQuestion}
        style={{
          flex: "1 1 0",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          width: "max(100%, 20rem)",
        }}
      >
        <fieldset
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0.5rem",
            gap: "0.5rem",
          }}
        >
          <label>Subject</label>
          <input name="subject" />
        </fieldset>
        <fieldset
          style={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            padding: "0.5rem",
            gap: "0.5rem",
          }}
        >
          <label>Content</label>
          <textarea
            name="content"
            style={{
              height: "100%",
            }}
          />
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

async function postQuestion(form: FormData) {
  "use server";
  const init = getPostInitFromForm(["subject", "content"])(form);
  const res = await fetch(`${process.env.API_URL}/question/create`, init);
  const { id } = (await res.json()) as { id: number };
  revalidateTag("question");
  redirect(`/questions/${id}`);
}
