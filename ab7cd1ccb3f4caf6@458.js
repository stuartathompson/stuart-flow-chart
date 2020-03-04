// https://observablehq.com/d/ab7cd1ccb3f4caf6@458
import define1 from "./576f8943dbfbd395@109.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Flowchart attempt 2`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Flowchat of rape kit tests that lead to a "guilty" verdict.`
)});
  main.variable(observer("viz")).define("viz", ["d3","DOM","data","getDistanceBetweenPoints","getMidpoint"], function(d3,DOM,data,getDistanceBetweenPoints,getMidpoint)
{
    // Overall vars
    // Set the margin (spacing around the viz)
    const margin = 100
    // Adjust the height and width to remove the margin
    const height = 1000 - margin * 2
    const width = 1000 - margin * 2
    // Add the margin back into the SVG and create the SVG wrapper
    const svgW = d3.select(DOM.svg(width + margin * 2, height + margin * 2))
    // Append a group, which represents the main targetable SVG
    const svg = svgW.append('g').attr('transform', `translate(${margin},${margin})`)
    
    // Create some fake data and some scales
    var x = d3.scaleLinear().domain([0,data.length]).range([0,width])
    var y = d3.scaleLinear().domain(d3.extent(data)).range([height,0])
     
    var x = d3.scaleLinear().domain([0,10]).range([0,10])
    
    var outline = [
      {
         "offset": 4.5,
        "y": 0,
          "nodes": [
            {
              order: 4.5,
              value: 4966,
              label: "Rape kit test",
              connectors: ["DNA", "No DNA"]
            }
          ]
      },
      {
         "offset": 4,
                "y": 1,
          "nodes": [
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
                "y": 2,
         "offset": 3.5,
          "nodes": [
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
                "y": 3.5,
         "offset": 4,
          "nodes": [
            {
             order: 4.5,
             value: 6457,
              label: "Investigation",
              connectors: ["Investigation completed", "Investigation in progress"]
            }
          ]
      },
      {
                "y": 4.5,
         "offset": 4,
          "nodes": [
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
                "y": 5.5,
         "offset": 3.5,
          "nodes": [
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
                "y": 6.5,
         "offset": 3,
          "nodes": [
            {
              order: 3,
              value: 281,
              label: "Case disposed",
              connectors: ["Trial", "Plea", "Dismissed", "Dismissed w/o prejudice", "Dismissed w/ prejudice"]
            },
            {
              order: 4,
              value: 342,
              label: "Disposition in progress"
            }
          ]
      },
      {
                "y": 7.5,
         "offset": .5,
          "nodes": [
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
                "y": 8.5,
         "offset": 0,
          "nodes": [
            {
              order: 0.5,
              value: 34,
              label: "Guilty"
            },
            {
              order: 1.5,
              value: 18,
              label: "Not guilty"
            },
          ]
      }
    ]
    
    
   var colWidth = width / 6
    var cellWidth = d3.scaleLinear().domain([0,6457]).range([0, colWidth])

    var paths = [
      {
        // SAK -> DNA
        x: [4.5,4],
        y: [0,1],
        v: 2934,
        o: [-cellWidth(4966)/2+cellWidth(2934)/2, 0],
        tie: "SAK-DNA"
      },
      {
        // SAK -> No DNA
        x: [4.5,5],
        y: [0,1],
        v: 2032,
        o: [-cellWidth(4966)/2+cellWidth(2934)+cellWidth(2032/2), 0],
        tie: "SAK-No DNA"
      },
      {
        // DNA -> DNA Hit
        x: [4,3.5],
        y: [1,2],
        v: 1935,
        o: [-cellWidth(2934)/2+cellWidth(1935/2), 0],
        tie: "DNA-DNA Hit"
      },
      {
        // DNA -> No DNA Hit
        x: [4,4.5],
        y: [1,2],
        v: 999,
        o: [-cellWidth(2934)/2+cellWidth(1935)+cellWidth(999/2), 0],
        tie: "DNA-No DNA Hit"
      },
      {
        // DNA Hit -> Invstigation
        x: [3.5,4.5],
        y: [2,3.5],
        v: 1935,
        o: [0, -cellWidth(6457/2)+cellWidth(1935/2)],
        tie: "DNA Hit-Investigation"
      },
      {
        // No DNA Hit -> Investigation
        x: [4.5,4.5],
        y: [2,3.5],
        v: 999,
        o: [0, -cellWidth(6457/2)+cellWidth(1935)+cellWidth(999/2)],
        tie: "No DNA Hit-Investigation"
      },
      {
        // No DNA -> Invesitgation
        x: [5,4.5],
        y: [1,3.5],
        v: 2032,
        o: [0, -cellWidth(6457/2)+cellWidth(1935)+cellWidth(999)+cellWidth(2032/2)],
        tie: "No DNA-Investigation"
      },
        {
          // Investigation -> Investigation in progress
          x: [4.5,5],
          y: [3.5,4.5],
          v: 4003,
          o: [-cellWidth(6457/2)+cellWidth(2454)+cellWidth(4003/2), 0],
          tie: "Investigation-Investigation in progress"
        },
        {
          // Investigation -> Investigation completed
          x: [4.5,4],
          y: [3.5,4.5],
          v: 2454,
          o: [-cellWidth(6457/2)+cellWidth(2454/2), 0],
          tie: "Investigation-Investigation completed"
        },
          {
            // I.C. -> C not Ind
            x: [4,4.5],
            y: [4.5,5.5],
            v: 1831,
            o: [-cellWidth(2454/2)+cellWidth(623)+cellWidth(1831/2), 0],
            tie: "Investigation completed-Case not indicted"
          },
          {
            // I.C. -> CI
            x: [4,3.5],
            y: [4.5,5.5],
            v: 623,
            o: [-cellWidth(2454/2)+cellWidth(623/2), 0],
            tie: "Investigation completed-Case indicted"
          },
            {
              // C.I. -> D in Prog.
              x: [3.5,4],
              y: [5.5,6.5],
              v: 342,
              o: [-cellWidth(623/2)+cellWidth(281)+cellWidth(342/2), 0],
            tie: "Case indicted-Disposition in progress"
            },
            {
              // C.I. -> C.D.
              x: [3.5,3],
              y: [5.5,6.5],
              v: 281,
              o: [-cellWidth(623/2)+cellWidth(281/2), 0],
              tie: "Case indicted-Case disposed"
            },
              {
                // C.D. -> Trial
                x: [3,1],
                y: [6.5,7.5],
                v: 52,
                o: [-cellWidth(281/2)+cellWidth(52/2),0],
            tie: "Case disposed-Trial"
              },
                  {
                    // Trial -> Guilty
                    x: [1,0.5],
                    y: [7.5,8.5],
                    v: 34,
                    o: [-cellWidth(52/2)+cellWidth(34/2),0] ,
                    tie: "Trial-Guilty"
                  },
                  {
                    // Trial -> Not Guilty
                    x: [1,1.5],
                    y: [7.5,8.5],
                    v: 18,
                    o: [-cellWidth(52/2)+cellWidth(34)+cellWidth(18/2),0],
                    tie: 'Trial-Not Guilty'
                  },
              {
                // C.D. -> Plea
                x: [3,2],
                y: [6.5,7.5],
                v: 180,
                o: [-cellWidth(281/2)+cellWidth(52)+cellWidth(180/2),0],
                    tie: 'Case diposed-Plea'
              },
              {
                // C.D. -> D.R.
                x: [3,3],
                y: [6.5,7.5],
                v: 7,
                o: [-cellWidth(281/2)+cellWidth(52)+cellWidth(180)+cellWidth(7/2),0],
                tie: 'Case diposed-Dismissed, reindicted'
              },
              {
                // C.D. -> D w/o P
                x: [3,4],
                y: [6.5,7.5],
                v: 28,
                o: [-cellWidth(281/2)+cellWidth(52)+cellWidth(180)+cellWidth(7)+cellWidth(28/2),0],
                tie: 'Case diposed-Dismissed w/o prejudice'
              },
              {
                // C.D. -> D w/ P
                x: [3,5],
                y: [6.5,7.5],
                v: 14,
                o: [-cellWidth(281/2)+cellWidth(52)+cellWidth(180)+cellWidth(7)+cellWidth(28)+cellWidth(14/2),0],
                tie: 'Case diposed-Dismissed w prejudice'
              }
    ]
  
   var rowHeight = height / outline.length
   var cellHeight = 15
   var x = d3.scaleLinear().domain([0,5]).range([0, width])
   var y = d3.scaleLinear().domain([0,8.5]).range([0,height])
   var row = svg.selectAll('g.row')
    .data(outline).enter()
    .append('g')
    .attr('transform', (d,i) => `translate(${0},${y(d.y)})`)
   
    var nodes = row.selectAll('g.node')
      .data(d => d.nodes).enter()
    .append('g')
      .attr('class', 'node')
      .attr('transform', (d,i) => `translate(${x(d.order)}, 0)`)
    
    nodes.append('rect')
      .attr('x', d => -cellWidth(d.value)/2)
      .attr('y', 0)
      .attr('width', d => cellWidth(d.value))
      .attr('height', cellHeight)
      .attr('stroke-width', '1')
      .attr('stroke', 'red')
      .attr('fill', 'white')
      .attr('fill-opacity', .65)
  
    nodes.append('text')
      .text(d => d.label)
      .style('text-anchor', 'middle')
      .style('font-size', 12)
      .style('font-family', 'sans-serif')
      .attr('y', -5)
  
    var connectorCurvedPaths = []
    
    var widths = []
    for(var d of paths){
      var i = 0;
      // Starting point
      var pStartx = x(d.x[0]) + d.o[0]
      var pStarty = y(d.y[0]) + cellHeight

      var pEndx = x(d.x[1]) + d.o[1]
      var pEndy = y(d.y[1])
      
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

      // svg.append('circle')
      //   .attr('r', 2)
      //   .attr('cx', pControl1x)
      //   .attr('cy', pControl1y)
      //   .attr('fill', 'blue')
      // svg.append('circle')
      //   .attr('r', 2)
      //   .attr('cx', pControl2x)
      //   .attr('cy', pControl2y)
      //   .attr('fill', 'blue')

      // var path = `M ${pStartx},${pStarty} C ${pStartx}, ${pStarty}, ${pControl1x},${pControl1y}, ${mid[0]},${mid[1]} C ${mid[0]}, ${mid[1]}, ${pControl2x}, ${pControl2y}, ${pEndx}, ${pEndy}`
      var path = `M ${pStartx},${pStarty} C ${pStartCurvex}, ${pStartCurvey}, ${pEndCurvex}, ${pEndCurvey}, ${pEndx}, ${pEndy}`
      
      connectorCurvedPaths.push({
        path: path,
        tie: d.tie
      })
      widths.push(cellWidth(d.v))
      i++
    }
    var paths = svg.selectAll('path')
      .data(connectorCurvedPaths).enter()
    .append('path')
    .attr('d', d => d.path)
    .attr('data-id', d => d.id)
    .attr('fill', 'transparent')
    .attr('stroke', 'red')
    .attr('opacity', .5)
    .attr('stroke-width', (d,i) => widths[i])
  
 
 return svgW.node() 
}
);
  main.variable(observer()).define(["DOM","serialize","viz"], function(DOM,serialize,viz){return(
DOM.download(serialize(viz), null, "Download as SVG")
)});
  main.variable(observer("data")).define("data", ["d3"], function(d3){return(
d3.range(0, 200)
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3')
)});
  const child1 = runtime.module(define1);
  main.import("serialize", child1);
  main.variable(observer("curvedPath")).define("curvedPath", ["getMidpoint","getAngledLineFromPoints","getDistanceBetweenPoints"], function(getMidpoint,getAngledLineFromPoints,getDistanceBetweenPoints){return(
(data, size) => {
      // Data should be an array containing three [x,y] arrays representing the start, middle and endpoint
      // Size reflects the size of the arrow value
      var p1 = data[0]
      var p2 = data[1]
      var p3 = data[2]
      
      console.log(p1, p2, p3)
      
      // Midpoint between first and last point
      var midPoint = getMidpoint(p1, p3)
      
      // Store whether the midpoint is above or below the plane between point 1 and 3 – important for determining order when drawing the path
      var perpLineRightOfEndpoint = data[0][0] > data[2][0]
      var pathAbovePlane =  midPoint[1] > data[1][1]
          pathAbovePlane = perpLineRightOfEndpoint ? !pathAbovePlane : pathAbovePlane
      
      p3 = getAngledLineFromPoints(p2, p3, -5, p3, false)[0]

      // Get the coordinates for the midpoint based on the "size" value
      var perpLineCoordinates = getAngledLineFromPoints(midPoint, p2, size*.3, p2, false)

      // Establish the angle and "size" of the endpoint, based on the perp angle from point 1 to point 2
        var newStartCoordinates = getAngledLineFromPoints(p1, p2, 1, p1, true)
        // Get the offset endpoint, which is the point minus some pixels so the arrow point ends on the right spot
        var newEndpointCoordinates = getAngledLineFromPoints(p2, p3, -size, p3, false)
        // Get the width of the line at the end of the path
        var endLineCoordinates = getAngledLineFromPoints(p2, p3, size*.5, newEndpointCoordinates[0], true)
        // Get the larger width to begin drawing the "points" of the arrow
        var arrowCoordinates = getAngledLineFromPoints(p2, p3, size, newEndpointCoordinates[0], true)
        // Determine whether order of drawing endpoints should be flipped based on distance between middle point and end point
        var midPointClosestToFirstEndPoint = getDistanceBetweenPoints(perpLineCoordinates[0], endLineCoordinates[0]) > getDistanceBetweenPoints(perpLineCoordinates[0], endLineCoordinates[1])
        var midPointClosestToFirstStartPoint = getDistanceBetweenPoints(perpLineCoordinates[0], newStartCoordinates[0]) > getDistanceBetweenPoints(perpLineCoordinates[0], newStartCoordinates[1])
        
      // Update the path itself using newly derived midpoints and endpoints
      var startLow = midPointClosestToFirstStartPoint ? newStartCoordinates[1] : newStartCoordinates[0]
      var startHigh = midPointClosestToFirstStartPoint ? newStartCoordinates[0] : newStartCoordinates[1]
      var midLow = perpLineCoordinates[0]
      var midHigh = perpLineCoordinates[1]
      var endLow = midPointClosestToFirstEndPoint ? endLineCoordinates[1] : endLineCoordinates[0]
      var endHigh = midPointClosestToFirstEndPoint ? endLineCoordinates[0] : endLineCoordinates[1]
      var endWideLow = midPointClosestToFirstEndPoint ? arrowCoordinates[1] : arrowCoordinates[0]
      var endWideHigh = midPointClosestToFirstEndPoint ? arrowCoordinates[0] : arrowCoordinates[1]
      var endPoint = p3
      
      return `M ${startHigh}
          L ${startLow}
          Q ${[midLow[0], midLow[1]]} ${[endLow[0],endLow[1]]}
          L ${[endHigh[0],endHigh[1]]} Q ${[midHigh[0], midHigh[1]]} ${startHigh} Z`
}
)});
  main.variable(observer("getMidpoint")).define("getMidpoint", function(){return(
(p1, p2) => {
  var x1 = p1[0],
    y1 = p1[1],
    x2 = p2[0],
    y2 = p2[1]
 return [(x1+x2)/2, (y1+y2)/2]
}
)});
  main.variable(observer("getAngleFromPoints")).define("getAngleFromPoints", function(){return(
(p1, p2) => {
    var x1 = p1[0],
      y1 = p1[1],
      x2 = p2[0],
      y2 = p2[1]
  return Math.atan2(y2 - y1, x2 - x1) * 180/Math.PI
}
)});
  main.variable(observer("getAngledLineFromPoints")).define("getAngledLineFromPoints", function(){return(
(p1, p2, distance, pCenter, perp) => {
    // Start and end points
  var x1 = p1[0],
      y1 = p1[1],
      x2 = p2[0],
      y2 = p2[1],
      centerX = pCenter[0],
      centerY = pCenter[1]
  var angle = Math.atan2(y2 - y1, x2 - x1)

  // console.log(angle*180/Math.PI)
  
  // Draw a normal to the line above
  if(perp){
      return [
        [ Math.sin(angle) * distance + centerX, -Math.cos(angle) * distance + centerY ],
        [ -Math.sin(angle) * distance + centerX, Math.cos(angle) * distance + centerY],
        angle
      ]
  } else {

     return [
        [ Math.cos(angle) * distance + centerX, Math.sin(angle) * distance + centerY ],
        [ Math.cos(angle) * -distance + centerX, Math.sin(angle) * -distance + centerY],
         angle
      ] 
  }
}
)});
  main.variable(observer("getDistanceBetweenPoints")).define("getDistanceBetweenPoints", function(){return(
(p1, p2) => {
  var a = p1[0] - p2[0];
  var b = p1[1] - p2[1];

  return Math.sqrt( a*a + b*b );
}
)});
  return main;
}
