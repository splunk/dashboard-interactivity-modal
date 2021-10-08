import React from 'react';
import Modal from '@splunk/react-ui/Modal';

import Tab from './Tab';

const DataModal = ({ handleRequestClose, modalTitle, open }) => {
    return (
        <Modal onRequestClose={handleRequestClose} open={open} style={{ width: '640px' }}>
            <Modal.Header title={modalTitle} onRequestClose={handleRequestClose} />
            <Modal.Body style={{ padding: 10 }}>
                <Tab />
            </Modal.Body>
        </Modal>
    );
};

export default DataModal;
