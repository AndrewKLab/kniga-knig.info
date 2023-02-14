import React, { FunctionComponent } from "react";
import { InputError } from "../UI";
import { Answer } from "./Answers";
import './index.css'
import parse from 'html-react-parser';

export interface QuestionProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactElement
    className?: string;
    question: object;
    register: any;
    errors: object;
}

export const Question: FunctionComponent<QuestionProps> = ({ children, className, question, register, errors, ...other }) => {
    return (
        <div className={`question${className ? ` ${className}` : ''}`} {...other}>
            <div className={`question_header`}>
                <div className={`course_page_lessons_list_item_reactangle`}></div>
                <h5 className={`question_title`}>{parse(question?.kk_question_text)}</h5>
                {children}
            </div>
            {question.answers && question.answers.length > 0 &&
                <div className={`question_answers`}>
                    {question.answers.map((answer, index) => <Answer key={answer.kk_qa_id} question={question} answer={answer} register={register} />)}
                </div>
            }
            <InputError errors={errors} name={`q${question.kk_question_id}`} />
        </div>
    )
} 