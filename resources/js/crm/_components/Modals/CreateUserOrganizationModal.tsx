import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, ControlledSelect, Modal, ModalActions, ModalBody, ModalHeader } from "../UI";
import { organizationsActions, usersActions } from "../../_actions";
import { Alert, Form, InputError, Label, TextInput } from "../../../public/_components/UI";
import { useForm } from "react-hook-form";
import { Organization, User } from "../../../public/_interfaces";

export interface CreateUserOrganizationModalProps extends React.HTMLAttributes<HTMLDivElement> {
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

    get_all_organizations_loading: boolean,
    get_all_organizations_message: null | string,
    get_all_organizations_error: null | string,
    get_all_organizations: null | User[],
}

const CreateUserOrganizationModal: FunctionComponent<CreateUserOrganizationModalProps> = ({
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

    get_all_organizations_loading,
    get_all_organizations_message,
    get_all_organizations_error,
    get_all_organizations,
    ...other
}) => {
    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm();

    useEffect(() => {
        const init = async () => {
            await dispatch(organizationsActions.getAll({ parts: 'type' }))
        }
        init();
    }, [])

    return isOpen ?
        <Modal centered isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form id="organizations_users_from" onSubmit={handleSubmit(onCreate)}>
                <ModalHeader setIsOpen={setIsOpen}>Добавить пользователя в организацию</ModalHeader>
                <ModalBody>
                    <TextInput
                        {...register('kk_ou_user_id')}
                        type={`hidden`}
                        id={`kk_ou_user_id`}
                        name={`kk_ou_user_id`}
                        defaultValue={data.kk_user_id}
                    />
                    {get_all_organizations ?
                        <React.Fragment>

                            <Label htmlFor="kk_ou_organization_id">Организация:</Label>
                            <ControlledSelect
                                control={control}
                                name={`kk_ou_organization_id`}
                                placeholder={`Выберите организацию...`}
                                options={get_all_organizations?.map(org => ({ label: `${org?.type?.kk_ot_name} - ${org.kk_organization_name}`, value: org.kk_organization_id }))}
                                defaultValue={null}
                            />

                            <InputError errors={create_organizations_users_errors} name={'kk_ou_organization_id'} />
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
        get_all_organizations_loading,
        get_all_organizations_message,
        get_all_organizations_error,
        get_all_organizations,
    } = state.organizations;
    return {
        create_organizations_users_loading,
        create_organizations_users_message,
        create_organizations_users_errors,
        create_organizations_users_error_message,
        create_organization_users,

        get_all_organizations_loading,
        get_all_organizations_message,
        get_all_organizations_error,
        get_all_organizations,
    };
}
const connectedCreateUserOrganizationModal = connect(mapStateToProps)(CreateUserOrganizationModal);
export { connectedCreateUserOrganizationModal as CreateUserOrganizationModal };