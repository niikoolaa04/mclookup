console.log('MAIN.JS LOADED SUCCESSFULLY');

function resizeSend() {
  // let doc = document.querySelector('.homeTitle');
  // doc.innerHTML = document.documentElement.clientWidth + ' / ' + document.documentElement.clientHeight
  let doc = document.querySelector('.serverSubtitle');
  doc.innerHTML = document.documentElement.clientWidth + ' / ' + document.documentElement.clientHeight
}

window.onresize = resizeSend;