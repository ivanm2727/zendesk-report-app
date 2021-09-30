
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Body, Cell, Head, HeaderCell, HeaderRow, Row, Table } from '@zendeskgarden/react-tables';
import { Pagination } from '@zendeskgarden/react-pagination';
import { Button } from '@zendeskgarden/react-buttons';
import { downloadReport, getReports } from '../../frameworks_and_drivers/external_interfaces/reports/reports_api';
import { IReport } from '../../frameworks_and_drivers/external_interfaces/reports/interfaces/report';
import { Notification, Title, Close } from '@zendeskgarden/react-notifications';


const StyledTable = styled(Table)`
  margin-bottom: ${p => p.theme.space.md};
  min-width: 500px;
`;

export interface IPageInfo {
  currentPage: number,
  pageSize: number,
  totalPages: number
}


const getRange = (report: IReport) => {
  let { start, end } = report.requestedRange;
  start = start.split('T')[0];
  end = end.split('T')[0];
  return `${start} / ${end}`
}



interface IListReportsProps {
  reports: IReport[],
  pageInfo: IPageInfo,
  onChangePage: any
}

interface IRow {
  reportId: string, 
  isDownloading: boolean
}

const ListReports = (props: IListReportsProps) => {
  const { reports, pageInfo, onChangePage } = props;
  const { currentPage, totalPages } = pageInfo;
  const [ rows, setRows ] = useState<IRow[]>([])
  const [ isDownloadingReport, setIsDownloadingReport] = useState<boolean>(false);
  const [ downloadingReportId, setDownloadingReportId ] = useState<string | undefined>(undefined);


  const updateRowByReportId = (reportId: string) => {
    return rows.find(row => row.reportId === reportId);
  }

  const getRowIndexByReportId = (reportId: string) => rows.findIndex(row => reportId === row.reportId)

  const handleRowDownloadButton = async (report: IReport) => {
    // console.log('Row');
    // const rowIndex = getRowIndexByReportId(report.id);
    // const row = rows[rowIndex];
    // row.isDownloading = true;
    // const rowsCopy = Array.from(rows);
    // rowsCopy[rowIndex] = row;
    setIsDownloadingReport(true);
    setDownloadingReportId(report.id)
    await downloadReport(report.id, report.fileName);
    setIsDownloadingReport(false);
    setDownloadingReportId(undefined);
  }

  const createRow = (report: IReport) => {
    const range = getRange(report);
    const isNotReady = report.reportStatus.status !== 'Ready'
    let buttonText = 'Download';
    if (downloadingReportId) {
      if (downloadingReportId === report.id) buttonText = 'Downloading'
    }
    return (
      <Row key={report.id}>
        <Cell>{report.id}</Cell>
        <Cell>{report.requestedAt}</Cell>
        <Cell>{range}</Cell>
        <Cell>{report.groups.join(', ')}</Cell>
        <Cell>{report.reportStatus.status}</Cell>
        <Cell>
          <Button 
            disabled={isNotReady || isDownloadingReport} 
            onClick={() => handleRowDownloadButton(report)}>{buttonText}
          </Button>
        </Cell>
      </Row>
    )
  };

  const createRows = (reports: IReport[]) => {
    const rows: IRow[] = [];
    const rowsComponents = []
    for (const report of reports) {
      const row: IRow = { reportId: report.id, isDownloading: false }
      rowsComponents.push(createRow(report));
      rows.push(row)
    }
    setRows(rows);
    return rowsComponents;
  }
  
  return (
    <div style={{ overflowX: 'initial' }}>
      
      <StyledTable>
        <Head>
          <HeaderRow>
            <HeaderCell>Report ID</HeaderCell>
            <HeaderCell>Report Request Date</HeaderCell>
            <HeaderCell>Requested Range</HeaderCell>
            <HeaderCell>Requested Groups</HeaderCell>
            <HeaderCell>Report Status</HeaderCell>
            <HeaderCell>Action</HeaderCell>
          </HeaderRow>
        </Head>
        <Body>
          {reports.map(createRow)}
        </Body>
      </StyledTable>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChange={onChangePage}
      />
      {isDownloadingReport &&
        <Notification style={{marginTop: '20px'}} type="info">
          <Title>Info</Title>
            Downloading your report
          <Close aria-label="Close Notification" />
        </Notification>
      }
    </div>
  );
};

export default ListReports;
