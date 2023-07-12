# Getting Started With Dashboards: Click to Open Modal

# Introduction

In this tutorial, we will build off many of the basic foundations discussed and shown in Dashboards Tutorial 1. It is highly recommended to go through the first tutorial to get an understanding of how the framework is used and how to structure a project. Although similar steps will be covered in this tutorial, many of the explanations will not be repeated.

This tutorial goes further into adding Splunk UI components and covers event handlers in dashboards. We will cover a very handy, and non-native feature to Splunk Dashboards, which is clicking to open a modal window within a dashboard. You may have seen the dashboard we build in this tutorial before, as it was presented in Splunk .conf19 by engineers on the Splunk Web Platform team as a great showcase on how to make standalone React apps with Splunk Dashboards and Splunk UI. In this tutorial however, we will again make a Splunk App, with the Splunk UI create package, and add very similar custom code to the .conf19 showcase to trigger modal windows on click events.

In this tutorial we will...

-   Create a Splunk App using the `splunk-create` app generator
-   Install dependencies for all necessary packages (will require some waiting while commands run)
-   Create a dashboard using out-of-the-box functionality from Splunk
-   Test our dashboard
-   Create a modal view with Splunk UI
-   Add a click event to our dashboard to open the modal on click

## Prerequisites

-   node version 14.18.0
-   yarn version 1.2 or higher
-   A comprehensive code editor you are comfortable using
-   A local Splunk Enterprise Instance

The more experience one has with Javascript, React and JSX, the easier it is to understand the content, however this tutorial is not meant to cover the details regarding those development tools. If you would like to skip the tutorial and just interact with the final result, you can do so by cloning the project's [GitHub Repository](https://github.com/splunk/dashboardTutorial2).

## Setup and App Generation

To get started open a terminal in a directory where you feel comfortable creating this app in (for example, your desktop or user home directory). In that directory, we will create a new directory and invoke the create package:

```bash
$ mkdir -p dashboardTutorial2
$ cd dashboardTutorial2
$ npx @splunk/create
```

You should see a selection menu with two options. Select the option that states `A monorepo with a React Splunk app with a React component`. Name the component `modalComponent`, the repository `dashboardTutorial2` and the app `modalDashboard`.

For more details on the Splunk UI create package, see Additional Reading.

# Creating the Dashboard

## Overview

To build our custom dashboard, we will need a few components from Splunk UI, mainly the modal component. As mentioned previously, opening a modal from a dashboard click event is not something native to Splunk Dashboard applications such as Dashboard Studio on Splunk Enterprise, and currently necessitates that one develops it as custom functionality in their own dashboard app if they want that behavior in their dashboard.

The best way to do the rest of this tutorial is to use an a code editor of your choice. The screenshots in this tutorial will show the use of VSCode, which provides the ability to open terminals and view the file structure of your project.

## Dashboard Setup

Find the folder `dashboardTutorial2` on your machine, which is where we created our repository. Drag and drop this folder into a new window of VSCode (or your equivalent code editor). You should be able to see the entire file structure and a workspace to edit files.

1.  Create a new folder in the `packages/modal-dashboard/src/main/webapp/pages` directory

1.  Name the folder dashboard

1.  Create three new files in this folder, `definition.json`, `index.jsx` and `DashboardExample.jsx`


The starter definition of the dashboard is provided below. This dashboard describes a simple example of detecting cheaters on game servers spread across the United States. It's a fairly simple with a custom image as the background, a few charts at the top displaying some data and 4 single value visualizations displaying data relating to various sections on the map in the middle. There are some ellipses on the map as well as lines connecting them to their respective related single value visualization.

### definition.json

