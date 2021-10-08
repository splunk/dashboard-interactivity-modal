import React from 'react';
import layout from '@splunk/react-page';
import DashboardExample from '../../../DashboardExample';

layout(<DashboardExample />, {
    pageTitle: 'Custom Modal',
    hideFooter: true,
    layout: 'fixed',
});
