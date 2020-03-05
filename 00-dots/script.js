console.clear()


var c = d3.conventions({
  sel: d3.select('#graph').html(''),
  height: 800,
  margin: {right: 50},
  layers: 'cs'
})

var ctx = c.layers[0]

var colWidth = c.width/6
var cellWidth = d3.scaleLinear().domain([0,6457]).range([0, colWidth])

var outline = [
  {
    offset: 4.5,
    y: 0,
    nodes: [
      {
        order: 4.5,
        value: 4966,
        label: "Rape kit test",
        connectors: ["DNA", "No DNA"]
      }
    ]
  },
  {
    offset: 4,
    y: 1,
    nodes: [
      {
        order: 4,
        value: 2934,
        label: "DNA",
        connectors: ["DNA Hit", "No DNA Hit"]
      },
      {
        order: 5,
        value: 2032,
        label: "No DNA",
        connectors: ["Investigation"]
      }
    ]
  },
  {
    y: 2,
    offset: 3.5,
    nodes: [
      {
        order: 3.5,
        value: 1935,
        label: "DNA Hit",
        connectors: ["Investigation"]
      },
      {
        order: 4.5,
        value: 999,
        label: "No DNA hit",
        connectors: ["Investigation"]
      }
    ]
  },
  {
    y: 3.5,
    offset: 4,
    nodes: [
      {
        order: 4.5,
        value: 6457,
        label: "Investigation",
        connectors: ["Investigation completed", "Investigation in progress"]
      }
    ]
  },
  {
    y: 4.5,
    offset: 4,
    nodes: [
      {
        order: 4,
        value: 2454,
        label: "Investigation completed",
        connectors: ["Case indicted", "Case no indicted"]
      },
      {
        order: 5,
        value: 4003,
        label: "Investigation in progress"
      }
    ]
  },
  {
    y: 5.5,
    offset: 3.5,
    nodes: [
      {
        order: 3.5,
        value: 623,
        label: "Case indicted",
        connectors: ["Case disposed", "Disposition in progress"]
      },
      {
        order: 4.5,
        value: 1831,
        label: "Case not indicted"
      }
    ]
  },
  {
    y: 6.5,
    offset: 3,
    nodes: [
      {
        order: 3,
        value: 281,
        label: "Case disposed",
        connectors: [
          "Trial",
          "Plea",
          "Dismissed",
          "Dismissed w/o prejudice",
          "Dismissed w/ prejudice"
        ]
      },
      {
        order: 4,
        value: 342,
        label: "Disposition in progress"
      }
    ]
  },
  {
    y: 7.5,
    offset: 0.5,
    nodes: [
      {
        order: 1,
        value: 52,
        label: "Trial",
        connectors: ["Guilty", "Not guilty"]
      },
      {
        order: 2,
        value: 180,
        label: "Plea"
      },
      {
        order: 3,
        value: 7,
        label: "Dismissed"
      },
      {
        order: 4,
        value: 28,
        label: "Dismissed w/o prejudice"
      },
      {
        order: 5,
        value: 14,
        label: "Dismissed w/ prejudice"
      }
    ]
  },
  {
    y: 8.5,
    offset: 0,
    nodes: [
      {
        order: 0.5,
        value: 34,
        label: "Guilty"
      },
      {
        order: 1.5,
        value: 18,
        label: "Not guilty"
      }
    ]
  }
]

