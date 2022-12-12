import React, { FunctionComponent } from "react";
import { Checkbox, Radio, TextInput } from "../../UI";
import './index.css'

export interface AnswerProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactElement
    className?: string;
    question: object;
    answer: object;
    register: any;
}

export const Answer: FunctionComponent<AnswerProps> = ({ children, className, question, answer, register, ...other }) => {

    switch (question.kk_question_type) {
        case 'text':
            return (
                <div className={`question_answer${className ? ` ${className}` : ''}`} {...other}>
                    <TextInput
                        {...register(`q${question.kk_question_id}`)}
                        id={`${question.kk_question_id}_answer_${answer.kk_qa_id}`}
                        name={`q${question.kk_question_id}`}
                        placeholder={`Введите ответ...`}
                    />
                </div>
            )
        case 'radio':
            return (
                <div className={`question_answer${className ? ` ${className}` : ''}`} {...other}>
                    <Radio
                        {...register(`q${question.kk_question_id}`)}
                        label={answer.kk_qa_text}
                        id={`${question.kk_question_id}_answer_${answer.kk_qa_id}`}
                        name={`q${question.kk_question_id}`}
                        value={answer.kk_qa_id}
                    />
                </div>
            )
        case 'checkbox':
            return (
                <div className={`question_answer${className ? ` ${className}` : ''}`} {...other}>
                    <Checkbox
                        {...register(`q${question.kk_question_id}`)}
                        label={answer.kk_qa_text}
                        id={`${question.kk_question_id}_answer_${answer.kk_qa_id}`}
                        name={`q${question.kk_question_id}`}
                        value={answer.kk_qa_id}
                    />
                </div>
            )


        default:
            return 'Неизвестный тип вопроса';
    }


} 