if (typeof ZAFClient === 'undefined') { // eslint-disable-line no-undef
    throw new Error("ZAFClient cannot run outside Zendesk")
} 

export default ZAFClient.init;