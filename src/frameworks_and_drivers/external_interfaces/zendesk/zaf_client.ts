// The ZAFClient is imported within the index.html file.
// See docs for help regarding the ZAFClient: https://developer.zendesk.com/apps/docs/developer-guide/getting_started
import initZAFClient from "./zendesk";

const client = initZAFClient();

export default client
