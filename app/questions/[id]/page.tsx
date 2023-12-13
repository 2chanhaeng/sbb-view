import { Question } from "@/types/question";

export default async function QuestionDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const res = await fetch(`${process.env.API_URL}/question/details/${id}`, {
    next: { tags: ["question"] },
  });
  const { subject, content } = (await res.json()) as Question;
  return (
    <main>
      <h1>{subject}</h1>
      <p>{content}</p>
    </main>
  );
}
