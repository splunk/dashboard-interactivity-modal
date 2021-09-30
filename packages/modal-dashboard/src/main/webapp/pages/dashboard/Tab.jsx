import React from 'react';
import ChartBar from '@splunk/react-icons/ChartBar';
import Table from '@splunk/react-icons/Table';
import TabLayout from '@splunk/react-ui/TabLayout';
import Area from '@splunk/react-visualizations/Area';
import { SCP_CATEGORICAL } from '@splunk/visualization-color-palettes';

import DataTable from './DataTable';

function Basic() {
    return (
        <TabLayout defaultActivePanelId="visualizations" iconSize="small" style={{ marginTop: 0 }}>
            <TabLayout.Panel
                label="Visualizations"
                panelId="visualizations"
                icon={<ChartBar />}
                style={{ margin: 20, minHeight: 240 }}
            >
                <Area
                    xFieldName={'sourcetype'}
                    yFieldName={['count', 'status']}
                    y2FieldName={'percent'}
                    x={[
                        'splunkd',
                        'splunkd_ui_access',
                        'splunkd_access',
                        'splunk_web_access',
                        'scheduler',
                        'splunk_web_service',
                    ]}
                    themeKey={'dark'}
                    y={[
                        ['1600', '1525', '1295', '713', '322', '19'],
                        ['200', '400', '500', '201', '404', '200'],
                    ]}
                    y2={[
                        '87.966380',
                        '50.381304',
                        '60.023780',
                        '121.183272',
                        '70.250513',
                        '90.194752',
                    ]}
                    colorPalette={SCP_CATEGORICAL}
                    backgroundColor={'transparent'}
                    legendPlacement={'none'}
                />
            </TabLayout.Panel>

            <TabLayout.Panel
                label="Statistics"
                panelId="statistics"
                icon={<Table />}
                style={{ margin: 20 }}
            >
                <DataTable />
            </TabLayout.Panel>
        </TabLayout>
    );
}

export default Basic;
