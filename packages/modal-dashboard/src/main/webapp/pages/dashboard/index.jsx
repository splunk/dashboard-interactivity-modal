import React, { useRef, useState, Component } from 'react';
import layout from '@splunk/react-page';
import ModalAppComponent from '@splunk/modal-app-component';
import DashboardCore, { themes as dashboardCoreThemes } from '@splunk/dashboard-core';
import { DashboardContextProvider } from '@splunk/dashboard-context';
import EnterprisePreset, { themes as presetThemes } from '@splunk/dashboard-presets/EnterprisePreset';
import definition from './definition.json';
import SplunkThemeProvider from "@splunk/themes/SplunkThemeProvider";
import Basic from './modal';
import DataModal from './DataModal';





const themeKey = 'enterpriseDark';
/*const theme = {
    ...presetThemes[themeKey],
    ...dashboardCoreThemes[themeKey],
    ...reactUIThemes[themeKey],
};*/
// use DashboardCore to render a simple dashboard




layout(

    <SplunkThemeProvider>
        <DashboardContextProvider>
        <Basic/>
            <DashboardCore
                width="100%"
                height="100%"
                preset={EnterprisePreset}
                definition={definition}
            />
        </DashboardContextProvider>
    </SplunkThemeProvider>,
    {
        pageTitle: 'Custom Modal',
        hideFooter: true,
        layout: 'fixed',
    }

);