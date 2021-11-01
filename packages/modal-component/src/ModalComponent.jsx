import React from 'react';
import Modal from '@splunk/react-ui/Modal';
import T from 'prop-types';

import DataTable from './DataTable';
import { ModalStyle, ModalBodyStyle } from './ModalComponentStyles';

const ModalComponent = ({ handleRequestClose, region, open }) => {
    return (
        <Modal onRequestClose={handleRequestClose} open={open} style={ModalStyle}>
            <Modal.Header title={`${region} region cheaters`} onRequestClose={handleRequestClose} />
            <Modal.Body style={ModalBodyStyle}>
                <DataTable region={region} />
            </Modal.Body>
        </Modal>
    );
};

ModalComponent.propTypes = {
    handleRequestClose: T.func,
    region: T.string,
    open: T.bool,
};

export default ModalComponent;
