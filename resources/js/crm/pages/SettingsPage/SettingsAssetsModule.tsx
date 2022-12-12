import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Row, Col, Button, Table, Tabs, IconButton, Modal, ModalHeader, ModalBody, Form, Checkbox, TextInput } from '../../_components/UI';
import { CoursesCard, PageLoader, RemoveCourseModal } from '../../_components';

import { User } from '../../_interfaces';
import { coursesCategoriesActions, coursesActions, settingsActions } from "../../_actions";
import { useNavigate, useSearchParams } from "react-router-dom";
import './index.css';

import moment from 'moment';
import { PenIcon, PlusCircleOutlineIcon, TrashIcon } from "../../_components/UI/Icons";
import { useForm } from "react-hook-form";




type SettingsAssetsModuleProps = {
    dispatch: any;
    user: User;

    get_all_users_roles_loading: boolean,
    get_all_users_roles_message: string | null,
    get_all_users_roles_error: string | null,
    get_all_users_roles: Array<object> | null,

    get_all_modules_loading: boolean,
    get_all_modules_message: string | null,
    get_all_modules_error: string | null,
    get_all_modules: Array<object> | null,

    add_users_roles_access_loading: boolean,
    add_users_roles_access_message: string | null,
    add_users_roles_access_error: string | null,
    add_users_roles_access: object | null,

    edit_users_roles_access_loading: boolean,
    edit_users_roles_access_message: string | null,
    edit_users_roles_access_error: string | null,
    edit_users_roles_access: object | null,

    remove_users_roles_access_loading: boolean,
    remove_users_roles_access_message: string | null,
    remove_users_roles_access_error: string | null,
    remove_users_roles_access: object | null,
}