var paths = [
  {
    // SAK -> DNA
    x: [4.5, 4],
    y: [0, 1],
    v: 2934,
    o: [-cellWidth(4966) / 2 + cellWidth(2934) / 2, 0],
    id: "SAK-DNA"
  },
  {
    // SAK -> No DNA
    x: [4.5, 5],
    y: [0, 1],
    v: 2032,
    o: [-cellWidth(4966) / 2 + cellWidth(2934) + cellWidth(2032 / 2), 0],
    id: "SAK-No DNA"
  },
  {
    // DNA -> DNA Hit
    x: [4, 3.5],
    y: [1, 2],
    v: 1935,
    o: [-cellWidth(2934) / 2 + cellWidth(1935 / 2), 0],
    id: "DNA-DNA Hit"
  },
  {
    // DNA -> No DNA Hit
    x: [4, 4.5],
    y: [1, 2],
    v: 999,
    o: [-cellWidth(2934) / 2 + cellWidth(1935) + cellWidth(999 / 2), 0],
    id: "DNA-No DNA Hit"
  },
  {
    // DNA Hit -> Invstigation
    x: [3.5, 4.5],
    y: [2, 3.5],
    v: 1935,
    o: [0, -cellWidth(6457 / 2) + cellWidth(1935 / 2)],
    id: "DNA Hit-Investigation"
  },
  {
    // No DNA Hit -> Investigation
    x: [4.5, 4.5],
    y: [2, 3.5],
    v: 999,
    o: [0, -cellWidth(6457 / 2) + cellWidth(1935) + cellWidth(999 / 2)],
    id: "No DNA Hit-Investigation"
  },
  {
    // No DNA -> Invesitgation
    x: [5, 4.5],
    y: [1, 3.5],
    v: 2032,
    o: [0, -cellWidth(6457 / 2) + cellWidth(1935) + cellWidth(999) + cellWidth(2032 / 2)],
    id: "No DNA-Investigation"
  },
  {
    // Investigation -> Investigation in progress
    x: [4.5, 5],
    y: [3.5, 4.5],
    v: 4003,
    o: [-cellWidth(6457 / 2) + cellWidth(2454) + cellWidth(4003 / 2), 0],
    id: "Investigation-Investigation in progress"
  },
  {
    // Investigation -> Investigation completed
    x: [4.5, 4],
    y: [3.5, 4.5],
    v: 2454,
    o: [-cellWidth(6457/2)+cellWidth(2454/2), 0],
    id: "Investigation-Investigation completed"
  },
  {
    // I.C. -> C not Ind
    x: [4, 4.5],
    y: [4.5, 5.5],
    v: 1831,
    o: [-cellWidth(2454 / 2) + cellWidth(623) + cellWidth(1831 / 2), 0],
    id: "Investigation completed-Case not indicted"
  },
  {
    // I.C. -> CI
    x: [4, 3.5],
    y: [4.5, 5.5],
    v: 623,
    o: [-cellWidth(2454 / 2) + cellWidth(623 / 2), 0],
    id: "Investigation completed-Case indicted"
  },
  {
    // C.I. -> D in Prog.
    x: [3.5, 4],
    y: [5.5, 6.5],
    v: 342,
    o: [-cellWidth(623 / 2) + cellWidth(281) + cellWidth(342 / 2), 0],
    id: "Case indicted-Disposition in progress"
  },
  {
    // C.I. -> C.D.
    x: [3.5, 3],
    y: [5.5, 6.5],
    v: 281,
    o: [-cellWidth(623 / 2) + cellWidth(281 / 2), 0],
    id: "Case indicted-Case disposed"
  },
  {
    // C.D. -> Trial
    x: [3, 1],
    y: [6.5, 7.5],
    v: 52,
    o: [-cellWidth(281 / 2) + cellWidth(52 / 2), 0],
    id: "Case disposed-Trial"
  },
  {
    // Trial -> Guilty
    x: [1, 0.5],
    y: [7.5, 8.5],
    v: 34,
    o: [-cellWidth(52 / 2) + cellWidth(34 / 2), 0],
    id: "Trial-Guilty"
  },
  {
    // Trial -> Not Guilty
    x: [1, 1.5],
    y: [7.5, 8.5],
    v: 18,
    o: [-cellWidth(52 / 2) + cellWidth(34) + cellWidth(18 / 2), 0],
    id: "Trial-Not Guilty"
  },
  {
    // C.D. -> Plea
    x: [3, 2],
    y: [6.5, 7.5],
    v: 180,
    o: [-cellWidth(281 / 2) + cellWidth(52) + cellWidth(180 / 2), 0],
    id: "Case diposed-Plea"
  },
  {
    // C.D. -> D.R.
    x: [3, 3],
    y: [6.5, 7.5],
    v: 7,
    o: [
      -cellWidth(281 / 2) + cellWidth(52) + cellWidth(180) + cellWidth(7 / 2),
      0
    ],
    id: "Case diposed-Dismissed, reindicted"
  },
  {
    // C.D. -> D w/o P
    x: [3, 4],
    y: [6.5, 7.5],
    v: 28,
    o: [-cellWidth(281 / 2) + cellWidth(52) + cellWidth(180) + cellWidth(7) + cellWidth(28 / 2), 0],
    id: "Case diposed-Dismissed w/o prejudice"
  },
  {
    // C.D. -> D w/ P
    x: [3, 5],
    y: [6.5, 7.5],
    v: 14,
    o: [-cellWidth(281 / 2) + cellWidth(52) + cellWidth(180) + cellWidth(7) + cellWidth(28) + cellWidth(14 / 2), 0],
    id: "Case diposed-Dismissed w prejudice"
  }
]


var id2Path = {}
paths.forEach(d => {
  id2Path[d.id] = d
  d.inId = d.id.split('-')[0]
  d.outId = d.id.split('-')[1]
})

var id2Node = {}
var nodes = _.uniq(paths.map(d => d.inId)).map(id => {
  var inPaths = paths.filter(d => d.outId == id)
  var outPaths = paths.filter(d => d.inId == id)

  var domain = []
  var sum = 0
  outPaths.forEach(d => {
    sum += d.v
    domain.push(sum)
  })

  var threshold = d3.scaleThreshold()
    .domain(domain.map(d => d/sum))
    .range(outPaths)

  function randomChildPath(){
    return threshold(Math.random())
  }

  return id2Node[id] = {id, inPaths, outPaths, randomChildPath}
})

