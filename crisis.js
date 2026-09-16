const analysis = document.querySelector('.analysis');
const buttons = [...document.querySelectorAll('.states button')];
let timers = [];
const descriptions = {
 baseline: ['79 708', 'invånare nås', 'inom 10 minuter före avstängningen.', 'Grönt: nåbarhet före avstängning · 10 min.'],
 crisis: ['10 520', 'invånare nås', 'inom 10 minuter efter avstängningen.', 'Grönt: nåbarhet efter avstängning · 10 min.'],
 diff: ['69 188', 'färre invånare nås', 'inom 10 minuter efter avstängningen.', 'Rosa: nåddes före, men inte efter inom 10 min.']
};
function cancelReplay(){timers.forEach(clearTimeout);timers=[];document.querySelector('#replay').disabled=false;analysis.classList.remove('tracing');}
function setState(state){analysis.dataset.state=state;buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.state===state)));const d=descriptions[state];document.querySelector('#population').textContent=d[0];document.querySelector('#population-label').textContent=d[1];document.querySelector('#stat-context').textContent=d[2];document.querySelector('.state-description').textContent=d[3];}
buttons.forEach(b=>b.addEventListener('click',()=>{cancelReplay();setState(b.dataset.state)}));
document.querySelector('#areas-toggle').addEventListener('change',e=>analysis.classList.toggle('hide-areas',!e.target.checked));
document.querySelector('#route-toggle').addEventListener('change',e=>analysis.classList.toggle('hide-routes',!e.target.checked));
document.querySelector('#replay').addEventListener('click',()=>{cancelReplay();setState('baseline');document.querySelector('#replay').disabled=true;timers.push(setTimeout(()=>{setState('crisis');analysis.classList.add('tracing')},1200));timers.push(setTimeout(()=>{setState('diff');cancelReplay()},4200));});

const film=document.querySelector('#film-dialog');
const video=film.querySelector('video');
const filmTabs=[...film.querySelectorAll('.film-tab')];
filmTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filmTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const wasPlaying = !video.paused;
    video.src = tab.dataset.src;
    if (wasPlaying) video.play();
  });
});
document.querySelector('#film-open').addEventListener('click',()=>film.showModal());
document.querySelector('#film-open-toolbar')?.addEventListener('click',()=>film.showModal());
film.querySelector('[data-close]').addEventListener('click',()=>film.close());
film.addEventListener('close',()=>video.pause());
function reportHeight(){parent.postMessage({type:'restidsanalys-crisis-height',height:Math.ceil(document.body.getBoundingClientRect().height)+4},'*')}
new ResizeObserver(reportHeight).observe(document.body);addEventListener('load',reportHeight);

addEventListener('resize',()=>{setTimeout(reportHeight,100);setTimeout(reportHeight,350)});
