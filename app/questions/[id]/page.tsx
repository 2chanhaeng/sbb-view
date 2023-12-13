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
      <h1>{subject}</h1>
      <p>{content}</p>
      <section>
        <h2>Answers</h2>
        <ul>
          {answerList.map(({ id, content }) => (
            <li key={id}>{content}</li>
          ))}
        </ul>
        <form action={postAnswer.bind(null, id)}>
          <textarea name="content" />
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
}

async function postAnswer(id: string, form: FormData) {
  "use server";
  const init = getPostInitFromForm(["content"])(form);
  console.log(init);
  fetch(`${process.env.API_URL}/answer/create/${id}`, init);
  revalidateTag("question");
  redirect(`/questions/${id}`);
}
