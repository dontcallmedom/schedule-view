// We duplicate this here for re-use in static export rather than dynamically generated with d3
const resize = () => {
    const vwWidth = parseInt(window.getComputedStyle(document.querySelector('#schedule')).width, 10);
    const xScale = vwWidth / 800;
    [...document.querySelectorAll('[data-x-scale]')].forEach(n => {
        n.dataset["xScale"].split(' ').forEach(attr => {
            n.setAttribute(attr, n.dataset[attr] * xScale + (n.dataset[attr+'Add'] ? parseInt(n.dataset[attr+'Add'], 10)*xScale : 0) );
        });
    });
}

const throttler = (fn) => {
    const interval = 100;
    let t= Date.now();
    const throttled = () => {
        if (t + interval - Date.now() < 0) {
            fn();
            t = Date.now();
        } else {
            setTimeout(throttled, interval);
        }
    };
    return throttled;
};

window.addEventListener('resize', throttler(resize));
resize();
