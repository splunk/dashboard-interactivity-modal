import React, { Component } from 'react';
import Modal from '@splunk/react-ui/Modal';

import Tab from './Tab';

class DataModal extends Component {
    render() {
        return (
            <Modal
                onRequestClose={this.props.handleRequestClose}
                open={this.props.open}
                style={{ width: '640px' }}
            >
                <Modal.Header
                    title={this.props.modalTitle}
                    onRequestClose={this.props.handleRequestClose}
                />
                <Modal.Body style={{ padding: 10 }}>
                    <Tab />
                </Modal.Body>
            </Modal>
        );
    }
}

export default DataModal;
