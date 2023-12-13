import { Answer } from "./answer";

export interface Question {
  id: number;
  subject: string;
  content: string;
  createDate: string;
  answerList: Answer[];
}
