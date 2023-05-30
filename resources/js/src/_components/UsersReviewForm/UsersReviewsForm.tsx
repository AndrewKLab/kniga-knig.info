import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import './index.css';
import { Alert, Button, Form, InputError, Label, Radio, TextArea } from "../../../public/_components/UI";
import { User } from "../../../public/_interfaces";
import { useForm } from "react-hook-form";
import { StarIcon } from "../../../public/_components/UI/Icons";
import { usersReviewsActions } from "../../../public/_actions";

type UsersReviewsFormProps = {
    dispatch: any;
    user: User;

    create_users_reviews_loading: boolean,
    create_users_reviews_message: string | null,
    create_users_reviews_errors: object | null,
    create_users_reviews_error_message: string | null,
    create_users_reviews: string | null,

    kk_lesson_id: number;
}

const UsersReviewsForm: FunctionComponent<UsersReviewsFormProps> = ({
    dispatch,
    user,

    create_users_reviews_loading,
    create_users_reviews_message,
    create_users_reviews_errors,
    create_users_reviews_error_message,
    create_users_reviews,

    kk_lesson_id
}): JSX.Element => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        await dispatch(usersReviewsActions.create({ ...data, kk_ur_lesson_id: kk_lesson_id }))
        reset()
    }

    const stars = [{ value: 5 }, { value: 4 }, { value: 3 }, { value: 2 }, { value: 1 },];

    return (
        <Form className={`users_reviews_form`} onSubmit={handleSubmit(onSubmit)}>
            <div className={`users_reviews_form_title`}>Оставить отзыв</div>
            {create_users_reviews_message ? <Alert className="mt-3" type={`success`} message={create_users_reviews_message} /> : (
                <React.Fragment>
                    <div className={`users_reviews_form_text`}>Если у вас есть вопросы или вы столкнулись с трудностями при прохождении урока будем благодарны вам за ваш отзыв.</div>
                    <div className={`users_reviews_form_stars`}>
                        {stars.map((star, index) => <React.Fragment>
                            <input type={'radio'}
                                className={`users_reviews_form_stars_radio`}
                                {...register('kk_ur_assessment')}
                                id={`kk_ur_assessment_${star.value}`}
                                name={`kk_ur_assessment`}
                                value={star.value}
                            />
                            <Label htmlFor={`kk_ur_assessment_${star.value}`}>
                                <StarIcon key={star.value} size={38} color={'#e7e7e7'} />
                            </Label>

                        </React.Fragment>
                        )}
                    </div>
                    <InputError errors={create_users_reviews_errors} name={'kk_ur_assessment'} />
                    {/* <Label htmlFor={"kk_ur_text"}>Комментарий:</Label> */}
                    <TextArea
                        {...register('kk_ur_text')}
                        id="kk_ur_text"
                        name="kk_ur_text"
                        placeholder="Введите ваш комментарий..."
                    ></TextArea>
                    <InputError errors={create_users_reviews_errors} name={'kk_ur_text'} />
                    {create_users_reviews_error_message && <Alert className="mt-3" type={`danger`} message={create_users_reviews_error_message} />}
                    <Button type={`submit`} color={`primary`} className={`users_reviews_form_button`} loading={create_users_reviews_loading} disabled={create_users_reviews_loading}>Отправить</Button>
                </React.Fragment>
            )}

        </Form>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        create_users_reviews_loading,
        create_users_reviews_message,
        create_users_reviews_errors,
        create_users_reviews_error_message,
        create_users_reviews,
    } = state.users_reviews;

    return {
        user,

        create_users_reviews_loading,
        create_users_reviews_message,
        create_users_reviews_errors,
        create_users_reviews_error_message,
        create_users_reviews,
    };
}
const connectedUsersReviewsForm = connect(mapStateToProps)(UsersReviewsForm);
export { connectedUsersReviewsForm as UsersReviewsForm };