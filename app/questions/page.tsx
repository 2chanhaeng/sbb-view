import { Question } from "@/types/question";

export default async function QuestionsPage() {
  const res = await fetch(`${process.env.API_URL}/question/list`, {
    next: { tags: ["question"] },
  });
  const data = await res.json();
  return (
    <main>
      <h1>Questions</h1>
      <ul>
        {data.map(({ id, subject }: Question) => (
          <li key={id}>
            <a href={`/questions/${id}`}>{subject}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
