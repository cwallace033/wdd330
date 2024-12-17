import"./style-b5814491.js";import{g as n,q as c,s as l}from"./utils-e78f15c0.js";function o(){const t=n("cart")||[],a=c(".product-list");if(!t.length){a.innerHTML="<p>Your cart is empty.</p>";return}const e=t.map(d).join("");a.innerHTML=e,document.querySelectorAll(".remove-item").forEach(r=>{r.addEventListener("click",()=>u(r.dataset.id))})}function d(t){return`
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${t.image}" alt="${t.name}" />
      </a>
      <h2 class="card__name">${t.name}</h2>
      <p class="cart-card__quantity">Qty: ${t.quantity}</p>
      <p class="cart-card__price">$${(t.price*t.quantity).toFixed(2)}</p>
      <button class="remove-item" data-id="${t.id}">Remove</button>
    </li>`}function u(t){let a=n("cart")||[];a=a.filter(e=>e.id!==t),l("cart",a),o(),i()}function m(){return(n("cart")||[]).reduce((a,e)=>{const r=parseFloat(e.price)||0,s=e.quantity||0;return a+r*s},0).toFixed(2)}function i(){const t=m(),a=c(".cart-total");a?t>0?a.innerHTML=`Total: $${t}`:a.innerHTML="Total: $0.00":console.error("Cart total element not found")}function p(){o(),i()}document.addEventListener("DOMContentLoaded",()=>{p()});
