//BRUSH DATA MERGED WITH MAPLOCATION.js

////BRUSH DATA
//var filteredData = {};
//var gameLength = 1200000; //insert game length from match data here, brush will auto-adjust
//var gameLengthByMin = gameLength/60000;
//var brushX = 5;
//var brushY = 18;
//var brushHeight = 30;
//var brushPositionX = 3;
//
//svg = d3.select("#brush").append("svg:svg")
//    .attr("width", width)
//    .attr("height", brushY+100);
//
//var scale = d3.scale.linear()
//    //length of data
//    .domain([0, gameLengthByMin])
//    //size of bar
//    .range([brushPositionX + 0, brushPositionX + 500]);
//
//var brush = d3.svg.brush();
//// brush.append('div');
//brush.x(scale);
//brush.extent([0, gameLengthByMin/10]);
//
//brush.on('brushend', function() {
//    for(player in jsonData) {
//        filteredData[player] = jsonData[player].filter(function(d){
//            return (d[0] >= (brush.extent()[0] * 60000) && d[0] <= (brush.extent()[1] * 60000))
//        });
//
//    }
//    console.log(filteredData)
//});
//
//var g = svg.append("g");
//brush(g);
//g.attr("transform", "translate(" + brushX + "," + brushY +")");
//g.selectAll("rect").attr("height", brushHeight);
//g.selectAll(".background")
//    .style({fill: "#4B9E9E", visibility: "visible"});
//g.selectAll(".extent")
//    .style({fill: "#78C5C5", visibility: "visible"});
//g.selectAll(".resize rect")
//    .style({fill: "#276C86", visibility: "visible"})
//    .attr("class", "brush");
//
//
//var scale = d3.scale.linear()
//    .domain([0, gameLengthByMin])
//    .range([ brushPositionX + 7, brushPositionX + 503]);
//
//var axis = d3.svg.axis()
//    .scale(scale)
//    .orient("bottom"); //left, right, top
//
//var g = svg.append("g");
//axis(g);
//g.attr("transform", "translate(" + (brushX - 6) + "," + (brushY + 35) +")");
//g.selectAll("path")
//    .style({ fill: "none", stroke: "#000"});
//g.selectAll("line")
//    .style({ stroke: "#000"})
//    .attr("class", "brush");
