import { QuestionAnswer } from "./question_answer";

export interface Question {
    kk_question_id: number;
    kk_question_lesson_id: number;
    kk_question_type: string;
    kk_question_text: string;
    kk_question_created_at: string | null;
    kk_question_updated_at: string | null;
    answers?: QuestionAnswer[] 
}