const SettingsAssetsModule: FunctionComponent<SettingsAssetsModuleProps> = ({
    dispatch,
    user,

    get_all_users_roles_loading,
    get_all_users_roles_message,
    get_all_users_roles_error,
    get_all_users_roles,

    get_all_modules_loading,
    get_all_modules_message,
    get_all_modules_error,
    get_all_modules,

    add_users_roles_access_loading,
    add_users_roles_access_message,
    add_users_roles_access_error,
    add_users_roles_access,

    edit_users_roles_access_loading,
    edit_users_roles_access_message,
    edit_users_roles_access_error,
    edit_users_roles_access,

    remove_users_roles_access_loading,
    remove_users_roles_access_message,
    remove_users_roles_access_error,
    remove_users_roles_access,

}): JSX.Element => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState(7);
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedURA, setSelectedURA] = useState(null);

    // const { register, handleSubmit, formState: { errors } } = useForm();


    useEffect(() => {
        const init = async () => {
            await dispatch(settingsActions.getAllUsersRoles());
            await dispatch(settingsActions.getAllModules({ parts: 'kk_users_roles_access', kk_ura_role_id: selectedRole }));
            setLoading(false);
        }
        init();
    }, []);

    const showRole = async (kk_role_id) => {
        setSelectedRole(kk_role_id);
        await dispatch(settingsActions.getAllModules({ parts: 'kk_users_roles_access', kk_ura_role_id: kk_role_id }));

    }
    const addUsersRolesAccess = async (module) => {
        setSelectedModule(module)
        await dispatch(settingsActions.addUsersRolesAccess({ kk_ura_role_id: selectedRole, kk_ura_module_id: module?.kk_module_id }));
        setSelectedModule(null)
    }
    const editUsersRolesAccess = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target)
        let data = Object.fromEntries(formData);
        await dispatch(settingsActions.editUsersRolesAccess(data));
    }

    const removeUsersRolesAccess = async (kk_ura_id) => {
        setSelectedURA(kk_ura_id)
        await dispatch(settingsActions.removeUsersRolesAccess({kk_ura_id: kk_ura_id}));
        setSelectedURA(null)
    }

    const SettingsAssetsModuleTable = () => {

        return (
            <React.Fragment>
                <Table columns={columns} data={get_all_modules} disablePagination={true} />
                {get_all_modules.map(module => <Form key={module.kk_module_id} id={`kk_module_id_${module.kk_module_id}`} onSubmit={editUsersRolesAccess}></Form>)}
            </React.Fragment>
        )
    }

    const SettingsAssetsModuleTableActions = ({ module }) => {

        return (
            <div className={`settings_assets_module_table_actions`}>
                {module?.kk_users_roles_access ?
                    <React.Fragment>
                        <IconButton
                            type="submit"
                            form={`kk_module_id_${module.kk_module_id}`}
                            icon={<PenIcon size={20} color={`rgba(var(--alert-warning-color), 1)`} />}
                            loading={edit_users_roles_access == module.kk_users_roles_access.kk_ura_id && edit_users_roles_access_loading}
                            loadingSize={23}
                            title="Изменить"
                        />
                        <IconButton
                            icon={<TrashIcon size={20} color={`rgba(var(--alert-danger-color), 1)`} />}
                            loading={selectedURA == module.kk_users_roles_access.kk_ura_id && remove_users_roles_access_loading}
                            loadingSize={23}
                            title="Удалить"
                            onClick={()=>removeUsersRolesAccess(module.kk_users_roles_access.kk_ura_id)}
                        />
                    </React.Fragment>
                    :
                    <IconButton icon={<PlusCircleOutlineIcon size={20} />} title="Добавить" loading={selectedModule?.kk_module_id === module.kk_module_id && add_users_roles_access_loading} loadingSize={23} onClick={() => addUsersRolesAccess(module)} />

                }
            </div>
        )
    }



    const columns = [
        {
            Header: 'Модуль',
            accessor: row => <React.Fragment>{row.kk_module_name}{row.kk_users_roles_access && <TextInput type={`hidden`} name="kk_ura_id" form={`kk_module_id_${row.kk_module_id}`} value={row.kk_users_roles_access.kk_ura_id} />}</React.Fragment>,
        },
        {
            Header: 'Создание',
            accessor: row => row.kk_users_roles_access ? <Checkbox key={row.kk_module_id} id="kk_ura_create_access" name="kk_ura_create_access" form={`kk_module_id_${row.kk_module_id}`} defaultChecked={row.kk_users_roles_access.kk_ura_create_access === 1} value={1} /> : "Нет доступа",
        },
        {
            Header: 'Чтение',
            accessor: row => row.kk_users_roles_access ? <Checkbox key={row.kk_module_id} id="kk_ura_read_access" name="kk_ura_read_access" form={`kk_module_id_${row.kk_module_id}`} defaultChecked={row.kk_users_roles_access.kk_ura_read_access === 1} value={1} /> : "Нет доступа",
        },
        {
            Header: 'Полное чтение',
            accessor: row => row.kk_users_roles_access ? <Checkbox key={row.kk_module_id} id="kk_ura_full_read_access" name="kk_ura_full_read_access" form={`kk_module_id_${row.kk_module_id}`} defaultChecked={row.kk_users_roles_access.kk_ura_full_read_access === 1} value={1} /> : "Нет доступа",
        },
        {
            Header: 'Изменение',
            accessor: row => row.kk_users_roles_access ? <Checkbox key={row.kk_module_id} id="kk_ura_update_access" name="kk_ura_update_access" form={`kk_module_id_${row.kk_module_id}`} defaultChecked={row.kk_users_roles_access.kk_ura_update_access === 1} value={1} /> : "Нет доступа",
        },
        {
            Header: 'Удаление',
            accessor: row => row.kk_users_roles_access ? <Checkbox key={row.kk_module_id} id="kk_ura_delete_access" name="kk_ura_delete_access" form={`kk_module_id_${row.kk_module_id}`} defaultChecked={row.kk_users_roles_access.kk_ura_delete_access === 1} value={1} /> : "Нет доступа",
        },
        {
            Header: 'Действия',
            accessor: row => <SettingsAssetsModuleTableActions module={row} />,
        },

    ]



    if (loading || get_all_users_roles_loading) return <PageLoader />


    return (
        <div>
            <h2>Роли пользователей:</h2>
            <Row g={3}>
                <Col lg={3}>
                    <div className={`settings_assets_module_roles_list`}>
                        {get_all_users_roles && get_all_users_roles.length > 0 && get_all_users_roles.map((role) => (
                            <Button key={role.kk_role_id} color={selectedRole === role.kk_role_id ? "primary" : "default"} onClick={() => showRole(role.kk_role_id)}>{role.kk_role_name}</Button>
                        ))}
                    </div>
                </Col>
                <Col lg={9}>
                    {get_all_modules_loading ? <PageLoader /> : get_all_modules && <SettingsAssetsModuleTable />}
                </Col>


            </Row>
        </div>
    )
}



function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        get_all_users_roles_loading,
        get_all_users_roles_message,
        get_all_users_roles_error,
        get_all_users_roles,

        get_all_modules_loading,
        get_all_modules_message,
        get_all_modules_error,
        get_all_modules,

        add_users_roles_access_loading,
        add_users_roles_access_message,
        add_users_roles_access_error,
        add_users_roles_access,

        edit_users_roles_access_loading,
        edit_users_roles_access_message,
        edit_users_roles_access_error,
        edit_users_roles_access,

        remove_users_roles_access_loading,
        remove_users_roles_access_message,
        remove_users_roles_access_error,
        remove_users_roles_access,
    } = state.settings;

    return {
        user,
        get_all_users_roles_loading,
        get_all_users_roles_message,
        get_all_users_roles_error,
        get_all_users_roles,

        get_all_modules_loading,
        get_all_modules_message,
        get_all_modules_error,
        get_all_modules,

        add_users_roles_access_loading,
        add_users_roles_access_message,
        add_users_roles_access_error,
        add_users_roles_access,

        edit_users_roles_access_loading,
        edit_users_roles_access_message,
        edit_users_roles_access_error,
        edit_users_roles_access,

        remove_users_roles_access_loading,
        remove_users_roles_access_message,
        remove_users_roles_access_error,
        remove_users_roles_access,
    };
}
const connectedSettingsAssetsModule = connect(mapStateToProps)(SettingsAssetsModule);
export { connectedSettingsAssetsModule as SettingsAssetsModule };