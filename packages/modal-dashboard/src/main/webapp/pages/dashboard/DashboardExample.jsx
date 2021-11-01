import React, { useState, useCallback } from 'react';
import DashboardCore from '@splunk/dashboard-core';
import { DashboardContextProvider } from '@splunk/dashboard-context';
import EnterprisePreset from '@splunk/dashboard-presets/EnterprisePreset';
import SplunkThemeProvider from '@splunk/themes/SplunkThemeProvider';
import definition from './definition.json';
import ModalComponent from '@splunk/modal-component';

const DashboardExample = () => {
    const [openModal, setOpenModal] = useState(false);
    const [region, selectRegion] = useState('');

    const handleDashboardEvent = ({ type, targetId, originalEvent }) => {
        const [, vizId] = targetId.split('_');
        if (type === 'ellipse.click' || type === 'value.click') {
            originalEvent.preventDefault();
            selectRegion(vizId);
            setOpenModal(!openModal);
        }
    };

    const handleRequestClose = useCallback(() => {
        setOpenModal(false);
    }, []);

    const getDashboardCorePlugin = () => ({
        onEventTrigger: handleDashboardEvent,
    });

    return (
        <SplunkThemeProvider family="prisma" colorScheme="dark">
            <DashboardContextProvider>
                <ModalComponent
                    open={openModal}
                    region={region}
                    handleRequestClose={handleRequestClose}
                />
                <DashboardCore
                    width="100%"
                    height="100%"
                    preset={EnterprisePreset}
                    definition={definition}
                    // Attach a custom event trigger
                    dashboardCorePlugin={getDashboardCorePlugin()}
                />
            </DashboardContextProvider>
        </SplunkThemeProvider>
    );
};

export default DashboardExample;
