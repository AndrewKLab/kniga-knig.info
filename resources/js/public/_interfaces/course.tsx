import { CourseUserProgress } from "./course_user_progress";
import { Lesson } from "./lesson";
import { LessonUserProgress } from "./lesson_user_progress";

export interface Course {
    kk_course_id: number;
    kk_course_categoty_id: number;
    kk_course_autor_id: number;
    kk_course_published: number;
    kk_course_name: string | null;
    kk_course_description: string | null;
    kk_course_image: string | null;
    kk_course_created_at: string | null;
    kk_course_updated_at: string | null;
    category?: object;
    lessons?: Array<Lesson>;
    lessons_count?: number;
    course_users_progress?: Array<CourseUserProgress>;
    lessons_users_progress?: Array<LessonUserProgress>;
}