```json
{
	"visualizations": {
		"viz_HAk44ZUo": {
			"type": "splunk.singlevalue",
			"dataSources": {
				"primary": "test1"
			},
			"title": "NW Servers",
			"options": {
				"showSparklineAreaGraph": true,
				"sparklineStrokeColor": "> trendColor",
				"showSparklineTooltip": true,
				"backgroundColor": "#53a051"
			}
		},
		"viz_VqtvG1yo": {
			"type": "splunk.singlevalue",
			"dataSources": {
				"primary": "test2"
			},
			"title": "NE Servers",
			"options": {
				"showSparklineAreaGraph": true,
				"sparklineStrokeColor": "> trendColor",
				"showSparklineTooltip": true,
				"backgroundColor": "#dc4e41"
			}
		},
		"viz_pn7Ah9vW": {
			"type": "splunk.singlevalue",
			"dataSources": {
				"primary": "test2"
			},
			"title": "SW Servers",
			"options": {
				"showSparklineAreaGraph": true,
				"sparklineStrokeColor": "> trendColor",
				"showSparklineTooltip": true,
				"backgroundColor": "#f1813f",
				"majorValue": "> primary | seriesByName('count') | pointByIndex(10)"
			}
		},
		"viz_EXiXRX4U": {
			"type": "splunk.singlevalue",
			"dataSources": {
				"primary": "test1"
			},
			"title": "SE Servers",
			"options": {
				"showSparklineAreaGraph": true,
				"sparklineStrokeColor": "> trendColor",
				"showSparklineTooltip": true,
				"backgroundColor": "#f8be44",
				"majorValue": "> primary | seriesByName('count') | pointByIndex(12)"
			}
		},
		"viz_SW": {
			"type": "splunk.ellipse",
			"options": {
				"fillColor": "#ffffff",
				"strokeColor": "#ffffff"
			},
			"eventHandlers": [
                {
                    "type": "ellipse.click"
                }
            ]
		},
		"viz_SE": {
			"type": "splunk.ellipse",
			"options": {
				"fillColor": "#ffffff",
				"strokeColor": "#ffffff"
			},
			"eventHandlers": [
                {
                    "type": "ellipse.click"
                }
            ]
		},
		"viz_NE": {
			"type": "splunk.ellipse",
			"options": {
				"fillColor": "#ffffff",
				"strokeColor": "#ffffff"
			},
			"eventHandlers": [
                {
                    "type": "ellipse.click"
                }
            ]
		},
		"viz_NW": {
			"type": "splunk.ellipse",
			"options": {
				"fillColor": "#ffffff",
				"strokeColor": "#ffffff"
			},
			"eventHandlers": [
                {
                    "type": "ellipse.click"
                }
            ]
		},
		"viz_QHRzTGFQ": {
			"type": "abslayout.line"
		},
		"viz_TzwaPrgt": {
			"type": "abslayout.line"
		},
		"viz_Jnx0o633": {
			"type": "abslayout.line"
		},
		"viz_DLUIxOtM": {
			"type": "abslayout.line"
		},
		"viz_vZD1cyae": {
			"type": "splunk.area",
			"dataSources": {
				"primary": "test3"
			},
			"options": {
				"xAxisTitleVisibility": "hide",
				"yAxisTitleVisibility": "hide",
				"backgroundColor": "transparent",
				"seriesColors": [
					"#0877a6"
				],
				"xAxisLabelVisibility": "hide",
				"yAxisLabelVisibility": "hide",
				"legendDisplay": "off"
			},
			"title": "Player Logins"
		},
		"viz_SoNvsCtV": {
			"type": "splunk.markdown",
			"options": {
				"markdown": "## This app helps detect cheaters amongst the player base in various servers across the country"
			}
		},
		"viz_11f98rjH": {
			"type": "splunk.column",
			"dataSources": {
				"primary": "test4"
			},
			"title": "Social Mentions",
			"showProgressBar": false,
			"showLastUpdated": false,
			"options": {
				"xAxisTitleVisibility": "hide",
				"yAxisTitleVisibility": "hide",
				"backgroundColor": "transparent",
				"xAxisLabelVisibility": "hide",
				"yAxisLabelVisibility": "hide",
				"legendDisplay": "off"
			}
		}
	},
	"dataSources": {
		"test1": {
			"type": "ds.test",
			"name": "test",
			"options": {
				"data": {
					"fields": [
						{
							"name": "count"
						}
					],
					"columns": [
						[
							"0",
							"1",
							"10",
							"1",
							"12",
							"3",
							"14",
							"15",
							"16",
							"17",
							"18",
							"19",
							"78",
							"20",
							"21",
							"27",
							"23",
							"3",
							"10",
							"5"
						]
					]
				}
			}
		},
		"test2": {
			"type": "ds.test",
			"name": "test2",
			"options": {
				"data": {
					"fields": [
						{
							"name": "count"
						}
					],
					"columns": [
						[
							"866",
							"1020",
							"1096",
							"1738",
							"1063",
							"866",
							"1204",
							"127",
							"972",
							"870",
							"569",
							"836",
							"867",
							"866",
							"866",
							"997",
							"866",
							"1263",
							"867",
							"868"
						]
					]
				}
			}
		},
		"test3": {
			"type": "ds.test",
			"name": "test3",
			"options": {
				"data": {
					"fields": [
						{
							"name": "time"
						},
						{
							"name": "count"
						}
					],
					"columns": [
						[
							1,
							2,
							3,
							4,
							5,
							6,
							7,
							8,
							9,
							10,
							11,
							12,
							13,
							14,
							15,
							16,
							17,
							18,
							19,
							20
						],
						[
							866,
							1020,
							1096,
							1738,
							1063,
							866,
							1201,
							1227,
							972,
							870,
							569,
							836,
							867,
							866,
							866,
							997,
							866,
							1263,
							867,
							868
						]
					]
				}
			}
		},
		"test4": {
			"type": "ds.test",
			"name": "test4",
			"options": {
				"data": {
					"fields": [
						{
							"name": "time"
						},
						{
							"name": "count"
						}
					],
					"columns": [
						[
							1,
							2,
							3,
							4,
							5,
							6,
							7,
							8,
							9,
							10,
							11,
							12,
							13,
							14,
							15,
							16,
							17,
							18,
							19,
							20
						],
						[
							66,
							120,
							196,
							138,
							63,
							86,
							120,
							127,
							72,
							80,
							59,
							83,
							87,
							66,
							86,
							97,
							66,
							126,
							67,
							88
						]
					]
				}
			}
		},
		"ds_r6S7ZB06_test3": {
			"type": "ds.test",
			"name": "Copy of test2",
			"options": {
				"data": {
					"fields": [
						{
							"name": "time"
						},
						{
							"name": "count"
						}
					],
					"columns": [
						[
							1,
							2,
							3,
							4,
							5,
							6,
							7,
							8,
							9,
							10,
							11,
							12,
							13,
							14,
							15,
							16,
							17,
							18,
							19,
							20
						],
						[
							866,
							1020,
							1096,
							1738,
							1063,
							866,
							1201,
							1227,
							972,
							870,
							569,
							836,
							867,
							866,
							866,
							997,
							866,
							1263,
							867,
							868
						]
					]
				}
			}
		}
	},
	"defaults": {},
	"inputs": {},
	"layout": {
		"type": "absolute",
		"options": {
			"display": "auto-scale",
			"width": 1440,
			"height": 1024,
			"backgroundImage": {
				"sizeType": "contain",
				"x": 0,
				"y": 0,
				"src": "https://github.com/splunk/dashboardTutorial2/blob/main/packages/modal-dashboard/src/main/webapp/pages/dashboard/dashboard-background.png?raw=true"
			}
		},
		"structure": [
			{
				"item": "viz_HAk44ZUo",
				"type": "block",
				"position": {
					"x": 40,
					"y": 460,
					"w": 270,
					"h": 200
				}
			},
			{
				"item": "viz_VqtvG1yo",
				"type": "block",
				"position": {
					"x": 1120,
					"y": 500,
					"w": 260,
					"h": 180
				}
			},
			{
				"item": "viz_pn7Ah9vW",
				"type": "block",
				"position": {
					"x": 230,
					"y": 800,
					"w": 260,
					"h": 180
				}
			},
			{
				"item": "viz_EXiXRX4U",
				"type": "block",
				"position": {
					"x": 1050,
					"y": 760,
					"w": 270,
					"h": 200
				}
			},
			{
				"item": "viz_SW",
				"type": "block",
				"position": {
					"x": 610,
					"y": 740,
					"w": 50,
					"h": 50
				}
			},
			{
				"item": "viz_SE",
				"type": "block",
				"position": {
					"x": 870,
					"y": 710,
					"w": 50,
					"h": 50
				}
			},
			{
				"item": "viz_NE",
				"type": "block",
				"position": {
					"x": 960,
					"y": 560,
					"w": 50,
					"h": 50
				}
			},
			{
				"item": "viz_NW",
				"type": "block",
				"position": {
					"x": 470,
					"y": 560,
					"w": 50,
					"h": 50
				}
			},
			{
				"item": "viz_QHRzTGFQ",
				"type": "line",
				"position": {
					"from": {
						"item": "viz_pn7Ah9vW",
						"port": "e"
					},
					"to": {
						"x": 625,
						"y": 777
					}
				}
			},
			{
				"item": "viz_TzwaPrgt",
				"type": "line",
				"position": {
					"from": {
						"item": "viz_HAk44ZUo",
						"port": "e"
					},
					"to": {
						"x": 491,
						"y": 587
					}
				}
			},
			{
				"item": "viz_Jnx0o633",
				"type": "line",
				"position": {
					"from": {
						"x": 900,
						"y": 744
					},
					"to": {
						"item": "viz_EXiXRX4U",
						"port": "w"
					}
				}
			},
			{
				"item": "viz_DLUIxOtM",
				"type": "line",
				"position": {
					"from": {
						"item": "viz_NE",
						"port": "e"
					},
					"to": {
						"item": "viz_VqtvG1yo",
						"port": "w"
					}
				}
			},
			{
				"item": "viz_vZD1cyae",
				"type": "block",
				"position": {
					"x": 910,
					"y": 50,
					"w": 490,
					"h": 270
				}
			},
			{
				"item": "viz_SoNvsCtV",
				"type": "block",
				"position": {
					"x": 80,
					"y": 180,
					"w": 400,
					"h": 120
				}
			},
			{
				"item": "viz_11f98rjH",
				"type": "block",
				"position": {
					"x": 500,
					"y": 40,
					"w": 400,
					"h": 270
				}
			}
		],
		"globalInputs": []
	},
	"description": "",
	"title": "Custom Modal"
}

```
Lastly, we will need to include code to both the `DashboardExample.jsx` and `index.jsx` files. In this starter code for `DashboardExample.jsx`, we use these packages to create our dashboard in the layout section. We provide dashboard core with the props it requires, which includes the definition of our dashboard and the preset we want to use. This is then wrapped in both Dashboard Context and Splunk Theme providers. More information on how these components work together can be found in our documentation in the **Additional Reading** section.

