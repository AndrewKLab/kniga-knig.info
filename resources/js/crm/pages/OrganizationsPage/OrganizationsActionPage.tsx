import React, { FunctionComponent, useEffect, useState, useCallback } from "react";
import { connect } from 'react-redux';
import { Button, Col, Form, Image, Row, Label, InputGroup, TextInput, InputError, TextArea, Alert, InputGroupText, ControlledSelect, Checkbox } from '../../_components/UI';
import { User } from '../../_interfaces';
import { usersActions, pagesActions, settingsActions, organizationsTypesActions, organizationsUsersActions } from "../../_actions";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import './index.css';
import { CreateOrganizationUserModal, FinishCourseButton, ImageDropzone, PageLoader, Question, TextEditor } from "../../_components";
import { NoMatchPage, OrganizationsUsersTable } from "../";
import moment from 'moment';
import 'moment/dist/locale/ru';
import { organizationsActions } from "../../_actions/organizations.actions";
import { Organization, OrganizationType } from "../../../public/_interfaces";
import { IconButton } from "../../../public/_components/UI";
import { PlusUserIcon } from "../../../public/_components/UI/Icons";



type OrganizationsActionPageProps = {
    dispatch: any;

    create_organization_loading: boolean;
    create_organization_message: string | null,
    create_organization_errors: Array<any> | null,
    create_organization_error_message: string | null,
    create_organization: object | null,

    update_organization_loading: boolean,
    update_organization_message: string | null,
    update_organization_errors: Array<any> | null,
    update_organization_error_message: string | null,
    update_organization: object | null,

    get_one_by_id_organization_loading: boolean,
    get_one_by_id_organization_message: string | null,
    get_one_by_id_organization_error: string | null,
    get_one_by_id_organization: Organization | null,

    get_all_organizations_loading: boolean,
    get_all_organizations_message: string | null,
    get_all_organizations_error: string | null,
    get_all_organizations: Organization[] | null,

    get_all_organizations_types_loading: boolean,
    get_all_organizations_types_message: string | null,
    get_all_organizations_types_error: string | null,
    get_all_organizations_types: OrganizationType[] | null,
}

