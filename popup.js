document.addEventListener('DOMContentLoaded', () => {
  const rateInput = document.getElementById('rate');
  const rateVal = document.getElementById('rateValue');
  const resetBtn = document.getElementById('resetBtn');

  function updateRate(value) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "setNightcore",
          value: parseFloat(value)
        }).catch(() => {});
      }
    });
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js']
      }, () => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "getNightcore" }, (response) => {
          if (response && response.value) {
            rateInput.value = response.value;
            rateVal.textContent = parseFloat(response.value).toFixed(2) + "x";
          }
        });
      });
    }
  });

  rateInput.addEventListener('input', (e) => {
    rateVal.textContent = parseFloat(e.target.value).toFixed(2) + "x";
    updateRate(e.target.value);
  });

  resetBtn.addEventListener('click', () => {
    rateInput.value = 1.0;
    rateVal.textContent = "1.00x";
    updateRate(1.0);
  });
});