
import parallel from 'async/parallel';

const cbs = [];
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == 'complete') {
        const cbIndex = cbs.findIndex((cb => cb.tabId === tab.id));
        if (cbIndex > -1) {
            cbs[cbIndex].callback();
            cbs.splice(cbIndex, 1);
        }
    }
});

export default class PageUtility {

    static changePage(url, callback) {
        
        chrome.tabs.query({currentWindow: true, active: true}, (tab) => { 
            cbs.push({
                tabId: tab[0].id,
                callback: callback
            });

            chrome.tabs.update(tab[0].id, {url});
        });
    }

    static getPageInformations(callback) {

        parallel([
            function(cb) {
                chrome.tabs.executeScript({
                    code: '(function() { return document.body.innerHTML; })();'
                }, (results) => {
                    cb(null, results && results[0]);
                });
            },
            function(cb) {
                chrome.tabs.executeScript({
                    code: '(function() { return document.documentElement.lang; })();'
                }, (results) => {
                    cb(null, results && results[0]);
                });
            },
            function(cb) {
                chrome.tabs.executeScript({
                    code: '(function() { return location.pathname; })();'
                }, (results) => {
                    cb(null, results && results[0]);
                });
            },
            function(cb) {
                chrome.tabs.executeScript({
                    code: '(function() { return location.hostname; })();'
                }, (results) => {
                    cb(null, results && results[0]);
                });
            }
        ], function(err, [body, lang, pathname, hostname]) {
            callback({ body, lang, pathname, hostname });
        });

    }
}