import{s as e}from"./utils-bfd49f96.js";function r(t){if(t.ok)return t.json();throw new Error("Bad Response")}function a(t="tents"){return fetch(`../json/${t}.json`).then(r).then(n=>n)}async function d(t){return(await a()).find(o=>o.Id===t)}function c(t){e("so-cart",t)}async function s(t){const n=await d(t.target.dataset.id);c(n)}document.getElementById("addToCart").addEventListener("click",s);