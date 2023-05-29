import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Image, Modal, ModalBody, ModalHeader, } from "../../../public/_components/UI";


export interface ImageModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    isOpen: boolean;
    setIsOpen: any;
    image_modal_src: string;
}

const ImageModal: FunctionComponent<ImageModalProps> = ({
    children,
    className,

    isOpen,
    setIsOpen,

    image_modal_src,
    ...other
}) => {


    return isOpen ?
        <Modal centered isOpen={isOpen} setIsOpen={setIsOpen}>
            <ModalHeader setIsOpen={setIsOpen}></ModalHeader>
            <ModalBody className="p-0">
                <Image src={image_modal_src} width="100%" />
            </ModalBody>
        </Modal> : null
}

function mapStateToProps(state) {
    const {
        image_modal_src
    } = state.modals;
    return {
        image_modal_src
    };
}
const connectedImageModal = connect(mapStateToProps)(ImageModal);
export { connectedImageModal as ImageModal };