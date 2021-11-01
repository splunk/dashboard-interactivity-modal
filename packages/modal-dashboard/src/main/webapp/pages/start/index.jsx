import React from 'react';

import layout from '@splunk/react-page';
import ModalComponent from '@splunk/modal-component';
import { SplunkThemeProvider } from '@splunk/themes';

import { defaultTheme, getThemeOptions } from '@splunk/splunk-utils/themes';

import { StyledContainer, StyledGreeting } from './StartStyles';

const themeProviderSettings = getThemeOptions(defaultTheme() || 'enterprise');

layout(
    <SplunkThemeProvider {...themeProviderSettings}>
        <StyledContainer>
            <StyledGreeting>Hello, from inside ModalDashboard!</StyledGreeting>
            <div>Your component will appear below.</div>
            <ModalComponent name="from inside ModalComponent" />
        </StyledContainer>
    </SplunkThemeProvider>
);
