import moment from "moment";
import { CourseUserProgress, LessonUserProgress, Question, QuestionAnswer, QuestionUserAnswer } from "../_interfaces";

export const localCoursesUserProgressHelper = {
    getCUP,
    setCUP,
    getLastCUPID,
    getOneCUPByID,
    getOneCUPByCourseID,
    createCUP,

    getLUP,
    setLUP,
    getLastLUPID,
    getOneLUPByID,
    getOneLUPByCourseIDAndLessonID,
    getAllLUPByCourseID,
    createLUP,
    updateLUP,

    getQUA,
    setQUA,
    getLastQUAID,
    getOneQUAByID,
    getOneQUAByLUPIDAndQuestionID,
    prepareQUAAndCreate,
    setQUAToReducer,
    createQUA,
};

// CUP
function getCUP() {
    let courses_user_progress = localStorage.getItem('courses_user_progress');
    if (courses_user_progress) return JSON.parse(courses_user_progress);
    else {
        localStorage.setItem('courses_user_progress', 'null');
        return null;
    }
}

function setCUP(progress: CourseUserProgress[]) {
    localStorage.setItem('courses_user_progress', JSON.stringify(progress));
}

function getLastCUPID() {
    let courses_user_progress = getCUP();
    let cup_id = 0;
    if (courses_user_progress && courses_user_progress.length > 0) courses_user_progress.forEach((cup: CourseUserProgress, index: number) => {
        if (cup.kk_cup_id > cup_id) cup_id = cup.kk_cup_id;
    });
    return cup_id;
}

function getOneCUPByID(kk_cup_id: number) {
    let courses_user_progress = getCUP();
    if (courses_user_progress && courses_user_progress.length > 0) return courses_user_progress.find((cup: CourseUserProgress) => cup.kk_cup_id == kk_cup_id);
}

function getOneCUPByCourseID(kk_cup_course_id: number) {
    let courses_user_progress = getCUP();
    if (courses_user_progress && courses_user_progress.length > 0) return courses_user_progress.find((cup: CourseUserProgress) => cup.kk_cup_course_id == kk_cup_course_id);
}

function createCUP(kk_cup_course_id: number) {
    let courses_user_progress = getCUP();
    let cup_id = getLastCUPID() + 1;
    let course_user_progress: CourseUserProgress = {
        kk_cup_id: cup_id,
        kk_cup_user_id: 0,
        kk_cup_course_id: kk_cup_course_id,
        kk_cup_status: 'inprocess',
        kk_cup_assessment: null,
        kk_cup_started_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        kk_cup_finished_at: null,
        kk_cup_created_at: null,
        kk_cup_updated_at: null,
    }
    let cupByID = getOneCUPByID(cup_id);
    let cupByCourseID = getOneCUPByCourseID(kk_cup_course_id);
    if (!cupByID && !cupByCourseID) {
        if (courses_user_progress) setCUP([...courses_user_progress, course_user_progress])
        else setCUP([course_user_progress])
    }
}

// LUP
function getLUP() {
    let lessons_user_progress = localStorage.getItem('lessons_user_progress');
    if (lessons_user_progress) return JSON.parse(lessons_user_progress);
    else {
        localStorage.setItem('lessons_user_progress', 'null');
        return null;
    }
}

function setLUP(progress: LessonUserProgress[]) {
    localStorage.setItem('lessons_user_progress', JSON.stringify(progress));
}

function getLastLUPID() {
    let lessons_user_progress = getLUP();
    let lup_id = 0;
    if (lessons_user_progress && lessons_user_progress.length > 0) lessons_user_progress.forEach((lup: LessonUserProgress, index: number) => {
        if (lup.kk_lup_id > lup_id) lup_id = lup.kk_lup_id;
    });
    return lup_id;
}

function getOneLUPByID(kk_lup_id: number) {
    let lessons_user_progress = getLUP();
    if (lessons_user_progress && lessons_user_progress.length > 0) return lessons_user_progress.find((lup: LessonUserProgress) => lup.kk_lup_id == kk_lup_id);
}

function getOneLUPByCourseIDAndLessonID(kk_lup_course_id: number, kk_lup_lesson_id: number) {
    let lessons_user_progress = getLUP();
    if (lessons_user_progress && lessons_user_progress.length > 0) return lessons_user_progress.find((lup: LessonUserProgress) => lup.kk_lup_course_id == kk_lup_course_id && lup.kk_lup_lesson_id == kk_lup_lesson_id);
}