### DashboardExample.jsx (starter)

```jsx
import React, { useState } from 'react';

import DashboardCore from '@splunk/dashboard-core';
import { DashboardContextProvider } from '@splunk/dashboard-context';
import EnterprisePreset from '@splunk/dashboard-presets/EnterprisePreset';
import SplunkThemeProvider from '@splunk/themes/SplunkThemeProvider';
import definition from './definition.json';

// NOTICE: If you are on Dashboard Core versions LOWER than 25.X.X, preset will be a prop for <DashboardCore> instead of 
// <DashboardContextProvider>

const DashboardExample = () => {

    return (
        <SplunkThemeProvider>
            <DashboardContextProvider preset={EnterprisePreset}>
                <DashboardCore
                    width="100%"
                    height="100%"
                    definition={definition}
                />
            </DashboardContextProvider>
        </SplunkThemeProvider>
    );
};

export default DashboardExample;

```
And for our `index.jsx`:

### index.jsx

```jsx
import React from 'react';
import layout from '@splunk/react-page';
import DashboardExample from './DashboardExample';

layout(<DashboardExample />, {
    pageTitle: 'Custom Modal',
    hideFooter: true,
    layout: 'fixed',
});

```

Since we created a new folder meant for a new dashboard page, we have to make sure our app can navigate to it. If the previous set of steps can be considered "creating" the dashboard, this next set of steps will handle "viewing" the dashboard.

