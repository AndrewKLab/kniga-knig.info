import React, { FunctionComponent } from "react";
import { Checkbox, Radio, TextInput } from "../../../../public/_components/UI";
import { DoneCircleIcon, XCircleIcon } from "../../../../public/_components/UI/Icons";
import './index.css'

export interface AnswerProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactElement
    className?: string;
    question: object;
    answer: object;
    register: any;
}

export const Answer: FunctionComponent<AnswerProps> = ({ children, className, question, answer, register, ...other }) => {

    const AnswerIcon = ({ question, answer }) => {
        let user_answers = question.answers.filter(a => a?.user_answer)

        if (answer?.user_answer?.kk_qua_correct === 1 && user_answers.length > 0) return <DoneCircleIcon className={`question_answer_icon done`} size={25} color={`rgba(var(--alert-danger-color))`} />
        else if (answer?.user_answer?.kk_qua_answer_id === answer.kk_qa_id) return <XCircleIcon className={`question_answer_icon`} size={25} color={`rgba(var(--alert-danger-color))`} />
        else return null;
    }

    switch (question.kk_question_type) {
        case 'text':
            return (
                <div className={`question_answer${className ? ` ${className}` : ''}`} {...other}>
                    <TextInput
                        {...register(`q${question.kk_question_id}`)}
                        id={`${question.kk_question_id}_answer_${answer.kk_qa_id}`}
                        name={`q${question.kk_question_id}`}
                        placeholder={`Введите ответ...`}
                        value={answer?.user_answer?.kk_qua_answer_id === answer?.kk_qa_id ? answer?.user_answer?.kk_qua_text : undefined}
                    />
                </div>
            )
        case 'radio':
            return (
                <div className={`question_answer${className ? ` ${className}` : ''}`} {...other}>
                    <AnswerIcon question={question} answer={answer} />
                    <Radio
                        {...register(`q${question.kk_question_id}`)}
                        label={answer.kk_qa_text}
                        id={`${question.kk_question_id}_answer_${answer.kk_qa_id}`}
                        name={`q${question.kk_question_id}`}
                        value={answer.kk_qa_id}
                        checked={answer?.user_answer?.kk_qua_answer_id === answer.kk_qa_id ? true : undefined}
                    />
                </div>
            )
        case 'checkbox':
            return (
                <div className={`question_answer${className ? ` ${className}` : ''}`} {...other}>
                    <AnswerIcon question={question} answer={answer} />
                    <Checkbox
                        {...register(`q${question.kk_question_id}`)}
                        label={answer.kk_qa_text}
                        id={`${question.kk_question_id}_answer_${answer.kk_qa_id}`}
                        name={`q${question.kk_question_id}`}
                        value={answer.kk_qa_id}
                        checked={answer?.user_answer?.kk_qua_answer_id === answer.kk_qa_id ? true : undefined}
                    />
                </div>
            )


        default:
            return 'Неизвестный тип вопроса';
    }


} 