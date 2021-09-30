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

export default class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // We use local mock data here. In the real application, the data may come from Splunk.
            headers: [
                { label: 'Name', key: 'name', align: 'left', width: 150, minWidth: 80 },
                { label: 'Score', key: 'score', align: 'left', width: 120, minWidth: 40 },
                {
                    label: 'State',
                    key: 'state',
                    align: 'left',
                    width: 140,
                    minWidth: 40,
                },
                { label: 'Flag', key: 'flag', align: 'left', width: 100, minWidth: 40 },
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
                    state: 'Ma',
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
        this.setState(state => {
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
        this.setState(state => {
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
        this.setState(state => {
            const headers = cloneDeep(state.headers);

            // min and max widths can be controlled in the callback.
            const selectedColumn = find(headers, { key: columnId });

            const widthAboveMinimum = Math.max(width, selectedColumn.minWidth);

            headers[index].width = widthAboveMinimum;

            return { headers };
        });
    };

    handleToggle = (event, { email }) => {
        this.setState(state => {
            const data = cloneDeep(state.data);

            const selectedRow = find(data, { email });

            selectedRow.selected = !selectedRow.selected;

            return { data };
        });
    };

    handleToggleAll = () => {
        this.setState(state => {
            const data = cloneDeep(state.data);
            const selected = this.rowSelectionState(data) !== 'all';

            return {
                data: data.map(row => ({
                    ...row,
                    selected: row.disabled ? false : selected,
                })),
            };
        });
    };

    handleFlag = (event, { email }) => {
        this.setState(state => {
            const data = cloneDeep(state.data);

            data.forEach(d => {
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

        return (
            <div>
                <Table
                    stripeRows
                    onRequestMoveColumn={this.handleRequestMoveColumn}
                    onRequestResizeColumn={this.handleResizeColumn}
                    onRequestToggleAllRows={this.handleToggleAll}
                    rowSelection={this.rowSelectionState(data)}
                    headType="fixed"
                    innerStyle={{ maxHeight: 198 }}
                    rowExpansion="single"
                >
                    <Table.Head>
                        {headers.map(header => (
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
                        {orderBy(data, sortKey, sortDir).map(row => (
                            <Table.Row
                                key={row.email}
                                expansionRow={this.getExpansionRow(row)}
                                onRequestToggle={this.handleToggle}
                                data={row}
                                selected={row.selected}
                                disabled={row.disabled}
                            >
                                {headers.map(header => (
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
