import React, { useState } from 'react';

import DashboardCore from '@splunk/dashboard-core';
import { DashboardContextProvider } from '@splunk/dashboard-context';
import EnterprisePreset from '@splunk/dashboard-presets/EnterprisePreset';
import SplunkThemeProvider from '@splunk/themes/SplunkThemeProvider';
import definition from './definition.json';
import DataModal from './DataModal';

const DashboardExample = () => {
    const [openModal, setOpenModal] = useState(false);
    const [title, setTitle] = useState('Default title');

    const handleDashboardEvent = ({ type, targetId, originalEvent }) => {
        const [, vizId] = targetId.split('_');
        if (type === 'ellipse.click' || type === 'value.click') {
            originalEvent.preventDefault();
            setTitle(vizId);
            setOpenModal(!openModal);
        }
    };

    const handleRequestClose = () => {
        setOpenModal(false);
    };

    return (
        <SplunkThemeProvider>
            <DashboardContextProvider>
                <DataModal
                    open={openModal}
                    modalTitle={title}
                    handleRequestClose={handleRequestClose}
                />
                <DashboardCore
                    width="100%"
                    height="100%"
                    preset={EnterprisePreset}
                    definition={definition}
                    // Attach a custom event trigger
                    dashboardCorePlugin={{
                        onEventTrigger: handleDashboardEvent,
                    }}
                />
            </DashboardContextProvider>
        </SplunkThemeProvider>
    );
};

export default DashboardExample;
