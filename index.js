import{a as L,S,i as l}from"./assets/vendor-BzajH6aU.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();L.defaults.baseURL="https://pixabay.com/api/";const v={key:"46481963-10f537a41063d6fd7fead7408",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:1};var d={q:""};async function P(){const n=await L.get("",{params:d});return n.data.totalPages=Math.floor(n.data.totalHits/v.per_page)+1,n.data}function H(n){return d=v,d.q=n,P()}function T(){return d.page+=1,P()}function M(n){const t=document.createElement("ul");for(const s of n){const a=document.createElement("li");a.classList.add("gallery-item");const e=document.createElement("img");e.classList.add("gallery-image"),e.setAttribute("src",s.webformatURL),e.setAttribute("alt",s.tags);const r=document.createElement("a");r.classList.add("gallery-link"),r.setAttribute("href",s.largeImageURL),r.append(e),a.append(r);const o=document.createElement("div");o.classList.add("gallery-descr");const p=document.createElement("div");p.innerHTML=`<span>Likes</span>${s.likes}`,o.append(p);const f=document.createElement("div");f.innerHTML=`<span>Views</span>${s.views}`,o.append(f);const h=document.createElement("div");h.innerHTML=`<span>Comments</span>${s.comments}`,o.append(h);const y=document.createElement("div");y.innerHTML=`<span>Downloads</span>${s.downloads}`,o.append(y),a.append(o),t.append(a)}return t.innerHTML}function b(n){const{loadButton:t,nothingMore:s,curPage:a,totalPages:e}=n;return a<e?(t.classList.remove("visually-hidden"),s.classList.add("visually-hidden"),!0):(t.classList.add("visually-hidden"),s.classList.remove("visually-hidden"),!1)}const w=new S(".gallery a",{overlayOpacity:.8,className:"gallery-wrapper",captionsData:"alt",captionDelay:250});l.settings({class:"toast",position:"topRight",drag:!1});const u=document.querySelector(".load_more span"),i=document.querySelector(".gallery");var m=1,g=1;const c=document.querySelector(".load_more button"),E=document.querySelector(".load_more span"),q="We're sorry, but you've reached the end of search results.";document.getElementById("search-form").addEventListener("submit",n=>{n.preventDefault();const t=n.currentTarget,s=t.elements.queryStr.value.trim();if(s===""){t.reset();return}u.classList.remove("visually-hidden"),i.classList.add("visually-hidden"),i.innerHTML="",c.classList.add("visually-hidden"),H(s).then(a=>{a.total==0||a.hits.length==0?l.error({message:"Sorry, there are no images matching your search query. Please try again!"}):(m=1,g=a.totalPages,i.innerHTML=M(a.hits),i.classList.remove("visually-hidden"),w.refresh(),b({loadButton:c,nothingMore:E,curPage:m,totalPages:g})||l.info({message:q}))}).catch(a=>{l.error({message:a.message})}).finally(()=>{u.classList.add("visually-hidden"),t.reset()})});c.addEventListener("click",n=>{n.preventDefault(),u.classList.remove("visually-hidden"),c.classList.add("visually-hidden"),T().then(t=>{m+=1,g=t.totalPages,i.innerHTML+=M(t.hits),w.refresh();const s=i.querySelector("li:last-child").getBoundingClientRect();window.scrollBy(0,s.height*2),b({loadButton:c,nothingMore:E,curPage:m,totalPages:g})||l.info({message:q})}).catch(t=>{l.error({message:t.message})}).finally(()=>{u.classList.add("visually-hidden")})});
//# sourceMappingURL=index.js.map
