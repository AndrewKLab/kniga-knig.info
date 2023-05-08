import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalActions, ModalBody, ModalHeader } from "../UI";
import { Organization } from "../../../public/_interfaces";

export interface RemoveOrganizationModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    isOpen: boolean;
    setIsOpen: any;
    item: Organization | null;
    onDelete: any;

    delete_organization_loading: boolean,
    delete_organization_message: string | null,
    delete_organization_error: string | null,
    delete_organization: any,
}

const RemoveOrganizationModal: FunctionComponent<RemoveOrganizationModalProps> = ({
    children,
    className,

    isOpen,
    setIsOpen,
    item,
    onDelete,

    delete_organization_loading,
    delete_organization_message,
    delete_organization_error,
    delete_organization,
    ...other
}) => {

    return isOpen ?
        <Modal centered isOpen={isOpen} setIsOpen={setIsOpen}>
            <ModalHeader setIsOpen={setIsOpen}>Удалить организацию</ModalHeader>
            <ModalBody>
                Вы действительно хотите удалить организацию {`"${item?.kk_organization_name}"`}? Вместе с ней будут удалены все записи о сотрудниках.
            </ModalBody>
            <ModalActions>
                <Button color={'primary'} onClick={onDelete} loading={delete_organization_loading} disabled={delete_organization_loading}>Удалить</Button>
                <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
            </ModalActions>
        </Modal> : null
} 

function mapStateToProps(state) {
    const {
        delete_organization_loading,
        delete_organization_message,
        delete_organization_error,
        delete_organization,
    } = state.organizations;
    return {
        delete_organization_loading,
        delete_organization_message,
        delete_organization_error,
        delete_organization,
    };
}
const connectedRemoveOrganizationModal = connect(mapStateToProps)(RemoveOrganizationModal);
export { connectedRemoveOrganizationModal as RemoveOrganizationModal };