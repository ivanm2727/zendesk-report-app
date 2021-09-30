import React from 'react';
import ReactDOM from 'react-dom';
import 'promise-polyfill/src/polyfill';
import App from "./containers/App";

import './global.scss';
import client from './frameworks_and_drivers/external_interfaces/zendesk/zaf_client';
// import Navigation from './components/Navigation'
// import { DEFAULT_THEME, ThemeProvider } from '@zendeskgarden/react-theming'

const zendeskAppConfig: any = {}
const root = document.getElementById('root')

// client.on('app.registered', (_appData: any) => {
//   client.metadata().then(async (metadata: any) => {
//     console.log('Aqui');
    
//     zendeskAppConfig.baseUrl = metadata.settings.base_url

//     console.log(zendeskAppConfig.baseUrl);
//     var context = await client.context()
    // ReactDOM.render(
    //   <div>
    //     <App/>
    //   </div>
    // , document.getElementById('root')
    // )
    // switch (context.location) {
    //   case 'ticket_sidebar':
    //     ReactDOM.render(<TicketSidebar />, root)
    //     break
    //   case 'top_bar':
    //     ReactDOM.render(<TopBar />, root)
    //     break
    //   case 'modal':
    //     // open according to query string
    //     switch (query.open) {
    //       case 'case-modal':
    //         ReactDOM.render(
    //           <ApplicationContextProvider>
    //             <CaseModal />
    //           </ApplicationContextProvider>, root)
    //         break
    //     }
    //     break
    //   default:
    // }
//   })
// })

// export { zendeskAppConfig}

ReactDOM.render(
    <div>
      <App/>
    </div>
  , document.getElementById('root')
)
