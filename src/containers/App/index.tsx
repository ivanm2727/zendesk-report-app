import React, { useState } from 'react';
import './style.scss';
import zafClient from '../../frameworks_and_drivers/external_interfaces/zendesk/zaf_client';
import { DEFAULT_THEME, ThemeProvider } from '@zendeskgarden/react-theming';
import Dropdown from "../../components/Dropdown";
import { Row } from '@zendeskgarden/react-grid';
import DateComponent from "../../components/DateComponent";
import Generate from "../../components/Generate";
import { getReport } from '../../frameworks_and_drivers/external_interfaces/reports_api';



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

const App = () => {
  const [startDate, setStartDate] = useState<string>(new Date().toISOString()) 
  const [endDate, setEndDate] = useState<string>(new Date().toISOString())
  const [selectedGroup, setSelectedGroup] = useState(groupOptions[0]);
  const [selectedFormat, setSelectedFormat] = useState(formatOptions[0]);
 

  const handleOnClickButton = async () => {
    await getReport({ start: startDate, end: endDate, group: selectedGroup, export_type: selectedFormat })
  }

  return (
    <div className="App">
      <div style={{ padding: DEFAULT_THEME.space.md }}>
        <ThemeProvider>
          <Row justifyContent="start">
            <DateComponent 
              handleOnChangeStartDate={(date: Date) => {
                date.setHours(0);
                setStartDate(date.toISOString())
              }}
              handleOnChangeEndDate={(date: Date) => {
                date.setHours(12);
                setEndDate(date.toISOString());
              }}
            />
            <Dropdown 
              title='Select group' 
              options={groupOptions} 
              handleOnSelectItem={(selectedGroup: any) => setSelectedGroup(selectedGroup)}
            />
            <Dropdown 
              title='Select format' 
              options={formatOptions} 
              handleOnSelectItem={(selectedFormat: any) => setSelectedFormat(selectedFormat)}
            />
          </Row>
          
        </ThemeProvider>
      </div>
      <div style={{ padding: DEFAULT_THEME.space.md }}>
        <ThemeProvider>
            <Generate handleOnClickButton={handleOnClickButton}/>
        </ThemeProvider>
      </div>
    </div>
  )
}

export default App
