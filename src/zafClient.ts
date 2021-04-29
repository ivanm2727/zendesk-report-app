// The ZAFClient is imported within the index.html file.
// See docs for help regarding the ZAFClient: https://developer.zendesk.com/apps/docs/developer-guide/getting_started
import initZAFClient from "./frameworks_and_drivers/external_interfaces/zendesk";

let client = initZAFClient();

export default client