1.  Create a new page in `src/main/resources/splunk/default/data/ui/views`

1.  For this project, you can duplicate the `start.xml` view that is already provided and rename the file to `dashboard.xml`

1.  Replace the word "Start" with "Modal Dashboard" in the XML file itself, between the `<label>` tags (It is important to note that the name of the xml view must be the same as the name of the folder you created in the previous set of steps)

1.  Go to `src/main/resources/splunk/default/data/ui/nav/default.xml` in the nav folder

1.  Once that is done you can add the following to the `default.xml` file, under the start view: `<view name="dashboard"/>`

## Test Run

Now that we have the code in place, let's do a test run before we dive into the "custom" portion of this tutorial. Open a new terminal window in VSCode (or use a regular terminal window). We will run a set of commands that will install new dependencies for dashboard related packages, install dependencies that are generated from the `splunk-create` package and build our project.

```bash
$ cd dashboardTutorial2/packages/modal-dashboard # (if not in app root already)
$ yarn add @splunk/dashboard-core @splunk/dashboard-presets @splunk/dashboard-context @splunk/visualization-context
$ cd ../.. # back to project root
$ yarn install # to install other dependencies
$ yarn run build
```

This will make sure that all our dependencies are installed and that our React component and Splunk app can work together. Next we must symlink our output directory to our Splunk application directory, so that our local Splunk instance can load this app. Note that this above requires `$SPLUNK_HOME` to be set to the installation directory of the local Splunk installation you want to use. If this is not done already, then for a local, non-production instance, this can easily be done with:

