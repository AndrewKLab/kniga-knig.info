import { LessonUserProgress } from "./lesson_user_progress";

export interface CourseUserProgress {
    kk_cup_id: number;
    kk_cup_user_id: number;
    kk_cup_course_id: number;
    kk_cup_status: string | null;
    kk_cup_assessment: number | null;
    kk_cup_started_at: string | null;
    kk_cup_finished_at: string | null;
    kk_cup_created_at: string | null;
    kk_cup_updated_at: string | null;
    lessons_users_progress?: Array<LessonUserProgress>;
}