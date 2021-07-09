import React from 'react';
import './style.scss';
import zafClient from '../../frameworks_and_drivers/external_interfaces/zendesk/zaf_client';
import { DEFAULT_THEME, ThemeProvider } from '@zendeskgarden/react-theming';
import Dropdown from "../../components/Dropdown";
import { Row } from '@zendeskgarden/react-grid';
import Date from "../../components/Date";
import Generate from "../../components/Generate";



const groupOptions = [
  'USA',
  'Craftsman USA',
  'Black and Decker - USA',
  'Dewalt - USA',
  'Stanley - USA',
];

const formatOptions = [
  '.xlsx file',
  '.csv file'
];

const App = () => {
  const [requester, setRequester] = React.useState<any>()

  React.useEffect(() => {
    const execute = async() => {
      console.log('Aqui')
      zafClient.invoke('resize', { height: '400px' })
      const data = await zafClient.get('ticket.requester')
      console.log(data)
      const requester = data['ticket.requester']
      setRequester(requester)
    }
    execute();
  }, [])
  
  return (
    <div className="App">
      <div style={{ padding: DEFAULT_THEME.space.md }}>
        <ThemeProvider>
          <Row justifyContent="start">
            <Date/>
            <Dropdown title='Select group' options={groupOptions}/>
            <Dropdown title='Select format' options={formatOptions}/>
          </Row>
          
        </ThemeProvider>
      </div>
      <div style={{ padding: DEFAULT_THEME.space.md }}>
        <ThemeProvider>
              <Generate/>
        </ThemeProvider>
      </div>
    </div>
  )
}

export default App
