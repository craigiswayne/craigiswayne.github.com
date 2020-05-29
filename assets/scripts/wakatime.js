export const WakaTime = {
  apiBase: 'https://wakatime.com/share',
  username: 'craigiswayne',
  shareID: '259d6e52-3683-4102-a313-3a777ccc3614',
  languages: {
    url: () => {
      return WakaTime.apiBase + '/@' + WakaTime.username + '/' + WakaTime.shareID + '.json';
    },
    get: async function(){

      const myPromise = new Promise(function(resolve, reject) {
        $.ajax({
          type: 'GET',
          url: WakaTime.languages.url(),
          dataType: 'jsonp',
          success: response => {
            resolve(response);
            return response;
          },
          error: response => {
            reject(response);
            return response;
          }
        });
      });

      myPromise.then(response => {
        response.data.forEach(function(i) {
          Resume.vm.WakaTimeLanguages.push([i.name, i.percent]);
        });
        Resume.vm.WakaTimeLanguages = Resume.vm.WakaTimeLanguages.slice(0,10);
        return Resume.vm.WakaTimeLanguages;
      })
      .catch(err => {
        console.group( 'WakaTime info could not be found');
        console.error( err.statusText );
        console.info(err);
        console.groupEnd();
        return [];
      });
    }
  }
};