export interface LessonUserProgress {
    kk_lup_id: number;
    kk_lup_cup_id: number;
    kk_lup_user_id: number;
    kk_lup_course_id: number;
    kk_lup_lesson_id: number;
    kk_lup_status: string | null;
    kk_lup_assessment: number | null;
    kk_lup_checked: number;
    kk_lup_started_at: string | null;
    kk_lup_finished_at: string | null;
    kk_lup_created_at: string | null;
    kk_lup_updated_at: string | null;
}