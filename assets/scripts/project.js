Resume.WakaTime = WakaTime; // This value comes from a the wakatime.html file

Resume.vm = new Vue({
  el: '#latest-9-languages',
  mounted: WakaTime.languages.get,
  data: {
    WakaTimeLanguages: [],
    // WakaTimeLanguagesColors: ['#086375', '#0e88a7', '#12afd6', '#2dc7ee', '#5dd4f1', 'ba#8ce0f5', '#69D1C5'],
    WakaTimeLanguagesColors: ['#69D1C5', '#69D1C5'],
    // WakaTimeLanguagesColors: ['#086375'],
    // WakaTimeLanguagesColors: ['#3b8292','#69D1C5'],
  }
});
