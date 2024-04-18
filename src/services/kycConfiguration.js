const axios = require('axios');

export const generateKYCToken = async (address) => {
    try {
        const response = await axios.post(
            `https://api.sumsub.com/resources/accessTokens?ttlInSecs=600&userId=${address}&levelName=basic-kyc-level`,
            {},
            {
                headers: {
                    'X-App-Token': process.env.REACT_APP_KYC_APP_TOKEN
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error generating KYC token:', error);
        throw error; // Propagate the error to the caller if needed
    }
};

/**
 * Launches the Sumsub Web SDK with the specified parameters.
 * @param {string} accessToken - Access token generated on the backend.
 * @param {string} applicantEmail - Applicant email (optional).
 * @param {string} applicantPhone - Applicant phone (optional).
 * @param {Object} customI18nMessages - Customized locale messages (optional).
 */
function launchWebSdk(accessToken, applicantEmail, applicantPhone, customI18nMessages) {
    let snsWebSdkInstance = snsWebSdk.init(accessToken, () => getNewAccessToken())
        .withConf({
            lang: 'en',
            email: applicantEmail,
            phone: applicantPhone,
            theme: 'dark', 
        })
        .withOptions({
            addViewportTag: false, 
            adaptIframeHeight: true, 
        })
        .on('idCheck.onStepCompleted', (payload) => {
            console.log('Step completed:', payload);
        })
        .on('idCheck.onError', (error) => {
            console.error('Error occurred:', error);
        })
        .build();
  
    snsWebSdkInstance.launch('#sumsub-websdk-container');
  }
  

  function getNewAccessToken() {
    return Promise.resolve('newAccessToken'); 
  }
  