const OrganizationsActionPage: FunctionComponent<OrganizationsActionPageProps> = ({
    dispatch,

    create_organization_loading,
    create_organization_message,
    create_organization_errors,
    create_organization_error_message,
    create_organization,

    update_organization_loading,
    update_organization_message,
    update_organization_errors,
    update_organization_error_message,
    update_organization,

    get_one_by_id_organization_loading,
    get_one_by_id_organization_message,
    get_one_by_id_organization_error,
    get_one_by_id_organization,

    get_all_organizations_loading,
    get_all_organizations_message,
    get_all_organizations_error,
    get_all_organizations,

    get_all_organizations_types_loading,
    get_all_organizations_types_message,
    get_all_organizations_types_error,
    get_all_organizations_types,
}): JSX.Element => {
    let navigate = useNavigate();
    let { action, kk_organization_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [noMatch, setNoMatch] = useState(false);
    const [isOpenCreateOrganizationUserModal, setIsOpenCreateOrganizationUserModal] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm();

    useEffect(() => {
        const init = async () => {
            await dispatch(pagesActions.openPage())
            await dispatch(organizationsActions.getAll({ parts: `type,parrent` }));
            await dispatch(organizationsTypesActions.getAll({}));
            if (action === 'create') console.log(action)
            else if (action === 'update') await dispatch(organizationsActions.getOneById({ kk_organization_id: kk_organization_id, parts: 'users' }));
            else setNoMatch(true)

            setLoading(false)
        }
        init();
    }, [kk_organization_id]);

    const userActionSubmit = async (data) => {
        if (action === 'create') {
            const create = await dispatch(organizationsActions.create(data))
            if (create?.res?.organization?.kk_organization_id) navigate(`/organizations/action/update/${create?.res?.organization?.kk_organization_id}`)
        } else if (action === 'update') await dispatch(organizationsActions.update(data))
    }

    const onCreateOrganizationUser = async (data) => {
        const create = await dispatch(organizationsUsersActions.create(data))
        if(create?.res){
            setIsOpenCreateOrganizationUserModal(false)
            await dispatch(organizationsActions.getOneById({ kk_organization_id: kk_organization_id, parts: 'users' }));
        }
    }
    const onDelteOrganizationUser = async (ou) => {
        await dispatch(organizationsUsersActions.remove({ kk_ou_id: ou.kk_ou_id }))
        await dispatch(organizationsActions.getOneById({ kk_organization_id: kk_organization_id, parts: 'users' }));
    }


    if (noMatch) return <NoMatchPage />
    if (
        loading ||
        get_all_organizations_types_loading ||
        get_all_organizations_loading ||
        get_one_by_id_organization_loading
    ) return <PageLoader />
    return (
        <div className={`users_constructor_page`}>
            <h1 className={`crm_panel_page_title`}><a className={`cursor-pointer`} onClick={() => navigate(`/organizations`)}>организации |</a>  <span>{get_one_by_id_organization ? `Изменить организацию "${get_one_by_id_organization?.kk_organization_name}"` : 'Добавить'} </span> </h1>
            <Form id="organization_from" onSubmit={handleSubmit(userActionSubmit)}>
                {action === 'update' && <TextInput
                    {...register('kk_organization_id')}
                    type={`hidden`}
                    id={`kk_organization_id`}
                    name={`kk_organization_id`}
                    defaultValue={get_one_by_id_organization?.kk_organization_id}
                />}
                <Row g={3}>
                    {get_all_organizations ?
                        <Col xs={12} lg={12}>
                            <Label htmlFor="kk_user_role_id">Родительская организация:</Label>
                            <ControlledSelect
                                control={control}
                                name={`kk_organization_parrent_id`}
                                placeholder={`Выберите родительскую организацию...`}
                                options={get_all_organizations?.map(org => ({ label: org.kk_organization_name, value: org.kk_organization_id }))}
                                defaultValue={action === 'update' ? get_one_by_id_organization?.kk_organization_parrent_id : null}
                            />

                            {action === 'create' && <InputError errors={create_organization_errors} name={'kk_organization_type_id'} />}
                            {action === 'update' && <InputError errors={update_organization_errors} name={'kk_organization_type_id'} />}
                        </Col>
                        : <React.Fragment></React.Fragment>
                    }

                    {get_all_organizations_types ?
                        <Col xs={12} lg={6}>
                            <Label htmlFor="kk_user_role_id">Тип организации:</Label>
                            <ControlledSelect
                                control={control}
                                name={`kk_organization_type_id`}
                                placeholder={`Выберите тип организации...`}
                                options={get_all_organizations_types?.map(type => ({ label: type.kk_ot_name, value: type.kk_ot_id }))}
                                defaultValue={action === 'update' ? get_one_by_id_organization?.kk_organization_type_id : 1}
                            />

                            {action === 'create' && <InputError errors={create_organization_errors} name={'kk_organization_type_id'} />}
                            {action === 'update' && <InputError errors={update_organization_errors} name={'kk_organization_type_id'} />}
                        </Col>
                        : <React.Fragment></React.Fragment>
                    }
                    <Col xs={12} lg={6}>
                        <Label htmlFor="kk_organization_name">Название:</Label>
                        <TextInput
                            {...register('kk_organization_name')}
                            className={`courses_constructor_page_input`}
                            type={`text`}
                            id={`kk_organization_name`}
                            name={`kk_organization_name`}
                            placeholder={`Введите название...`}
                            defaultValue={action === 'update' ? get_one_by_id_organization?.kk_organization_name : null}
                        />
                        {action === 'create' && <InputError errors={create_organization_errors} name={'kk_organization_name'} />}
                        {action === 'update' && <InputError errors={update_organization_errors} name={'kk_organization_name'} />}
                    </Col>



                    <Col xs={12} lg={12}>
                        <div className={`courses_constructor_lessons_editor_actions`}>
                            {action === 'create' && create_organization_error_message && <Alert message={create_organization_error_message} type={'danger'} />}
                            {action === 'update' && update_organization_error_message && <Alert message={update_organization_error_message} type={'danger'} />}

                            {action === 'create' && create_organization_message && <Alert message={create_organization_message} type={'success'} />}
                            {action === 'update' && update_organization_message && <Alert message={update_organization_message} type={'success'} />}

                            <Button type="submit" loading={create_organization_loading || update_organization_loading} disabled={create_organization_loading || update_organization_loading}>Сохранить</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
            {get_one_by_id_organization ?
                <Row g={3}>
                    <Col xs={12} lg={12}>
                        <div className={`d-flex aling-items-center gap-3 mb-3`}>
                            <h5 className={"organization_action_page_title  mb-0"}>Члены организации</h5>
                            <IconButton icon={<PlusUserIcon color={`rgba(var(--primary-color), 1)`} size={24} />} onClick={() => setIsOpenCreateOrganizationUserModal(true)} />
                        </div>

                        {get_one_by_id_organization?.users && <OrganizationsUsersTable data={get_one_by_id_organization?.users} onDelete={onDelteOrganizationUser} />}
                    </Col>
                </Row>
                : <React.Fragment></React.Fragment>
            }
            <CreateOrganizationUserModal data={get_one_by_id_organization} isOpen={isOpenCreateOrganizationUserModal} setIsOpen={setIsOpenCreateOrganizationUserModal} onCreate={onCreateOrganizationUser} />
        </div>
    )
}

function mapStateToProps(state) {
    const {
        create_organization_loading,
        create_organization_message,
        create_organization_errors,
        create_organization_error_message,
        create_organization,

        update_organization_loading,
        update_organization_message,
        update_organization_errors,
        update_organization_error_message,
        update_organization,

        get_one_by_id_organization_loading,
        get_one_by_id_organization_message,
        get_one_by_id_organization_error,
        get_one_by_id_organization,

        get_all_organizations_loading,
        get_all_organizations_message,
        get_all_organizations_error,
        get_all_organizations,
    } = state.organizations;

    const {
        get_all_organizations_types_loading,
        get_all_organizations_types_message,
        get_all_organizations_types_error,
        get_all_organizations_types,
    } = state.organizations_types;

    return {
        create_organization_loading,
        create_organization_message,
        create_organization_errors,
        create_organization_error_message,
        create_organization,

        update_organization_loading,
        update_organization_message,
        update_organization_errors,
        update_organization_error_message,
        update_organization,

        get_one_by_id_organization_loading,
        get_one_by_id_organization_message,
        get_one_by_id_organization_error,
        get_one_by_id_organization,

        get_all_organizations_loading,
        get_all_organizations_message,
        get_all_organizations_error,
        get_all_organizations,

        get_all_organizations_types_loading,
        get_all_organizations_types_message,
        get_all_organizations_types_error,
        get_all_organizations_types,
    };
}
const connectedOrganizationsActionPage = connect(mapStateToProps)(OrganizationsActionPage);
export { connectedOrganizationsActionPage as OrganizationsActionPage };