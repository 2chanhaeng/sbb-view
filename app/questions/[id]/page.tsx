import { notFound, redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { Question } from "@/types/question";
import { getPostInitFromForm } from "@/utils/form";

export default async function QuestionDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const res = await fetch(`${process.env.API_URL}/question/details/${id}`, {
    next: { tags: ["question"] },
  });
  if (!res.ok) {
    return notFound();
  }
  const { subject, content, answerList } = (await res.json()) as Question;
  return (
    <main>
      <a href="/questions">
        <h2>Questions</h2>
      </a>
      <h1>{subject}</h1>
      <p
        style={{
          flex: "1",
        }}
      >
        {content}
      </p>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          width: "100%",
        }}
      >
        <h2>Answers</h2>
        <ul>
          {answerList.map(({ id, content }) => (
            <li key={id}>{content}</li>
          ))}
        </ul>
        <form action={postAnswer.bind(null, id)}>
          <fieldset
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <label>
              <b>New answer</b>
            </label>
            <textarea name="content" />
            <button type="submit">Submit</button>
          </fieldset>
        </form>
      </section>
    </main>
  );
}

async function postAnswer(id: string, form: FormData) {
  "use server";
  const init = getPostInitFromForm(["content"])(form);
  await fetch(`${process.env.API_URL}/answer/create/${id}`, init);
  revalidateTag("question");
  redirect(`/questions/${id}`);
}
