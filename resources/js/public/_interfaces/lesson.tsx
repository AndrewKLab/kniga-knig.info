import { Course } from "./course";
import { CourseUserProgress } from "./course_user_progress";
import { Question } from "./question";

export interface Lesson {
    kk_lesson_id: number;
    kk_lesson_course_id: number;
    kk_lesson_autor_id: number | null;
    kk_lesson_number: number;
    kk_lesson_published: number;
    kk_lesson_name: string | null;
    kk_lesson_description: string | null;
    kk_lesson_text: string | null;
    kk_lesson_image: string | null;
    kk_lesson_audio: string | null;
    kk_lesson_video: string | null;
    kk_lesson_created_at: string | null;
    kk_lesson_updated_at: string | null;
    course?: Course | null;
    course_users_progress?: CourseUserProgress | null;
    questions?: Array<Question> | null;
}