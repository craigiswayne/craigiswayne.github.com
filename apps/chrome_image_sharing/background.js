chrome.contextMenus.onClicked.addListener(function(info, tab) {
	console.debug(info);
	console.debug(tab);
});

chrome.contextMenus.create({
  id: 'open',
  title: "Send Image to...",
  contexts: ["image"]
});
