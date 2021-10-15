import React from 'react';
import Modal from '@splunk/react-ui/Modal';

import DataTable from './DataTable';

const DataModal = ({ handleRequestClose, region, open }) => {
    return (
        <Modal onRequestClose={handleRequestClose} open={open} style={{ width: '640px' }}>
            <Modal.Header title={`${region} region cheaters`} onRequestClose={handleRequestClose} />
            <Modal.Body style={{ padding: 10 }}>
                <DataTable region={region} />
            </Modal.Body>
        </Modal>
    );
};

export default DataModal;
