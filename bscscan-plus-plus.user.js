// ==UserScript==
// @name         BSCScan plus plus
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       kepeto
// @match        https://bscscan.com/*/*
// @icon         https://www.google.com/s2/favicons?domain=bscscan.com
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    $(document).ready(function() {
        inject();
    });


    function inject(){

        var contract = getElementByXpath('//*[@id="mainaddress"]').textContent;

        if(contract === null) contract = getElementByXpath('/html/body/div[1]/main/div[4]/div[1]/div[2]/div/div[2]/div[1]/div[2]/div/a[1]').text;

        if(contract !== null){
            var img = "data:image/png;base64,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";
            var dexGuruUrl = "https://dex.guru/token/" + contract;
            var pancakeUrl = "https://exchange.pancakeswap.finance/#/swap?outputCurrency=" + contract;
            var pooChartUrl = "https://poocoin.app/tokens/" + contract;

            $('body').append(
                `<img src="${img}" alt="Workplace" usemap="#coinmap" id="btn">
            <map name="coinmap">
              <area shape="rect" coords="5,6,120,35" alt="Pancake Swap" href="${pancakeUrl}" target="_blank">
              <area shape="rect" coords="5,41,120,76" alt="dex.guru" href="${dexGuruUrl}" target="_blank">
              <area shape="rect" coords="5,84,120,120" alt="dex.guru" href="${dexGuruUrl}" target="_blank">
            </map>`
            );

            $("#btn").css("position", "fixed").css("bottom", 5).css("left", 5);

        }
    }

   function getElementByXpath(path) {
       return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
   }
})();