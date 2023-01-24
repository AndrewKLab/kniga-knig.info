

export function defaultAction(params, { serviceFunc, requestType, successType, failureType, }) {
    return dispatch => {
        dispatch(request(params));
        return serviceFunc(params)
            .then(
                res => dispatch(success(res)),
                error => dispatch(failure(error))
            );
    };

    function request(params) { return { type: requestType, params } }
    function success(res) { return { type: successType, res } }
    function failure(error) { return { type: failureType, error } }
}
export function getLastInprocessLesson(lessons, lups) {
    let last_lup = 0;
    if (lessons && lups) {
        lessons.forEach(lesson => {
            lups.forEach(lup => {
                if (lesson?.kk_lesson_id === lup?.kk_lup_lesson_id) last_lup = lesson?.kk_lesson_id
            });
        });
    }
    return last_lup;
}

export function getPercentageOfCorrectAnswers(questions) {
    let percentage = 0;

    let currect_answers_count = 0;
    let currect_user_answers_count = 0;

    if (questions && questions.length > 0) {
        questions.forEach(question => {
            if (question.answers && question.answers.length > 0) {
                question.answers.forEach(answer => {
                    if(answer?.kk_qa_correct === 1) currect_answers_count++;
                    if(answer?.user_answer?.kk_qua_correct === 1) currect_user_answers_count++;
                })
            }

        })
    }

    percentage = (currect_user_answers_count/currect_answers_count) * 100
    return `${percentage.toFixed(2)}%`;
}

export function hasTextQuestion(questions) {
    if (questions && questions.length > 0) {
        for(var i = 0; i < questions.length; i++) {
            if (questions[i].kk_question_type === 'text') return true;
        }
    }
    return false;
}