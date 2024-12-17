import"./style-b5814491.js";import{a as i}from"./utils-e78f15c0.js";async function s(a){try{const e=await(await fetch(`https://api.scryfall.com/cards/search?q=color:${a}`)).json();if(!e.data||e.data.length===0)throw new Error("No cards found for this color");return e.data.map(t=>{var o,c;return{id:t.id,name:t.name,imageUrl:((o=t.image_uris)==null?void 0:o.normal)||"default-image.jpg",price:((c=t.prices)==null?void 0:c.usd)||"N/A"}})}catch(r){return console.error("Error fetching cards:",r),[]}}document.addEventListener("DOMContentLoaded",()=>{const r=new URLSearchParams(window.location.search).get("color");if(r){const e=document.getElementById("color-heading");e.textContent=`${r.charAt(0).toUpperCase()+r.slice(1)} Cards`,s(r).then(t=>{l(t)}).catch(t=>{console.error("Error fetching cards:",t)})}else console.error("No color specified in the URL")});function l(a){const r=document.getElementById("product-container");if(r.innerHTML="",a.length===0){r.innerHTML="<p>No cards found for this color.</p>";return}a.forEach(e=>{if(e.price==="N/A"){const t=document.createElement("div");t.classList.add("product-card"),t.innerHTML=`
    <div class="card" data-id="${e.id}">
      <img src="${e.imageUrl}" alt="${e.name}" />
      <div class="card-details">
        <h2>${e.name}</h2>
        <p>Price: $${e.price}</p>
        <p class="add-to-cart">Card unavailable for purchase</p>
      </div>
    </div>
    `,r.appendChild(t)}else{const t=document.createElement("div");t.classList.add("product-card"),t.innerHTML=`
    <div class="card" data-id="${e.id}">
      <img src="${e.imageUrl}" alt="${e.name}" />
      <div class="card-details">
        <h2>${e.name}</h2>
        <p>Price: $${e.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    </div>
    `,r.appendChild(t)}}),p()}function p(){document.querySelectorAll(".add-to-cart").forEach(r=>{r.addEventListener("click",e=>{const t=e.target.closest(".card"),o=t.dataset.id,c=t.querySelector("h2").textContent,n=parseFloat(t.querySelector("p").textContent.replace("Price: $","").trim()),d=t.querySelector("img").src;i({id:o,name:c,price:n,image:d,quantity:1})})})}
