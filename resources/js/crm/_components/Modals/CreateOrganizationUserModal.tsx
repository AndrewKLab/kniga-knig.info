import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, ControlledSelect, Modal, ModalActions, ModalBody, ModalHeader } from "../UI";
import { usersActions } from "../../_actions";
import { Alert, Form, InputError, Label, TextInput } from "../../../public/_components/UI";
import { useForm } from "react-hook-form";
import { Organization, User } from "../../../public/_interfaces";

export interface CreateOrganizationUserModalProps extends React.HTMLAttributes<HTMLDivElement> {
    dispatch: any;
    children?: React.ReactElement | React.ReactElement[];
    className?: string;

    data: Organization;
    isOpen: boolean;
    setIsOpen: any;
    onCreate: any;

    create_organizations_users_loading: boolean,
    create_organizations_users_message: null | string,
    create_organizations_users_errors: null | [],
    create_organizations_users_error_message: null | string,
    create_organization_users: null | object,

    get_all_users_loading: boolean,
    get_all_users_message: null | string,
    get_all_users_error: null | string,
    get_all_users: null | User[],
}

const CreateOrganizationUserModal: FunctionComponent<CreateOrganizationUserModalProps> = ({
    dispatch,
    children,
    className,

    data,
    isOpen,
    setIsOpen,
    onCreate,

    create_organizations_users_loading,
    create_organizations_users_message,
    create_organizations_users_errors,
    create_organizations_users_error_message,
    create_organization_users,

    get_all_users_loading,
    get_all_users_message,
    get_all_users_error,
    get_all_users,
    ...other
}) => {
    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm();

    useEffect(() => {
        const init = async () => {
            await dispatch(usersActions.getAll({ parts: 'role' }))
        }
        init();
    }, [])

    return isOpen ?
        <Modal centered isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form id="organizations_users_from" onSubmit={handleSubmit(onCreate)}>
                <ModalHeader setIsOpen={setIsOpen}>Добавить члена организации</ModalHeader>
                <ModalBody>
                    <TextInput
                        {...register('kk_ou_organization_id')}
                        type={`hidden`}
                        id={`kk_ou_organization_id`}
                        name={`kk_ou_organization_id`}
                        defaultValue={data.kk_organization_id}
                    />
                    {get_all_users ?
                        <React.Fragment>

                            <Label htmlFor="kk_ou_user_id">Пользователь:</Label>
                            <ControlledSelect
                                control={control}
                                name={`kk_ou_user_id`}
                                placeholder={`Выберите пользователя...`}
                                options={get_all_users?.map(user => ({ label: `${user?.role?.kk_role_name} - ${user.kk_user_lastname} ${user.kk_user_firstname}`, value: user.kk_user_id }))}
                                defaultValue={null}
                            />

                            <InputError errors={create_organizations_users_errors} name={'kk_ou_user_id'} />
                        </React.Fragment>
                        : <React.Fragment></React.Fragment>
                    }
                </ModalBody>
                <ModalActions>
                    {create_organizations_users_error_message && <Alert message={create_organizations_users_error_message} type={'danger'} />}
                    {create_organizations_users_message && <Alert message={create_organizations_users_message} type={'success'} />}
                    <Button color={'primary'} type="submit" loading={create_organizations_users_loading} disabled={create_organizations_users_loading}>Добавить</Button>
                    <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
                </ModalActions>
            </Form>
        </Modal> : null
}

function mapStateToProps(state) {
    const {
        create_organizations_users_loading,
        create_organizations_users_message,
        create_organizations_users_errors,
        create_organizations_users_error_message,
        create_organization_users,
    } = state.organizations_users;
    const {
        get_all_users_loading,
        get_all_users_message,
        get_all_users_error,
        get_all_users,
    } = state.users;
    return {
        create_organizations_users_loading,
        create_organizations_users_message,
        create_organizations_users_errors,
        create_organizations_users_error_message,
        create_organization_users,

        get_all_users_loading,
        get_all_users_message,
        get_all_users_error,
        get_all_users,
    };
}
const connectedCreateOrganizationUserModal = connect(mapStateToProps)(CreateOrganizationUserModal);
export { connectedCreateOrganizationUserModal as CreateOrganizationUserModal };