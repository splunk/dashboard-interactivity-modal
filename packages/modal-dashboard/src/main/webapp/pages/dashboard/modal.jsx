import React, { useRef, useState } from 'react';
import Button from '@splunk/react-ui/Button';
import Modal from '@splunk/react-ui/Modal';

import Tab from './Tab';

function Basic() {
    const modalToggle = useRef(null);

    const [open, setOpen] = useState(false);

    const handleRequestOpen = () => {
        setOpen(true);
    };

    const handleRequestClose = () => {
        setOpen(false);
        modalToggle?.current?.focus(); // Return focus to the invoking element on close
    };
    
/*     handleDashboardEvent = ev => {
        const { type, targetId } = ev;
        // based on the visualization id we can show additional context
        // for the clicked location
        const [, vizId] = targetId.split('_');
        if (type === 'ellipse.click' || type === 'value.click') {
            ev.originalEvent.preventDefault();
            this.setState({
                modalTitle: `Context for location=${vizId}`,
                openModal: true,
            });
        }
    };
 */


    
    return (
        <div>
            <Button onClick={handleRequestOpen} ref={modalToggle} label="Click me" />
            <Modal 
                onRequestClose={handleRequestClose} open={open}
                onRequestClose={handleRequestClose}
                open={open}
                style={{ width: '640px' }}
            >
                <Modal.Header
                    title={"Modal Title"}
                    onRequestClose={handleRequestClose}
                />
                <Modal.Body >
                <Tab />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Basic;