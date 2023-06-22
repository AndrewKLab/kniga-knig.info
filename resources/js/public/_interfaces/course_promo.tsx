import { CourseUserProgress } from "./course_user_progress";
import { Lesson } from "./lesson";
import { LessonUserProgress } from "./lesson_user_progress";

export interface CoursePromo {
    kk_cp_id : number;
    kk_cp_course_id: number;
    kk_cp_published: number;
    kk_cp_name: string | null;
    kk_cp_sub_name: string | null;
    kk_cp_description: string | null;
    kk_cp_image: string | null;
    kk_cp_created_at: string | null;
    kk_cp_updated_at: string | null;
    lessons?: Array<Lesson>;
    lessons_count?: number;
    course_users_progress?: Array<CourseUserProgress>;
    lessons_users_progress?: Array<LessonUserProgress>;
}