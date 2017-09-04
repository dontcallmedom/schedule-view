const color = d3.scaleOrdinal(['#F99','#fc9','#ff9','#cf9','#9f9','#9fc', '#9ff']);

const schedule = new Map([
    [{y: 2017, m: 10, d: 6, href:"https://www.w3.org/2017/11/TPAC/schedule.html#Monday"},
     [{blocks: [{start: 800, end: 1800, name: "Groups", href:"https://www.w3.org/2017/11/TPAC/schedule.html#Monday"}], color: color(0)},
     {blocks: [{start: 1000, end: 1100, name: "Coffee break"},
               {start: 1500, end: 1600, name: "Coffee break", ta: 'start'},
               {start: 1200, end: 1400, name: "Lunch"}], color: color(1),
      summary: "Coffee break between 10 and 11am, 3 and 4pm, lunch between 12 and 2pm"
     },
      {blocks: [{start: 1800, end: 1900, name: "Dev demos", href:"https://www.w3.org/2017/11/Meetup/"},
                {start: 1900, end: 2200, name: "Dev meetup", href:"https://www.w3.org/2017/11/Meetup/"}], color: color(2)}]],
    [{y: 2017, m: 10, d: 7, href:"https://www.w3.org/2017/11/TPAC/schedule.html#Tuesday"},
     [{blocks: [{start: 700, end: 830, name: "Chairs Breakfast", ta: 'start', href: "https://www.w3.org/2017/11/TPAC/schedule.html#chairs"}], color: color(6)},
      {blocks: [{start: 800, end: 1800, name: "Groups", href:"https://www.w3.org/2017/11/TPAC/schedule.html#Tuesday"}], color: color(0)},
      {blocks: [{start: 1000, end: 1100, name: "Coffee break"},
               {start: 1500, end: 1600, name: "Coffee break", ta: 'start'},
               {start: 1200, end: 1400, name: "Lunch"}], color: color(1),
      summary: "Coffee break between 10 and 11am, 3 and 4pm, lunch between 12 and 2pm"},
      {blocks: [{start: 1450, end:1500, name: "Registration", title: "AC Meeting Registration"},
                {start: 1500, end: 1800, name: "AC Meeting", href: "https://www.w3.org/2017/11/TPAC/schedule.html#ac-tue"},
               {start: 1900, end: 2200, name: "AC Dinner", href: "https://www.w3.org/2017/11/TPAC/schedule.html#ac-tue"}], color: color(3)}
      ]],
    [{y: 2017, m: 10, d: 8, href:"https://www.w3.org/2017/11/TPAC/schedule.html#Wednesday"},
     [
         {blocks: [{start: 800, end: 1800, name: "Plenary Day", href:"https://www.w3.org/2017/11/TPAC/schedule.html#Wednesday"}], color: color(0)},
         {blocks: [{start: 1315, end: 1800, name: "Web Executive Forum", href:"http://www.webexecutiveforum.com/"},
                {start: 1215, end: 1315, name: "Registration", title: "Executive Forum Registration"}], color: color(5)},
{blocks: [{start: 925, end: 1000, name: "Coffee break"},
                {start: 1500, end: 1530, name: "Coffee break", ta: 'start'},
                {start: 1200, end: 1400, name: "Lunch"},
                {start: 1830, end: 2130, name: "Reception"}], color: color(1),
      summary: "Coffee break between 10 and 11am, 3 and 4pm, lunch between 12 and 2pm"}
     ]],
    [{y: 2017, m: 10, d: 9, href:"https://www.w3.org/2017/11/TPAC/schedule.html#Thursday"},
     [{blocks: [{start: 800, end: 1800, name: "Groups", href: "https://www.w3.org/2017/11/TPAC/schedule.html#Thursday"}], color: color(0)},
     {blocks: [{start: 1000, end: 1100, name: "Coffee break"},
               {start: 1500, end: 1600, name: "Coffee break", ta: 'start'},
               {start: 1200, end: 1400, name: "Lunch"}], color: color(1),
      summary: "Coffee break between 10 and 11am, 3 and 4pm, lunch between 12 and 2pm"},
      {blocks: [{start: 1430, end:1500, name: "Registration", title: "AC Meeting Registration"}, {start: 1500, end: 1800, name: "AC Meeting", href:"https://www.w3.org/2017/11/TPAC/schedule.html#ac"}], color: color(3)},
      {blocks: [{start: 800, end:900, name:"Registration", title: "Publishing Summit Registration"},{start: 900, end: 1700, name: "Publishing Summit", href: "https://www.w3.org/publishing/events/summit2017"}], color: color(4)}
     ]],
    [{y: 2017, m: 10, d: 10, href:"https://www.w3.org/2017/11/TPAC/schedule.html#Friday"},
     [{blocks: [{start: 800, end: 1800, name: "Groups", href:"https://www.w3.org/2017/11/TPAC/schedule.html#Friday"}], color: color(0)},
     {blocks: [{start: 1000, end: 1100, name: "Coffee break"},
               {start: 1500, end: 1600, name: "Coffee break", ta: 'start'},
               {start: 1200, end: 1400, name: "Lunch"}], color: color(1),
      summary: "Coffee break between 10 and 11am, 3 and 4pm, lunch between 12 and 2pm"},
      {blocks: [{start: 830, end:900, name:"Registration", title: "Publishing Summit Registration"}, {start: 900, end: 1700, name: "Publishing Summit", href: "https://www.w3.org/publishing/events/summit2017"}], color: color(4)}
     ]]
]);

new ScheduleMaker('#schedule', schedule);

