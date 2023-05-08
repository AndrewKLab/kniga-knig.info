import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Organization, User } from '../../../public/_interfaces';
import './index.css';
import { useNavigate } from "react-router-dom";

import moment from "moment";
import { PageLoader, PartLoader } from "../../../public/_components";
import { organizationsActions } from "../../_actions/organizations.actions";
import { OrganizationsPageTable } from "./OrganizationsPageTable";
import { PageAlert, RemoveOrganizationModal } from "../../_components";
import { Button } from "../../../public/_components/UI";


type OrganizationsPageProps = {
    dispatch: any;

    get_all_organizations_loading: boolean,
    get_all_organizations_message: null | string,
    get_all_organizations_error: null | string,
    get_all_organizations: null | Organization[],
}

const OrganizationsPage: FunctionComponent<OrganizationsPageProps> = ({
    dispatch,

    get_all_organizations_loading,
    get_all_organizations_message,
    get_all_organizations_error,
    get_all_organizations,
}): JSX.Element => {
    let navigate = useNavigate();
    const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);
    const [selectedToModal, setSelectedToModal] = useState(false);
    useEffect(() => {
        const init = async () => {
            if (!get_all_organizations_loading) await dispatch(organizationsActions.getAll({ parts: `type,parrent` }));
        }
        init();
    }, []);

    const openRemoveModal = (item) => { 
        setIsOpenRemoveModal(true)
        setSelectedToModal(item) 
    }

    const onDeleteOrganization = async () =>{
        const remove = await dispatch(organizationsActions.remove({ kk_organization_id: selectedToModal?.kk_organization_id }))
        if(remove?.res){
        
            await dispatch(organizationsActions.getAll({ parts: `type,parrent` }))
            setIsOpenRemoveModal(false);
            setSelectedToModal(null);
        }
    }

    if (get_all_organizations_loading) return <PageLoader />
    if (get_all_organizations_error) return <PageAlert type={'danger'} message={get_all_organizations_error}/>
    return (
        <div className={`organizations_page`}>
            <Button color={'primary'} className={`mb-3`} onClick={() => navigate(`/organizations/action/create`)}>Добавить</Button>
            <div>{get_all_organizations && <OrganizationsPageTable data={get_all_organizations} openRemoveModal={openRemoveModal}/>}</div>
            <RemoveOrganizationModal isOpen={isOpenRemoveModal} setIsOpen={setIsOpenRemoveModal} item={selectedToModal} onDelete={onDeleteOrganization} />

        </div>
    )
}

function mapStateToProps(state) {
    const {
        get_all_organizations_loading,
        get_all_organizations_message,
        get_all_organizations_error,
        get_all_organizations,
    } = state.organizations;
    return {

        get_all_organizations_loading,
        get_all_organizations_message,
        get_all_organizations_error,
        get_all_organizations,
    };
}
const connectedOrganizationsPage = connect(mapStateToProps)(OrganizationsPage);
export { connectedOrganizationsPage as OrganizationsPage };