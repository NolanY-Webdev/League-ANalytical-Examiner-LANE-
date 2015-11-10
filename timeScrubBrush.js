
var gameLength = 4800000
var gameLengthByMin = gameLength/60000

var scale = d3.scale.linear()
    //length of data
    .domain([0, gameLengthByMin])
    //size of bar
    .range([0, 543])

var brush = d3.svg.brush()
brush.x(scale)
brush.extent([0, gameLengthByMin/10])

brush.on('brushend', function() {
    console.log(brush.extent())
});

var g = svg.append("g")
brush(g)
g.attr("transform", "translate(50, 100)")
g.selectAll("rect").attr("height", 30)
g.selectAll(".background")
    .style({fill: "#4B9E9E", visibility: "visible"})
g.selectAll(".extent")
    .style({fill: "#78C5C5", visibility: "visible"})
g.selectAll(".resize rect")
    .style({fill: "#276C86", visibility: "visible"})


var scale = d3.scale.linear()
    .domain([0, gameLengthByMin])
    .range([10, 555])

var axis = d3.svg.axis()
    .scale(scale)
    .orient("bottom") //left, right, top
    .ticks(6) //best guess

var g = svg.append("g")
axis(g)
g.attr("transform", "translate(38, 135)")
g.selectAll("path")
    .style({ fill: "none", stroke: "#000"})
g.selectAll("line")
    .style({ stroke: "#000"})

