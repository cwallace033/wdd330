import"./style-b5814491.js";async function c(r,t={},e=8e3){const n=new AbortController,a=setTimeout(()=>n.abort(),e);try{const o=await fetch(r,{...t,signal:n.signal});if(clearTimeout(a),!o.ok)throw new Error(`HTTP error! Status: ${o.status}`);return await o.json()}catch(o){throw clearTimeout(a),console.error("Fetch error:",o),o}}const s="https://api.scryfall.com";async function i(r=""){const t=`${s}/cards/search?q=${encodeURIComponent(r)}`;return await c(t)}document.querySelector(".product-list");(async()=>{const r=document.querySelector("#app");r.innerHTML="<p>Loading cards...</p>";try{const t=await i("black lotus");r.innerHTML=t.map(e=>{var n;return`
        <div>
          <h2>${e.name}</h2>
          <img src="${((n=e.image_uris)==null?void 0:n.normal)||""}" alt="${e.name}">
        </div>`}).join("")}catch(t){r.innerHTML="<p>Error loading cards. Please try again.</p>",console.error(t)}})();
