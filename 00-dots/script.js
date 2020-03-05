console.clear()


var c = d3.conventions({
  sel: d3.select('#graph').html(''),
  height: 800,
})

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
    tie: "SAK-DNA"
  },
  {
    // SAK -> No DNA
    x: [4.5, 5],
    y: [0, 1],
    v: 2032,
    o: [-cellWidth(4966) / 2 + cellWidth(2934) + cellWidth(2032 / 2), 0],
    tie: "SAK-No DNA"
  },
  {
    // DNA -> DNA Hit
    x: [4, 3.5],
    y: [1, 2],
    v: 1935,
    o: [-cellWidth(2934) / 2 + cellWidth(1935 / 2), 0],
    tie: "DNA-DNA Hit"
  },
  {
    // DNA -> No DNA Hit
    x: [4, 4.5],
    y: [1, 2],
    v: 999,
    o: [-cellWidth(2934) / 2 + cellWidth(1935) + cellWidth(999 / 2), 0],
    tie: "DNA-No DNA Hit"
  },
  {
    // DNA Hit -> Invstigation
    x: [3.5, 4.5],
    y: [2, 3.5],
    v: 1935,
    o: [0, -cellWidth(6457 / 2) + cellWidth(1935 / 2)],
    tie: "DNA Hit-Investigation"
  },
  {
    // No DNA Hit -> Investigation
    x: [4.5, 4.5],
    y: [2, 3.5],
    v: 999,
    o: [0, -cellWidth(6457 / 2) + cellWidth(1935) + cellWidth(999 / 2)],
    tie: "No DNA Hit-Investigation"
  },
  {
    // No DNA -> Invesitgation
    x: [5, 4.5],
    y: [1, 3.5],
    v: 2032,
    o: [0, -cellWidth(6457 / 2) + cellWidth(1935) + cellWidth(999) + cellWidth(2032 / 2)],
    tie: "No DNA-Investigation"
  },
  {
    // Investigation -> Investigation in progress
    x: [4.5, 5],
    y: [3.5, 4.5],
    v: 4003,
    o: [-cellWidth(6457 / 2) + cellWidth(2454) + cellWidth(4003 / 2), 0],
    tie: "Investigation-Investigation in progress"
  },
  {
    // Investigation -> Investigation completed
    x: [4.5, 4],
    y: [3.5, 4.5],
    v: 2454,
    o: [-cellWidth(6457 / 2) + cellWidth(2454 / 2), 0],
    tie: "Investigation-Investigation completed"
  },
  {
    // I.C. -> C not Ind
    x: [4, 4.5],
    y: [4.5, 5.5],
    v: 1831,
    o: [-cellWidth(2454 / 2) + cellWidth(623) + cellWidth(1831 / 2), 0],
    tie: "Investigation completed-Case not indicted"
  },
  {
    // I.C. -> CI
    x: [4, 3.5],
    y: [4.5, 5.5],
    v: 623,
    o: [-cellWidth(2454 / 2) + cellWidth(623 / 2), 0],
    tie: "Investigation completed-Case indicted"
  },
  {
    // C.I. -> D in Prog.
    x: [3.5, 4],
    y: [5.5, 6.5],
    v: 342,
    o: [-cellWidth(623 / 2) + cellWidth(281) + cellWidth(342 / 2), 0],
    tie: "Case indicted-Disposition in progress"
  },
  {
    // C.I. -> C.D.
    x: [3.5, 3],
    y: [5.5, 6.5],
    v: 281,
    o: [-cellWidth(623 / 2) + cellWidth(281 / 2), 0],
    tie: "Case indicted-Case disposed"
  },
  {
    // C.D. -> Trial
    x: [3, 1],
    y: [6.5, 7.5],
    v: 52,
    o: [-cellWidth(281 / 2) + cellWidth(52 / 2), 0],
    tie: "Case disposed-Trial"
  },
  {
    // Trial -> Guilty
    x: [1, 0.5],
    y: [7.5, 8.5],
    v: 34,
    o: [-cellWidth(52 / 2) + cellWidth(34 / 2), 0],
    tie: "Trial-Guilty"
  },
  {
    // Trial -> Not Guilty
    x: [1, 1.5],
    y: [7.5, 8.5],
    v: 18,
    o: [-cellWidth(52 / 2) + cellWidth(34) + cellWidth(18 / 2), 0],
    tie: "Trial-Not Guilty"
  },
  {
    // C.D. -> Plea
    x: [3, 2],
    y: [6.5, 7.5],
    v: 180,
    o: [-cellWidth(281 / 2) + cellWidth(52) + cellWidth(180 / 2), 0],
    tie: "Case diposed-Plea"
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
    tie: "Case diposed-Dismissed, reindicted"
  },
  {
    // C.D. -> D w/o P
    x: [3, 4],
    y: [6.5, 7.5],
    v: 28,
    o: [-cellWidth(281 / 2) + cellWidth(52) + cellWidth(180) + cellWidth(7) + cellWidth(28 / 2), 0],
    tie: "Case diposed-Dismissed w/o prejudice"
  },
  {
    // C.D. -> D w/ P
    x: [3, 5],
    y: [6.5, 7.5],
    v: 14,
    o: [-cellWidth(281 / 2) + cellWidth(52) + cellWidth(180) + cellWidth(7) + cellWidth(28) + cellWidth(14 / 2), 0],
    tie: "Case diposed-Dismissed w prejudice"
  }
]

var data = d3.range(200)

var cellHeight = 15
c.x.domain([0, 5])
c.y.domain([8.5, 0])

var rowSel = c.svg.appendMany('g.row', outline)
  .translate(d => c.y(d.y), 1)

var nodeSel = rowSel.appendMany('g.node', d => d.nodes)
  .translate(d => c.x(d.order), 0)

nodeSel.append('rect')
  .at({
    x: d => -cellWidth(d.value/2),
    width: d => cellWidth(d.value),
    height: cellHeight
  })

nodeSel.append('text')
  .text(d => d.label)
  .at({textAnchor: 'middle', fontSize: 12, y: -5})
 

var connectorCurvedPaths = []
var widths = []
for(var d of paths){
  var i = 0;
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

  var path = `M ${pStartx},${pStarty} C ${pStartCurvex}, ${pStartCurvey}, ${pEndCurvex}, ${pEndCurvey}, ${pEndx}, ${pEndy}`

  connectorCurvedPaths.push({
   path: path,
   tie: d.tie
 })

 widths.push(cellWidth(d.v))
 i++
}


var pathSel = c.svg.appendMany('path.connector', connectorCurvedPaths)
  .at({d: d => d.path,strokeWidth: (d, i) => widths[i]})


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













