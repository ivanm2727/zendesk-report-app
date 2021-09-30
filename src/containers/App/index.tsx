import React, { useState } from 'react';
import './style.scss';
import { DEFAULT_THEME, ThemeProvider } from '@zendeskgarden/react-theming';
import { createReport as createReport } from '../../frameworks_and_drivers/external_interfaces/reports/reports_api';
import { useEffect } from 'react';
import client from '../../frameworks_and_drivers/external_interfaces/zendesk/zaf_client';
import { isEmptyObject } from '../../frameworks_and_drivers/helpers/validators';
import { Tabs, TabList, Tab, TabPanel } from '@zendeskgarden/react-tabs';
import GetReportComponent from '../../components/CreateReport';
import ListReports, { IPageInfo } from '../../components/ListReports';
import { IReport } from '../../frameworks_and_drivers/external_interfaces/reports/interfaces/report';
import { getReports } from '../../frameworks_and_drivers/external_interfaces/reports/reports_api';


const PAGE_SIZE = 10;

const groupOptions = [
  'USA',
  'Craftsman USA',
  'Black and Decker - USA',
  'Dewalt - USA',
  'Stanley - USA',
];

const formatOptions = [
  'xlsx',
  'csv'
];

const TABS = {
  tab1: {
    key: 'generate-report',
    title: 'Generate Report'
  },
  tab2: {
    key: 'get-report',
    title: 'Get Report'
  }
}

const initialPageInfo: IPageInfo = {
  currentPage: 1,
  totalPages: 1,
  pageSize: PAGE_SIZE
}

const App = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedTab, setSelectedTab] = useState<string>(TABS.tab1.key);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString()) 
  const [endDate, setEndDate] = useState<string>(new Date().toISOString())
  const [selectedGroups, setSelectedGroups] = useState<String[]>([groupOptions[0]]);
  const [selectedFormat, setSelectedFormat] = useState(formatOptions[0]);
  const [pageInfo, setPageInfo] = useState<IPageInfo>(initialPageInfo);
  const [reports, setReports] = useState<IReport[]>([]);

  const setNewPageInfo = (page: number, totalItems: number) => {
    const newPageInfo: IPageInfo = {
      currentPage: page,
      pageSize: PAGE_SIZE,
      totalPages: Math.ceil(totalItems/PAGE_SIZE)
    }
    setPageInfo(newPageInfo);
  }

  const fetchReports = async (page: number = 1, pageSize: number = PAGE_SIZE) => {
    const response = await getReports(page, pageSize);
    if (response.data.result) {
      const { items, total } = response.data.result;
      setReports(items);
      setNewPageInfo(page, total);
    }
  }

  const getStartDate = (date?: Date) => {
    date = date ? date : new Date()
    date.setHours(0)
    date.setMinutes(0)
    return date.toISOString()
  }

  const getEndDate = (date?: Date) => {
    date = date ? date : new Date()
    date.setHours(23)
    date.setMinutes(59)
    return date.toISOString()
  }

  useEffect(() => {
    setLoading(true)
    fetchReports()
    setStartDate(getStartDate())
    setEndDate(getEndDate())
    setLoading(false)
  }, [])

  const handleOnClickButton = async () => {
    const response = await client.get('currentUser');     
    if (!isEmptyObject(response.errors)) {
      throw new Error(response.errors)
    }
    const currentUser = response.currentUser;    
    await createReport({ 
      start: startDate, 
      end: endDate, 
      group: selectedGroups.join(','), 
      export_type: selectedFormat,
      requester: currentUser.email
    })
  }

  const onChangePage = async (page: number) => {    
    await fetchReports(page);
  }

  const onChangeTab = async (tabKey: string) => {
    if (tabKey === TABS.tab2.key) {
      await fetchReports(pageInfo.currentPage);
    }
    setSelectedTab(tabKey);
  }
  
  return (
    <div>
      {loading 
      || 
      <React.Fragment>
        <div style={{ padding: DEFAULT_THEME.space.md }}>
          <ThemeProvider>
            <Tabs selectedItem={selectedTab} onChange={(event) => onChangeTab(event)} >
              <TabList className='App__tab-selector'>
                <Tab item={TABS.tab1.key}>{TABS.tab1.title}</Tab>
                <Tab item={TABS.tab2.key}>{TABS.tab2.title}</Tab>
              </TabList>
              <TabPanel item={TABS.tab1.key} style={{minHeight: '600px'}}>
                <GetReportComponent 
                  groupOptions={groupOptions}
                  formatOptions={formatOptions}
                  handleStartDateChange={(date) => setStartDate(getStartDate(date))}
                  handleEndDateChange={(date: Date) => setEndDate(getEndDate(date))}
                  handleGroupChange={(groups: string[]) => setSelectedGroups(groups)}
                  handleFormatChange={(format: string) => setSelectedFormat(format)} 
                  handleOnClickButton={() => handleOnClickButton()}                
                />
              </TabPanel>
              <TabPanel item={TABS.tab2.key} style={{minHeight: '100%'}}>
                <ListReports 
                  reports={reports} 
                  pageInfo={pageInfo}
                  onChangePage={onChangePage}
                />
              </TabPanel>
            </Tabs>
          </ThemeProvider>
        </div>
        
        
      </React.Fragment>
      }
      
    </div>
      
  )
}

export default App
