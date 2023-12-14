import { Question } from "@/types/question";

interface Fetched {
  content: Question[];
  first: boolean;
  last: boolean;
  totalPages: number;
}

export default async function QuestionsPage({
  searchParams: { page: page_ = "1" },
}: {
  searchParams: { page: string };
}) {
  const page = Number(page_) - 1;
  const res = await fetch(`${process.env.API_URL}/question/list?page=${page}`, {
    next: { tags: ["question"] },
  });
  const { content, first, last, totalPages } = (await res.json()) as Fetched;
  const pages = getNeighborTenPages(page, totalPages);
  return (
    <main>
      <h1>Questions</h1>
      <ul>
        {content.map(({ id, subject }: Question) => (
          <li key={id}>
            <a href={`/questions/${id}`}>{subject}</a>
          </li>
        ))}
      </ul>
      <div>
        <SpanOrAnchor isSpan={first} page={1} textContent="First" />
        <SpanOrAnchor isSpan={first} page={page} textContent="<" />
        {pages.map((curr) => (
          <SpanOrAnchor
            isSpan={curr === page + 1}
            key={curr}
            page={curr}
            textContent={curr.toString()}
          />
        ))}
        <SpanOrAnchor isSpan={last} page={page + 2} textContent=">" />
        <SpanOrAnchor isSpan={last} page={totalPages - 1} textContent="Last" />
      </div>
      <a href="/questions/new">+ New Question</a>
    </main>
  );
}

function SpanOrAnchor({
  isSpan,
  page,
  textContent,
}: {
  isSpan: boolean;
  page: number;
  textContent: string;
}) {
  return isSpan ? (
    <span>{textContent}</span>
  ) : (
    <a href={`/questions?page=${page}`}>{textContent}</a>
  );
}

function getNeighborTenPages(page: number, totalPages: number): number[] {
  const tenUnderPage = Math.floor(page / 10) * 10;
  const length =
    totalPages - tenUnderPage > 10 ? 10 : totalPages - tenUnderPage;
  const pages = Array.from({ length }, (_, i) => tenUnderPage + i + 1);
  return pages;
}