```bash
$ export SPLUNK_HOME=<your_directory> # (note that most single instance Splunk downloads would be in /Applications/Splunk for Mac users)
```

And to get everything linked:

```bash
$ cd packages/modal-dashboard # (app directory)
$ yarn run link:app
```

Now let's compile the app in watch mode:

```bash
$ yarn run start
```

If your Splunk instance is already running, you will have to restart it to pick up the new app view. Once it is restarted, you should be able to access the new app from the Splunk Enterprise Web interface. Assuming that the Splunk instance is listening on the default port, you should be able to see it at [http://localhost:8000/en-US/app/modal-dashboard/dashboard](http://localhost:8000/en-US/app/modal-dashboard/dashboard). This page should look familiar, everything should be the same as a regular Splunk Enterprise experience but you should be seeing the starter definition of the dashboard that is provided in the tutorial. If everything looks good we can move on.

### Common Issues

-   "Nothing works, not even the app is appearing in my application menu"
    -   Double check that you symlinked the application directory correctly, you can check in `package.json` of the app directory whether or not the application directory shows up correctly, under the `scripts` object, look for `link:app`
-   "I can see the app, but nothing loads"
    -   Check to see that you saved all your files after inserting the provided code
-   Error 404, page not found
    -   Check to see that you correctly created your view in the `src/main/resources/splunk/default/data/ui` directory. Remember you need to both create the view itself and then add the view in the `default.xml` file.

## Developing Custom Functionality

Like before, what we have done so far has been all basic functionality available out of the box. This time, instead of simply adding a component as a visualization, we will have a click even make our component appear on top of our dashboard. Again the code is provided, but this would require more JavaScript knowledge as compared to the first tutorial if one was adding a similar functionality to their own project.

The goal in the next section is to add functionality such that when a user clicks on one of the circles, it will open up a modal window containing a table of players suspected to be cheating on that server. There will also be functionality to expand the row of the table to see some user details as well as flag the user.

### Adding the Component Code

If you remember, the `splunk-create` package created two things for us, a React component and a Splunk app. The setup we did is also very conveniently set up our app such that the dependencies of the React component is included in the app. Unlike before, we actually require two components here. One will be the modal window itself, and the other will be the content inside the modal, which will be a simple table.

1.  Navigate to `dashboardTutorial1/packages/modal-component/src`

1.  Create a new file named `DataTable.jsx`

1.  Copy and paste the following code into that file

### DataTable.jsx

```jsx
import React, { Component } from 'react';
import { cloneDeep, find, orderBy } from 'lodash';
import styled from 'styled-components';
import Button from '@splunk/react-ui/Button';
import DL from '@splunk/react-ui/DefinitionList';
import Table from '@splunk/react-ui/Table';

const StyledFlagButtonContainer = styled.div`
    margin-top: 20px;
    text-align: right;
`;

const regions = {
    NW: ['CA', 'WA', 'OR'],
    SW: ['NM', 'NV', 'AZ'],
    NE: ['NY', 'MA'],
    SE: ['FL', 'AL'],
};

export default class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // We use local mock data here. In the real application, the data may come from Splunk.
            headers: [
                {
                    label: 'Name',
                    key: 'name',
                    align: 'left',
                    width: 150,
                    minWidth: 80,
                },
                {
                    label: 'Score',
                    key: 'score',
                    align: 'left',
                    width: 120,
                    minWidth: 40,
                },
                {
                    label: 'State',
                    key: 'state',
                    align: 'left',
                    width: 140,
                    minWidth: 40,
                },
                {
                    label: 'Flag',
                    key: 'flag',
                    align: 'left',
                    width: 100,
                    minWidth: 40,
                },
            ],
            data: [
                {
                    name: 'Rylan',
                    score: 999,
                    state: 'CA',
                    email: 'Angelita_Weimann42@gmail.com',
                    flag: 'none',
                    selected: false,
                    disabled: false,
                },
                {
                    name: 'Amelia',
                    score: 10,
                    state: 'MA',
                    email: 'Dexter.Trantow57@hotmail.com',
                    flag: 'none',
                    selected: false,
                    disabled: false,
                },
                {
                    name: 'Estevan',
                    score: 12,
                    state: 'NY',
                    email: 'Aimee7@hotmail.com',
                    flag: 'none',
                    selected: false,
                    disabled: false,
                },
                {
                    name: 'Florence',
                    score: 23,
                    state: 'AZ',
                    email: 'Jarrod.Bernier13@yahoo.com',
                    flag: 'none',
                    selected: false,
                    disabled: false,
                },
                {
                    name: 'Tressa',
                    score: 25,
                    state: 'CA',
                    email: 'yadira1@hotmail.com',
                    flag: 'none',
                    selected: false,
                    disabled: false,
                },
                {
                    name: 'Bernice',
                    score: 17,
                    state: 'TX',
                    email: 'bernice.Gilbert@gmail.com',
                    flag: 'none',
                    selected: false,
                    disabled: false,
                },
                {
                    name: 'Adrian',
                    score: 23,
                    state: 'MA',
                    email: 'adrian7456@gmail.com',
                    flag: 'none',
                    selected: false,
                    disabled: false,
                },
                {
                    name: 'Ester',
                    score: 88,
                    state: 'NY',
                    email: 'esternyc@gmail.com',
                    flag: 'none',
                    selected: false,
                    disabled: false,
                },
                {
                    name: 'Andrew',
                    score: 16,
                    state: 'NM',
                    email: 'andrew.fillmore2@gmail.com',
                    flag: 'none',
                    selected: false,
                    disabled: false,
                },
                {
                    name: 'Felix',
                    score: 36,
                    state: 'CA',
                    email: 'felixfelix@hotmail.com',
                    flag: 'none',
                    selected: false,
                    disabled: false,
                },
            ],
            sortKey: 'score',
            sortDir: 'asc',
        };
    }

    getExpansionRow(row) {
        return (
            <Table.Row key={`${row.email}-expansion`}>
                <Table.Cell style={{ borderTop: 'none' }} colSpan={this.state.headers.length}>
                    <DL>
                        <DL.Term>Name</DL.Term>
                        <DL.Description>{row.name}</DL.Description>
                        <DL.Term>Email</DL.Term>
                        <DL.Description>{row.email}</DL.Description>
                    </DL>
                </Table.Cell>
            </Table.Row>
        );
    }

    handleRequestMoveColumn = ({ fromIndex, toIndex }) => {
        this.setState((state) => {
            const headers = cloneDeep(state.headers);
            const headerToMove = headers[fromIndex];

            const insertionIndex = toIndex < fromIndex ? toIndex : toIndex + 1;
            headers.splice(insertionIndex, 0, headerToMove);

            const removalIndex = toIndex < fromIndex ? fromIndex + 1 : fromIndex;
            headers.splice(removalIndex, 1);

            return { headers };
        });
    };

    handleSort = (e, { sortKey }) => {
        this.setState((state) => {
            const prevSortKey = state.sortKey;
            const prevSortDir = prevSortKey === sortKey ? state.sortDir : 'none';
            const nextSortDir = prevSortDir === 'asc' ? 'desc' : 'asc';
            return {
                sortKey,
                sortDir: nextSortDir,
            };
        });
    };

    handleResizeColumn = (event, { columnId, index, width }) => {
        this.setState((state) => {
            const headers = cloneDeep(state.headers);

            // min and max widths can be controlled in the callback.
            const selectedColumn = find(headers, { key: columnId });

            const widthAboveMinimum = Math.max(width, selectedColumn.minWidth);

            headers[index].width = widthAboveMinimum;

            return { headers };
        });
    };

    handleToggle = (event, { email }) => {
        this.setState((state) => {
            const data = cloneDeep(state.data);

            const selectedRow = find(data, { email });

            selectedRow.selected = !selectedRow.selected;

            return { data };
        });
    };

    handleToggleAll = () => {
        this.setState((state) => {
            const data = cloneDeep(state.data);
            const selected = this.rowSelectionState(data) !== 'all';

            return {
                data: data.map((row) => ({
                    ...row,
                    selected: row.disabled ? false : selected,
                })),
            };
        });
    };

    handleFlag = (event, { email }) => {
        this.setState((state) => {
            const data = cloneDeep(state.data);

            data.forEach((d) => {
                if (d.selected) {
                    d.flag = 'flag';
                } else {
                    d.flag = 'none';
                }
            });

            return { data };
        });
    };

    // eslint-disable-next-line class-methods-use-this
    rowSelectionState(data) {
        const selectedCount = data.reduce(
            (count, { selected }) => (selected ? count + 1 : count),
            0
        );
        const disabledCount = data.reduce(
            (count, { disabled }) => (disabled ? count + 1 : count),
            0
        );

        if (selectedCount === 0) {
            return 'none';
        }
        if (selectedCount + disabledCount === data.length) {
            return 'all';
        }
        return 'some';
    }

    render() {
        const { headers, data, sortKey, sortDir } = this.state;
        const { region } = this.props;

        const filteredData = data.filter((record) => {
            if (regions[region]?.includes(record.state)) {
                return true;
            }

            return false;
        });

        return (
            <div>
                <Table
                    stripeRows
                    onRequestMoveColumn={this.handleRequestMoveColumn}
                    onRequestResizeColumn={this.handleResizeColumn}
                    onRequestToggleAllRows={this.handleToggleAll}
                    rowSelection={this.rowSelectionState(filteredData)}
                    headType="fixed"
                    innerStyle={{ maxHeight: 198 }}
                    rowExpansion="single"
                >
                    <Table.Head>
                        {headers.map((header) => (
                            <Table.HeadCell
                                key={header.key}
                                columnId={header.key}
                                align={header.align}
                                width={header.width}
                                onSort={this.handleSort}
                                sortKey={header.key}
                                sortDir={header.key === sortKey ? sortDir : 'none'}
                            >
                                {header.label}
                            </Table.HeadCell>
                        ))}
                    </Table.Head>
                    <Table.Body>
                        {orderBy(filteredData, sortKey, sortDir).map((row) => (
                            <Table.Row
                                key={row.email}
                                expansionRow={this.getExpansionRow(row)}
                                onRequestToggle={this.handleToggle}
                                data={row}
                                selected={row.selected}
                                disabled={row.disabled}
                            >
                                {headers.map((header) => (
                                    <Table.Cell key={row[header.key]} align={header.align}>
                                        {row[header.key]}
                                    </Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <StyledFlagButtonContainer>
                    <Button appearance="primary" onClick={this.handleFlag} label="Flag" />
                </StyledFlagButtonContainer>
            </div>
        );
    }
}

```
Here is some high level functionality the code provides us:

-   The data contains a list of users with various properties, one of them is the user's **state** which we then mapped in the **regions** above so that each region contains a group of states the user could be from
-   In `getExpansionRow` we show both the user's name and email
-   Some other functionality included in the table is the ability to move the column with `handleRequestMoveColumn` and sorting the rows with `handleSort`
-   We also have the ability to flag our user for suspicious behavior, so we introduced a handler for a toggle and also a button to flag the user

### Putting the Table inside our Modal

Now that we have the table, we can make it appear when we open our modal. For the modal itself we can use the generated React component from `splunk-create`.

1.  Navigate to `dashboardTutorial1/packages/modal-component/src/ModalComponent.jsx`

1.  Replace the existing code with the following:

### ModalComponent.jsx

```jsx
import React from 'react';
import Modal from '@splunk/react-ui/Modal';

import DataTable from './DataTable';

const ModalComponent = ({ handleRequestClose, region, open }) => {
    return (
        <Modal onRequestClose={handleRequestClose} open={open} style={{ width: '640px' }}>
            <Modal.Header title={`${region} region cheaters`} onRequestClose={handleRequestClose} />
            <Modal.Body style={{ padding: 10 }}>
                <DataTable region={region} />
            </Modal.Body>
        </Modal>
    );
};



export default ModalComponent;

```
In this example we are not using a custom visualization so there is no need to introduce the Splunk Visualizations library, instead, we simply make sure that the modal shows the data with a bit of title text that shows the region being clicked on.

### Adding the Click Event in our Dashboard

Now we need to add some logic to make sure that when we click on one of the circles, the associated data for that region appears. If you noticed in the **starter definition** we had the following code for each ellipse that will represent an event handler in our dashboard.

### definition.json (snippet)

```json
...
"viz_NW": {
            "type": "splunk.ellipse",
            "options": {
                "fillColor": "#ffffff",
                "strokeColor": "#ffffff"
            },
            "eventHandlers": [
                {
                    "type": "ellipse.click"
                }
            ]
    },
...
```

The event handler will then be read in the following `DashboardExample.jsx` code so that a set of actions unfold when the click is triggered. We get the region from the viz ID (in the above example it would be NW) and then we open the modal window. This is handled in `handleDashboardEvent`.

-   Replace the existing code in `DashboardExample.jsx` with the code in the following snippet `DashboardExample.jsx` final. Make sure to read any commented lines.

### DashboardExample.jsx (final)

```jsx
import React, { useState } from 'react';

import { DashboardCore } from '@splunk/dashboard-core';
import { DashboardContextProvider } from '@splunk/dashboard-context';
import EnterprisePreset from '@splunk/dashboard-presets/EnterprisePreset';
import SplunkThemeProvider from '@splunk/themes/SplunkThemeProvider';
import ModalComponent from '@splunk/modal-component';
import definition from './definition.json';

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

    const handleRequestClose = () => {
        setOpenModal(false);
    };

// NOTICE: If you are on Dashboard Core versions LOWER than 25.X.X, preset will be a prop for <DashboardCore> instead of 
// <DashboardContextProvider>
    return (
        <SplunkThemeProvider>
            <DashboardContextProvider 
				preset={EnterprisePreset} 
				initialDefinition={definition}
				// Attach a custom event trigger
				dashboardPlugin={{
					onEventTrigger: handleDashboardEvent,
				}}
			>
                <ModalComponent
                    open={openModal}
                    region={region}
                    handleRequestClose={handleRequestClose}
                />
                <DashboardCore
                    width="100%"
                    height="100%"             
                />
            </DashboardContextProvider>
        </SplunkThemeProvider>
    );
};

export default DashboardExample;

```
Once you replace the code, we should be good to go.

```bash
cd dashboardTutorial2 # (if not in project root already)
yarn run build
cd packages
yarn run start
```

Restart the Splunk Instance, and you should see the dashboard load as expected, you may need to do a hard refresh on your browser window (cmd+shift+R for Mac)

Notice that before we did the commands in the application directory, but now we are doing so in the package directory, because we need to build and start both the application and the React component.

### Common Issues

-   "The modal is not appearing on click"
    -   Double check that you saved the update to the Dashboard Example file
-   "The modal appears but not the table"
    -   Check to see that the files are in the right directories. Both the table and the modal files should be in the modal-component directory. Also double check the import statements match the provided code.


## Review

Congratulations! You now have a Splunk App which contains a dashboard that has a click event that opens a modal.

To recap what we did in this tutorial...

-   Used the `@splunk/create` package to generate an app containing a React component and Splunk app
-   Installed and added all packages required to render and customize our dashboard
-   Used a JSON definition and React file to create a dashboard
-   Linked our app to a local Splunk instance to view in Splunk Enterprise
-   Created a modal that renders a table with custom functions
-   Added a click event to open the modal when an ellipse is clicked

There is one more dashboard tutorial that covers how to include a 3rd party component, be sure to check it out!

## Additional Reading

[Splunk UI Create Package](https://splunkui.splunk.com/Packages/create/Overview)

[Splunk Dashboard Packages](https://splunkui.splunk.com/Packages/dashboard-docs-public/?path=%2FIntroduction)