function getAllLUPByCourseID(kk_lup_course_id: number) {
    let lessons_user_progress = getLUP();
    if (lessons_user_progress && lessons_user_progress.length > 0) return lessons_user_progress.filter((lup: LessonUserProgress) => lup.kk_lup_course_id == kk_lup_course_id);
}

function createLUP(kk_lup_course_id: number, kk_lup_lesson_id: number,) {
    let lessons_user_progress = getLUP();
    let cupByCourseID = getOneCUPByCourseID(kk_lup_course_id);
    if (cupByCourseID) {
        let lup_id = getLastLUPID() + 1;
        let lesson_user_progress: LessonUserProgress = {
            kk_lup_id: lup_id,
            kk_lup_cup_id: cupByCourseID.cup_id,
            kk_lup_user_id: 0,
            kk_lup_course_id: kk_lup_course_id,
            kk_lup_lesson_id: kk_lup_lesson_id,
            kk_lup_status: 'inprocess',
            kk_lup_assessment: null,
            kk_lup_checked: 0,
            kk_lup_started_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            kk_lup_finished_at: null,
            kk_lup_created_at: null,
            kk_lup_updated_at: null,
        }
        let lupByID = getOneLUPByID(lup_id);
        let isLUPExist = getOneLUPByCourseIDAndLessonID(kk_lup_course_id, kk_lup_lesson_id);
        if (!lupByID && !isLUPExist) {
            if (lessons_user_progress) setLUP([...lessons_user_progress, lesson_user_progress])
            else setLUP([lesson_user_progress])
        }
    }
}

function updateLUP(kk_lup_id: number, params: LessonUserProgress) {
    let lessons_user_progress = getLUP();
    let new_lessons_user_progress = lessons_user_progress.map((lup: LessonUserProgress) => lup.kk_lup_id == kk_lup_id ? { ...lup, ...params } : lup)
    setLUP(new_lessons_user_progress)
}

// QUA
function getQUA() {
    let questions_users_answers = localStorage.getItem('questions_users_answers');
    if (questions_users_answers) return JSON.parse(questions_users_answers);
    else {
        localStorage.setItem('questions_users_answers', 'null');
        return null;
    }
}

function setQUA(progress: QuestionUserAnswer[]) {
    localStorage.setItem('questions_users_answers', JSON.stringify(progress));
}

function getLastQUAID() {
    let questions_users_answers = getQUA();
    let qua_id = 0;
    if (questions_users_answers && questions_users_answers.length > 0) questions_users_answers.forEach((lup: QuestionUserAnswer, index: number) => {
        if (lup.kk_qua_id > qua_id) qua_id = lup.kk_qua_id;
    });
    return qua_id;
}

function getOneQUAByID(kk_qua_id: number) {
    let questions_users_answers = getQUA();
    if (questions_users_answers && questions_users_answers.length > 0) return questions_users_answers.find((qua: QuestionUserAnswer) => qua.kk_qua_id == kk_qua_id);
}

function getOneQUAByLUPIDAndQuestionID(kk_qua_lup_id: number, kk_qua_question_id: number) {
    let questions_users_answers = getQUA();
    if (questions_users_answers && questions_users_answers.length > 0) return questions_users_answers.find((qua: QuestionUserAnswer) => qua.kk_qua_lup_id == kk_qua_lup_id && qua.kk_qua_question_id == kk_qua_question_id);
}

