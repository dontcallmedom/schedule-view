function ScheduleMaker(container, schedule) {
    const resize = () => {
        const vwWidth = parseInt(window.getComputedStyle(document.querySelector(container)).width, 10);
        const xScale = vwWidth / 800;
        [...document.querySelectorAll('[data-x-scale]')].forEach(n => {
            n.dataset["xScale"].split(' ').forEach(attr => {
                n.setAttribute(attr, n.dataset[attr] * xScale + (n.dataset[attr+'Add'] ? parseInt(n.dataset[attr+'Add'], 10)*xScale : 0) );
            });
        });
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const blockHeight = 25;

    const margin = {top: 10, right: 10, bottom: 20, left: 10},
          width = 800 - margin.left - margin.right,
          height = [...schedule.values()].reduce((a,b) => a + b.length, 0) * (blockHeight + 4);

    // Set the ranges
    const x = d3.scaleLinear().range([0, width]);

    // Adds the svg canvas
    const svgroot = d3.select(container)
          .append("svg")
          .attr('data-x-scale', 'width')
          .attr('data-width-add', margin.left + margin.right)
          .attr('data-width', width)
          .attr('height', height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

    // calculate this
    const defaultExtent = [700,2200];
    x.domain(defaultExtent);

    const toAmPm = t => t < 1200 ? Math.floor(t/100) + 'AM' : (t == 1200 ? '12PM' : (Math.floor((t)/100) - 12) + 'PM' );

    const ticks = svgroot.selectAll('tick').data([800, 1000, 1200, 1400, 1600, 1800, 2000, 2200])
          .enter()
          .append('g').attr('class', 'tick');
    ticks.append('text')
        .attr('data-x-scale', 'x')
        .attr('data-x', x)
        .attr('text-anchor', 'middle')
        .attr('y', height + 15)
        .text(toAmPm);

    const mapTime00 = t => Math.floor(t/100)*100 + Math.round(t%100 * 100 / 60);

    let heightOffset = 0;
    [...schedule.entries()].forEach(([day, sched], i) => {
        const dayHeight = sched.length * (blockHeight + 4);
        const y = d3.scaleLinear().range([dayHeight, 0]);

        const svg = svgroot.append("g")
              .attr("role", "region")
              .attr("transform", "translate(0," + heightOffset + ")");
        svg.append("rect")
            .attr('fill', i % 2 ? 'white' : '#eee')
            .attr('data-x-scale', 'width')
            .attr('data-width', width)
            .attr('height', dayHeight);

        const hours = [...Array(15).keys()].map(x => x*100 + 700)
        svg.selectAll(".hour").data(hours).enter()
            .append('line')
            .attr('class', 'hour')
            .attr('stroke','#aaa')
            .attr('data-x-scale', 'x1 x2')
            .attr('data-x1', x)
            .attr('data-x2', x)
            .attr('y1', 0)
            .attr('y2', dayHeight);

        svg.append('line')
            .attr('x1', 0)
            .attr('data-x-scale', 'x2')
            .attr('data-x2', width)
            .attr('y1', dayHeight)
            .attr('y2', dayHeight)
            .attr('stroke', '#000');1

        // filter for background color on text
        const filter = d3.select("svg")
              .append("defs")
              .append("filter")
              .attr("x", 0)
              .attr("y", 0)
              .attr("width", 1)
              .attr("height", 1)
              .attr("id", "solid");
        filter.append("feFlood")
            .attr("flood-color", "white")
            .attr("flood-opacity", "0.8");
        filter.append("feComposite")
            .attr("in", "SourceGraphic");
        const dayOfWeek = days[new Date(day.y, day.m, day.d).getDay()];

        svg.append('a')
            .attr('xlink:href', day.href)
            .append('text')
            .attr("role", "heading")

            .attr('class', 'day')
            .attr('letter-spacing', "-0.05em")
            .attr('fill', '#777')
            .attr('data-x-scale', 'x')
            .attr('data-x', width)
            .attr('y', 25)
            .attr('text-anchor', 'end')
            .attr("dominant-baseline", "central")
            .attr('font-weight', 'bold')
            .attr('font-size', 60)
            .text(dayOfWeek.slice(0,2))
            .append("title")
            .text("Schedule for " + dayOfWeek);

        const lines = svg.selectAll(".line").data(sched.map((l,i) => {l.line = i; return l;})).enter()
              .append('g')
              .attr('class', 'line');
        lines.filter(d => d.summary)
            .append('a')
            .attr('xlink:href', '#')
            .append('rect')
            .attr('data-x-scale', 'width')
            .attr('data-width', d => x(mapTime00(Math.max(...d.blocks.map(b => b.end)))))
            .attr('height', blockHeight)
            .attr('fill', 'transparent')
            .attr('y', d => d.line*(blockHeight+4))
            .append('title')
            .attr('class', 'summary')
            .text(d => d.summary);

        blocks = lines.selectAll(".block").data((d,i) => d.blocks.map(x => { x.line = i; x.color = d.color; return x;})).enter()
            .append('g')
            .attr('class', 'block');
        blocks.append('rect')
            .attr('data-x-scale', 'x width')
            .attr('data-x-add', 1)
            .attr('data-x', d => x(mapTime00(d.start)))
            .attr('height', blockHeight)
            .attr('y', d => d.line*(blockHeight+4))
            .attr('data-width', d => x(mapTime00(d.end)) - x(mapTime00(d.start)))
            .attr('data-width-add', -1)
            .attr('fill', d => d.color);
        blocks.append('a')
            .attr('xlink:href', d => d.href)
            .attr("aria-labelledby", (d,i) => "title-" + (d.line) + "-" + i)
            .append('text')
            .attr('text-anchor', d => d.ta ? d.ta : 'end')
            .attr('data-x-scale', 'x')
            .attr("dominant-baseline", "central")
            .attr('data-x-add', d => d.ta == 'start' ? 2 : - 4)
            .attr('data-x', d => d.ta == 'start' ? x(mapTime00(d.start)) : x(mapTime00(d.end)))
            .attr('y', d => d.line*(blockHeight+4) + blockHeight/2 )
            .attr('font-size', 12)
            .attr("filter", "url(#solid")
            .text(d => d.name)
            .append("title")
            .attr("id", (d,i) => "title-" + (d.line) + "-" + i)
            .text(d => "Between " + toAmPm(d.start) + " and  " + toAmPm(d.end) + " on " + dayOfWeek + ", " + d.name);
        heightOffset += dayHeight;
    });
    resize();

    return {resize};
}