paths.forEach(d => {
  d.inNode = id2Node[d.inId]
  d.outNode = id2Node[d.outId]
})


var points = d3.range(4966).map(i => {
  var speed = (Math.random() + .5)/240
  var wait = -Math.random()*50
  var xOffset = Math.random() - .5
  var y = 0

  var rv = {paths: [], i, speed, wait, xOffset}
  var curNode = id2Node['SAK']

  var j = 0
  while (curNode && j < 10){
    j++

    var path = curNode.randomChildPath()
    curNode = path.outNode
    rv.paths.push(path)
  }

  return rv
})

var cellHeight = 15
c.x.domain([0, 5])
c.y.domain([8.5, 0]) 

var connectorCurvedPaths = []
var widths = []
paths.forEach(calcPath)

var pathSel = c.svg.appendMany('path.connector', paths)
  .at({d: d => d.path, strokeWidth: d => d.width})
  .each(function(d){
    var length = this.getTotalLength()
    var pctCache = {}
    d.calcPos = pct => {
      pct = Math.round(pct*100)/100
      if (pctCache[pct]) return pctCache[pct]

      return pctCache[pct] = this.getPointAtLength(pct*length)
    }
  })

var rowSel = c.svg.appendMany('g.row', outline)
  .translate(d => c.y(d.y), 1)

var nodeSel = rowSel.appendMany('g.node', d => d.nodes)
  .translate(d => c.x(d.order), 0)

nodeSel.append('rect')
  .at({
    x: d => -cellWidth(d.value/2),
    width: d => cellWidth(d.value),
    height: cellHeight,
    fillOpacity: d => d.label == 'Rape kit test' ? 1 : 0 
  })


nodeSel.append('text')
  .text(d => d.label)
  .at({textAnchor: 'middle', fontSize: 12, y: -5})


var tickIndex = 0
if (window.__dottimer) window.__dottimer.stop()
window.__dottimer = d3.timer(t => {
  ctx.clearRect(-c.margin.left, -c.margin.right, c.totalWidth, c.totalWidth)

  points.forEach(d => {
    var t = tickIndex*d.speed + d.wait
    if (t < 0 || t > d.paths.length) return

    var path = d.paths[Math.floor(t)]

    var pos = path.calcPos(t % 1)
    ctx.beginPath()
    ctx.arc(pos.x + d.xOffset*path.width, pos.y, 3, 0, 2*Math.PI)
    ctx.fill()
    ctx.stroke()
  })




  tickIndex++
})



function calcPath(d, i){
  // Starting point
  var pStartx = c.x(d.x[0]) + d.o[0]
  var pStarty = c.y(d.y[0]) + cellHeight

  var pEndx = c.x(d.x[1]) + d.o[1]
  var pEndy = c.y(d.y[1])

  var distance = getDistanceBetweenPoints([pStartx, pStarty], [pEndx, pEndy])

  var pStartCurvex = pStartx
  var pStartCurvey = pStarty + distance*.33

  var pEndCurvex = pEndx
  var pEndCurvey = pEndy - distance*.33

  // Find mid point between two points
  var mid = getMidpoint([pStartx,pStarty], [pEndx, pEndy])

  // First curve control point
  var pControl1x = pStartx
  var pControl1y = mid[1]

  // Second curve control point
  var pControl2x = pEndx
  var pControl2y = mid[1]

  d.path = `M ${pStartx},${pStarty} C ${pStartCurvex}, ${pStartCurvey}, ${pEndCurvex}, ${pEndCurvey}, ${pEndx}, ${pEndy}`
  d.width = cellWidth(d.v)


  function getMidpoint(p1, p2){
   var x1 = p1[0],
       y1 = p1[1],
       x2 = p2[0],
       y2 = p2[1]

  return [(x1+x2)/2, (y1+y2)/2]
  }

  function getDistanceBetweenPoints(p1, p2){
   var a = p1[0] - p2[0];
   var b = p1[1] - p2[1];

   return Math.sqrt( a*a + b*b );
  }

}

// function getAngledLineFromPoints(p1, p2, distance, pCenter, perp){
//   var x1 = p1[0],
//       y1 = p1[1],
//       x2 = p2[0],
//       y2 = p2[1],
//       centerX = pCenter[0],
//       centerY = pCenter[1],
//       angle = Math.atan2(y2 - y1, x2 - x1)

//   // Draw a normal to the line above
//   if(perp){
//       return [
//         [ Math.sin(angle) * distance + centerX, -Math.cos(angle) * distance + centerY ],
//         [ -Math.sin(angle) * distance + centerX, Math.cos(angle) * distance + centerY],
//         angle
//       ]
//   } else {
//      return [
//         [ Math.cos(angle) * distance + centerX, Math.sin(angle) * distance + centerY ],
//         [ Math.cos(angle) * -distance + centerX, Math.sin(angle) * -distance + centerY],
//          angle
//       ] 
//   }
// }













