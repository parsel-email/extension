export {}

chrome.action.onClicked.addListener(async (tab) => {
  // For a tab-specific side panel, you would check tab.id.
  await chrome.sidePanel.open({ tabId: tab.id });
});
