import { getPostInitFromForm } from "@/utils/form";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function NewQuestionPage() {
  return (
    <main>
      <h1>New Question</h1>
      <form action={postQuestion}>
        <input name="subject" />
        <textarea name="content" />
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