function prepareQUAAndCreate(lup: LessonUserProgress, data: any, questions?: Question[] | null) {
    // console.log(lup, data, questions)
    let errors = {};
    let all_question_user_answers: object[] = [];
    let all_questions_with_user_answers: object[] = [];
    if (questions && questions.length > 0) {

        Object.keys(data).forEach((key) => {
            let kk_qua_question_id = Number(key.slice(1));
            let question = questions.find((q: Question) => q.kk_question_id == kk_qua_question_id);
            if (question && data[key]) all_questions_with_user_answers = [...all_questions_with_user_answers, question];
            if (question?.answers && question?.answers.length > 0) {

                let question_user_answers: object[] = [];
                let user_answer: object | null = null;
                if (question.kk_question_type === 'checkbox' && Array.isArray(data[key])) {
                    data[key].forEach((element: number) => {
                        if (question?.answers && question?.answers.length > 0) {
                            let answer = question.answers.find((a: QuestionAnswer) => a.kk_qa_id == element);
                            if (answer) user_answer = {
                                kk_qua_lup_id: lup.kk_lup_id,
                                kk_qua_question_id: answer.kk_qa_question_id,
                                kk_qua_answer_id: answer.kk_qa_id,
                                kk_qua_text: null,
                                kk_qua_correct: answer.kk_qa_correct
                            };
                            if (user_answer) {
                                question?.answers.forEach((e) => {
                                    if (e.kk_qa_id === user_answer.kk_qua_answer_id) e.user_answer = user_answer
                                })
                                question_user_answers = [...question_user_answers, user_answer]
                            }
                        }
                    });
                }
                else if (question.kk_question_type === 'radio' && data[key]) {
                    let answer = question.answers.find((a: QuestionAnswer) => a.kk_qa_id == data[key]);
                    if (answer) user_answer = {
                        kk_qua_lup_id: lup.kk_lup_id,
                        kk_qua_question_id: answer.kk_qa_question_id,
                        kk_qua_answer_id: answer.kk_qa_id,
                        kk_qua_text: null,
                        kk_qua_correct: answer.kk_qa_correct
                    };

                    if (user_answer) {
                        question?.answers.forEach((e) => {
                            if (e.kk_qa_id === user_answer.kk_qua_answer_id) e.user_answer = user_answer
                        })
                        question_user_answers = [...question_user_answers, user_answer]
                    }
                }
                else if (question.kk_question_type === 'text' && data[key]) {
                    let answer = question.answers.find((a: QuestionAnswer) => a.kk_qa_question_id == kk_qua_question_id);

                    if (answer) user_answer = {
                        kk_qua_lup_id: lup.kk_lup_id,
                        kk_qua_question_id: kk_qua_question_id,
                        kk_qua_answer_id: answer?.kk_qa_id,
                        kk_qua_text: data[key],
                        kk_qua_correct: 0
                    };

                    if (user_answer) {
                        question?.answers.forEach((e) => {
                            if (e.kk_qa_id === user_answer.kk_qua_answer_id) e.user_answer = user_answer
                        })
                        question_user_answers = [...question_user_answers, user_answer]
                    }
                }



                all_question_user_answers = [...all_question_user_answers, ...question_user_answers]
            }


        });
    }
    if (questions && questions?.length > 0) questions.forEach((qes) => {
        let q = all_questions_with_user_answers.find((q) => q.kk_question_id == qes.kk_question_id);
        if (!q) errors = { ...errors, [`q${qes.kk_question_id}`]: ["Это поле обязательно для заполнения!"] }
    })
    console.log(errors)
    if (Object.keys(errors).length > 0) return {
        ok: false,
        message: 'Ошибка валидации!',
        data: errors,
    }
    else {
        console.log(questions)
        all_question_user_answers.forEach((aqua) => createQUA(aqua))
        return {
            ok: true,
            message: 'Запись успешно изменена!',
        }
    }


}
function setQUAToReducer(questions?: Question[]) {
    let questions_users_answers = getQUA();
    let new_questions: Question[] = [];
    if ((questions && questions.length > 0)) questions.forEach((question) => {
        new_questions = [...new_questions, {
            ...question,
            answers: question?.answers?.map((answer) => {
                let user_answer = null
                if (questions_users_answers && questions_users_answers.length > 0) user_answer = questions_users_answers.find((ua) => answer.kk_qa_id === ua.kk_qua_answer_id)
                return {
                    ...answer,
                    user_answer: user_answer
                }
            })
        }]
    })
    return new_questions;
}

function createQUA(params: { kk_qua_lup_id: number, kk_qua_question_id: number, kk_qua_answer_id: number, kk_qua_text: string | null, kk_qua_correct: number }) {
    let questions_users_answers = getQUA();
    let lupByID = getOneLUPByID(params.kk_qua_lup_id);
    if (lupByID) {
        let qua_id = getLastQUAID() + 1;
        let question_user_answer: QuestionUserAnswer = {
            kk_qua_id: qua_id,
            kk_qua_user_id: 0,
            kk_qua_lup_id: lupByID.kk_lup_id,
            kk_qua_question_id: params.kk_qua_question_id,
            kk_qua_answer_id: params.kk_qua_answer_id,
            kk_qua_text: params.kk_qua_text,
            kk_qua_correct: params.kk_qua_correct,
            kk_qua_created_at: null,
            kk_qua_updated_at: null,
        }
        let quaByID = getOneQUAByID(qua_id);
        let isQUAExist = getOneQUAByLUPIDAndQuestionID(lupByID.kk_lup_id, params.kk_qua_question_id);
        if (!quaByID && !isQUAExist) {
            if (questions_users_answers) setQUA([...questions_users_answers, question_user_answer])
            else setQUA([question_user_answer])
        }
    }
}