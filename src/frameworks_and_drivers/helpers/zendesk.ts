import client from "../external_interfaces/zendesk/zaf_client";

const zendeskAppConfig:any ={}
client.on('app.registered', (_appData: any) => {
  client.metadata().then(async (metadata: any) => {
    console.log('Aqui');
    
    zendeskAppConfig.baseUrl = metadata.settings.base_url

    console.log(zendeskAppConfig.baseUrl);
    var context = await client.context()
  })
})
export default zendeskAppConfig