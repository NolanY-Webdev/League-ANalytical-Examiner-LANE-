//BRUSH DATA

var gameLength = 4800000;
var gameLengthByMin = gameLength/60000;
var brushX = 0;
var brushY = 450;
var brushHeight = 30;
var brushPositionX = 4;

var scale = d3.scale.linear()
    //length of data
    .domain([0, gameLengthByMin])
    //size of bar
    .range([brushPositionX + 0, brushPositionX + 500]);

var brush = d3.svg.brush();
brush.x(scale);
brush.extent([0, gameLengthByMin/10]);

brush.on('brushend', function() {
    console.log(brush.extent());
});

var g = svg.append("g");
brush(g);
g.attr("transform", "translate(" + brushX + "," + brushY +")");
g.selectAll("rect").attr("height", brushHeight);
g.selectAll(".background")
    .style({fill: "#4B9E9E", visibility: "visible"});
g.selectAll(".extent")
    .style({fill: "#78C5C5", visibility: "visible"});
g.selectAll(".resize rect")
    .style({fill: "#276C86", visibility: "visible"})
    .attr("class", "brush");


var scale = d3.scale.linear()
    .domain([0, gameLengthByMin])
    .range([ brushPositionX + 11, brushPositionX + 503]);

var axis = d3.svg.axis()
    .scale(scale)
    .orient("bottom") //left, right, top
    .ticks(6); //best guess

var g = svg.append("g");
axis(g);
g.attr("transform", "translate(" + (brushX - 6) + "," + (brushY + 35) +")");
g.selectAll("path")
    .style({ fill: "none", stroke: "#000"});
g.selectAll("line")
    .style({ stroke: "#000"})
    .attr("class", "brush");

var rects = g.selectAll("rect.events")
    .data(jsonData.player1);
rects.enter()
    .append("rect").classed("events", true);
rects.attr({
    x:function(d) {return d.data[0]/60000;},
    y:0,
    width:1,
    height:30
});

