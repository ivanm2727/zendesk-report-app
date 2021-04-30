import React from 'react';
import './style.scss';
import zafClient from '../../frameworks_and_drivers/external_interfaces/zendesk/zaf_client';
import Footer from "../../components/Footer";

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
      <p className="Requester-name">Requesters name is {requester ? requester.name : ''}.</p>
      <Footer />
    </div>
  )
}

export default App
