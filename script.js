const iframe = document.querySelector('iframe');
const search = window?.location?.search?.replace('?', '').split('&');
const params = {};
search?.forEach((r, idx) => {
  const key = r.split('=')[0];
  const value = r.split('=')[1];

  if (typeof params[key] === 'object') {
    params[key].push(value);
  } else if (params[key] === undefined) {
    params[key] = value;
  } else {
    params[key] = [params[key], value];
  }
});
const timer = params?.timer;
const isTimerProblem = timer === undefined || timer < 2000;
const SECONDS = isTimerProblem ? 7000 : timer;
let current = false;
if (typeof params.url !== 'object') {
  params.url = ['example.com'];
}
//////////////////////
//////////////// main
let counter = 0;
swapFrames();
setInterval(() => {
  if (params.autoScroll === 'true') {
    window.scrollTo({ top: 0 });
  }
  updateScriptSrcRandomly();
  swapFrames();
}, SECONDS);
/////////////////////////////////////
/////////////////////////// FUNCTIONS
function swapFrames() {
  iframe.src = 'https://' + params?.url[counter];
  counter++;
  if (params?.url.length <= counter) counter = 0;
}
function updateScriptSrcRandomly() {
  const rand = Math.floor(Math.random() * 999999999999999);
  document.querySelector('#main').src = `./script.js?${rand}`;
}
