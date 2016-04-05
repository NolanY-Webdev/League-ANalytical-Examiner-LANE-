/* globals
  laneApp,
  d3
*/
'use strict';
angular.module('laneApp')
  .directive('mapD', function() {
    return {
      restrict : 'E',
      scope : {
        mostRecentMatch : '=myRecentGames'
      },
      template : '<div id="map-d"></div><div id="brush-d"></div>',
      link : function (scope, element, attr) {
        scope.$watch('mostRecentMatch', function(match) {
          if (match != null) {
            runD3(match);
          }
        });
      }
    };
  }
);

function runD3(match) {
    var scope = {
      mostRecentMatch : match
    };
    var jsonData = scope.mostRecentMatch.sortedData;
    var imageWidth = 25;
    var imageHeight = 25;

//BUILDING DATA

    var deadBuildings = jsonData.deadBuildings;

    //console.log(deadBuildings);

    //summoners rift
    var towerCords = [
      [12400, 13000, 'TowerNexusTopMidB'], [12900, 12500, 'TowerNexusBotMidB'], [10500, 13800, 'TowerBaseTopB'], [11100, 11100, 'TowerBaseMidB'],
      [13800, 10500, 'TowerBaseBotB'], [7700, 13600, 'TowerInnerTopB'], [4500, 14000, 'TowerOuterTopB'], [9800, 9900, 'TowerInnerMidB'],
      [8900, 8400, 'TowerOuterMidB'], [13600, 8200, 'TowerInnerBotB'], [13900, 4000, 'TowerOuterBotB'], [2000, 2200, 'TowerNexusTopMidA'],
      [2400, 1700, 'TowerNexusBotMidA'], [1400, 4300, 'TowerBaseTopA'], [3800, 3500, 'TowerBaseMidA'], [4200, 900, 'TowerBaseBotA'],
      [7200, 1100, 'TowerInnerBotA'], [10700, 800, 'TowerOuterBotA'], [5300, 4800, 'TowerInnerMidA'], [6200, 6300, 'TowerOuterMidA'],
      [1500, 6600, 'TowerInnerTopA'], [1200, 11000, 'TowerOuterTopA']
    ];
    var nexiCords = [[1600, 1300], [13100, 13100]];
    var inhibCords = [[1450, 3050, 'InhibTopA'], [3400, 2650, 'InhibMidA'], [3650, 640, 'InhibBotA'],
      [11500, 13460, 'InhibTopB'], [11770, 11420, 'InhibMidB'], [13750, 11090, 'InhibBotB']];
    if (scope.mostRecentMatch.mapId == 8) { //crystal scar
      var capturePoints = [
        [4400, 2600], [2700, 7900], [7000, 11000], [11400, 7900], [9600, 2600]
      ];
      towerCords = [];
      nexiCords = [];
      inhibCords = [];
    } else if (scope.mostRecentMatch.mapId == 10) { //twisted treeline
      towerCords = [
        [2350, 7140, 'TowerNexusBotA'], [2100, 9065, 'TowerBaseTopA'], [2100, 5100, 'TowerBaseBotA'], [12915, 7140, 'TowerNexusBotB'],
        [13150, 9065, 'TowerBaseTopB'], [13200, 5100, 'TowerBaseBotB'], [4350, 9500, 'TowerInnerTopA'], [4350, 4600, 'TowerInnerBotA'],
        [5750, 8600, 'TowerOuterTopA'], [6150, 4900, 'TowerOuterBotA'], [9350, 4900, 'TowerOuterBotB'], [11150, 4600, 'TowerInnerBotB'],
        [9450, 8700, 'TowerOuterTopB'], [11150, 9600, 'TowerInnerTopB']
      ];
      nexiCords = [
        [3000, 7000], [12300, 7000]
      ];
      inhibCords = [
        [2175, 5550, 'InhibBotA'], [2175, 7800, 'InhibTopA'], [13260, 5500, 'InhibBotB'], [13260, 7750, 'InhibTopB']
      ];
    } else if (scope.mostRecentMatch.mapId == 12) { //howling abyss
      towerCords = [
        [2100, 2600, 'TowerBaseMidA'], [2650, 2200, 'TowerInnerMidA'], [4400, 4400, "TowerOuterMidA"], [5800, 5800, "TowerNexusMidA"], [7500, 7500, "TowerNexusMidB"], [8900, 8900, "TowerOuterMidB"], [10600, 11000, 'TowerBaseMidB'], [11100, 10700, 'TowerInnerMidB']
      ];
      nexiCords = [
        [1900, 1900], [11400, 11400]
      ];
      inhibCords = [
        [3250, 2800, 'InhibMidA'], [10150, 9750, 'InhibMidB']
      ];
    }

    jsonData.currentTowers = JSON.parse(JSON.stringify(towerCords));
    jsonData.currentInhibs = JSON.parse(JSON.stringify(inhibCords));
    var summonersRift = "http://ddragon.leagueoflegends.com/cdn/5.22.3/img/map/map" + ((scope.mostRecentMatch.mapId !== 11) ? scope.mostRecentMatch.mapId : 1)  + ".png"  ;

//------------------- MAP DATA -------------------
    //app page map display size
    var mapWidth = 628;
    var mapHeight = 628;

//MAP OPTIONS/VARIABLES

    var domain = {
        //Summoners Rift
        min: {x: -570, y: -420},
        max: {x: 15220, y: 14980}
      },
      width = mapWidth,
      height = mapHeight,
      bg = summonersRift,
      xScale, yScale, svg;

    if (scope.mostRecentMatch.mapId == 8) {
      domain = {
          //Crystal Scar
          min: {x: 0, y: 0},
          max: {x: 13987, y: 13987}
        },
        width = mapWidth,
        height = mapHeight,
        bg = summonersRift,
        xScale, yScale, svg;
    } else if (scope.mostRecentMatch.mapId == 10) {
      domain = {
          //Twisted Treeline
          min: {x: 0, y: 0},
          max: {x: 15398, y: 15398}
        },
        width = mapWidth,
        height = mapHeight,
        bg = summonersRift,
        xScale, yScale, svg;
    } else if (scope.mostRecentMatch.mapId == 12) {
      domain = {
          //Howling Abyss
          min: {x: -28, y: -19},
          max: {x: 12849, y: 12858}
        },
        width = mapWidth,
        height = mapHeight,
        bg = summonersRift,
        xScale, yScale, svg;
    }

    var filteredData = {};

//BRUSH DATA

    var gameLength = scope.mostRecentMatch.sortedData.gameLength;
    var gameLengthByMin = gameLength/60000;
    var brushX = 5;
    var brushY = 18;
    var brushHeight = 30;
    var brushPositionX = 3;

    svg = d3.select("#brush-d").append("svg:svg")
      .attr("width", width)
      .attr("height", brushY+100);

    var scale = d3.scale.linear()
      //length of data
      .domain([0, gameLengthByMin])
      //size of bar
      .range([brushPositionX + 0, mapWidth - 7]);

    var brush = d3.svg.brush();
    brush.x(scale);
    brush.extent([0, gameLengthByMin/10]);

    brush.on('brushend', function() {
      for(var player in jsonData) {
        if (player!== 'gameLength' && player !== 'deadBuildings') {
          filteredData[player] = jsonData[player].filter(function (d) {
            return (d[0] >= (brush.extent()[0] * 60000) && d[0] <= (brush.extent()[1] * 60050));
          });
        }
      }
      var currentTowers = JSON.parse(JSON.stringify(towerCords));
      var currentInhibs = JSON.parse(JSON.stringify(inhibCords));
      var buildingsDestroyed = deadBuildings.filter(function(buildingDeaths) {
        return (buildingDeaths[0] <= (brush.extent()[1] * 60050))
      })
      //console.log(buildingsDestroyed);
      for(var j = 0; j < buildingsDestroyed.length; j++) {
        for(var i = 0; i < currentTowers.length; i++) {
          if (buildingsDestroyed[j][1] == currentTowers[i][2]) {
            currentTowers.splice(i, 1);
          }
        }
        if(buildingsDestroyed[j][1].substr(9,16)=='Respawned') {
          var inhibSpawn = inhibCords.filter(function(c,i,a) {
            return c[2] == buildingsDestroyed[j][1].substr(0,9);
          })
          currentInhibs.push(inhibSpawn[0]);
        }
        for(i = 0; i < currentInhibs.length; i++) {
          if(buildingsDestroyed[j][1] == currentInhibs[i][2])
          currentInhibs.splice(i, 1);
        }
      }
      filteredData.currentTowers = currentTowers;
      filteredData.currentInhibs = currentInhibs;
      update(filteredData);
    });

    // SCRUBBER
    var g = svg.append("g");
    brush(g);
    g.attr("transform", "translate(" + brushX + "," + brushY +")")

    g.selectAll("rect").attr("height", brushHeight);
    g.selectAll(".background")
    // background
      .style({fill: "EFFFE9", visibility: "visible"});
    g.selectAll(".extent")
      .style({fill: "#78C5C5", visibility: "visible"});
    g.selectAll(".resize rect")
      .style({fill: "#276C86", visibility: "visible"})
      .attr("class", "brush");


    var scale = d3.scale.linear()
      .domain([0, gameLengthByMin])
      .range([ brushPositionX + 7, mapWidth - 10]);

    var axis = d3.svg.axis()
      .scale(scale)
      .orient("bottom"); //left, right, top

    var g = svg.append("g");
    axis(g);

    g.attr("transform", "translate(" + (brushX - 6) + "," + (brushY + 35) +")");
    g.attr('class', 'scale')
        .style({fill: '#EFFFE9', visibility: 'visible'});
    g.selectAll("path")
      .style({ fill: "none", stroke: "#EFFFE9"});
    g.selectAll("line")
      .style({ stroke: "#EFFFE9"})
      .attr("class", "brush");

//MAP DATA

    var color = d3.scale.linear()
      .domain([0, 3])
      .range([ 'white', 'steelblue' ])
      .interpolate(d3.interpolateLab);

    xScale = d3.scale.linear()
      .domain([domain.min.x, domain.max.x])
      .range([0, width]);

    yScale = d3.scale.linear()
      .domain([domain.min.y, domain.max.y])
      .range([height, 0]);

    svg = d3.select('#map-d').append('svg:svg')
      .attr('id', 'map-svg-img-canvas')
      .attr('width', width)
      .attr('height', height);

    svg.append('image')
      .attr('id', 'map-svg-img')
      .attr('xlink:href', bg)
      .attr('x', '0')
      .attr('y', '0')
      .attr('width', width)
      .attr('height', height);


//UPDATE FUNCTION
    function update(data){
      var images = svg.selectAll('.stuff1').data(data);
      images.exit().remove();
      images.enter();

      //tower img
      var towers = 'http://www.team-dignitas.net/uploads/tinymce/images/turret_transparent.png';
      svg.append('svg:g').selectAll('image2')
        .data(data.currentTowers)
        .enter().append('svg:image')
        .attr('xlink:href', towers)
        .attr('x', function(d) { return xScale(d[0]) - mapWidth/40; })
        .attr('y', function(d) { return yScale(d[1]) - mapHeight/20; })
        .attr('class', 'stuff1')
        .attr('width', mapWidth/16)
        .attr('height', mapHeight/16);

      //nexus img
      var nexi = 'http://i42.tinypic.com/15nll07.png';
      svg.append('svg:g').selectAll('image3')
        .data(nexiCords)
        .enter().append('svg:image')
        .attr('xlink:href', nexi)
        .attr('x', function(d) { return xScale(d[0]) - mapWidth/40; })
        .attr('y', function(d) { return yScale(d[1]) - mapHeight/20; })
        .attr('class', 'stuff1')
        .attr('width', mapWidth/16)
        .attr('height', mapHeight/16);

      //inhib img
      var inhibs = 'http://assets.razerzone.com/eeimages/razer_events/11691/inhibitor-b.png';
      svg.append('svg:g').selectAll('image4')
        .data(data.currentInhibs)
        .enter().append('svg:image')
        .attr('xlink:href', inhibs)
        .attr('x', function(d) { return xScale(d[0]) - mapWidth/40; })
        .attr('y', function(d) { return yScale(d[1]) - mapWidth/20; })
        .attr('class', 'stuff1')
        .attr('width', mapWidth/25)
        .attr('height', mapHeight/25);

      var imgurl1 = scope.mostRecentMatch.participants[0].championImage;
      var player1img = svg.selectAll("image1")

        //bypass sortPlayer functions by referring to jsonData.player#
        .data(data.player1)
        .enter().append('svg:image')
        .attr('class', 'stuff1')
        //pass variable containing url
        .attr('xlink:href', imgurl1)
        .attr('x', function(d) { return xScale(d[2]) - imageWidth/2; })
        .attr('y', function(d) { return yScale(d[3]) - imageHeight/2; })
        .attr('width', imageWidth)
        .attr('height', imageHeight)
        .attr('opacity', function(d) {
          if ((brush.extent()[1]-1)*60050 <= d[0] ) {
            return 1;
          } else {
            return ((d[0]/(brush.extent()[1] * 60000) *0.7) + 0.1);
          }
        });

      svg.selectAll('image1')
        .data(data.player1)
        .enter().append('rect')
        .attr('width', imageWidth + 2)
        .attr('height', imageHeight + 2)
        .style('fill', 'none')
        .style('stroke', '#df3b20')
        .style('stroke-width', 2)
        .attr('class', 'stuff1')
        .attr('x', function(d) { return xScale(d[2]) - (imageWidth/2 + 1); })
        .attr('y', function(d) { return yScale(d[3]) - (imageHeight/2 + 1); })
        .attr('opacity', function(d) {
          if ((brush.extent()[1]-1)*60050 <= d[0] ) {
            return 1;
          } else {
            return (0);
          }
        });



      var imgurl2 = scope.mostRecentMatch.participants[1].championImage;
      var player2img = svg.selectAll('image1')
        .data(data.player2)
        .enter().append('svg:image')
        .attr('xlink:href', imgurl2)
        .attr('class', 'stuff1')
        .attr('x', function(d) { return xScale(d[2]) - imageWidth/2; })
        .attr('y', function(d) { return yScale(d[3]) - imageHeight/2; })
        .attr('width', imageWidth)
        .attr('height', imageHeight)
        .attr('opacity', function(d) {
          if ((brush.extent()[1]-1)*60050 <= d[0] ) {
            return 1;
          } else {
            return ((d[0]/(brush.extent()[1] * 60000) *0.7) + 0.1);
          }
        });

      svg.selectAll('image1')
        .data(data.player2)
        .enter().append('rect')
        .attr('width', imageWidth + 2)
        .attr('height', imageHeight + 2)
        .style('fill', 'none')
        .style('stroke', '#df3b20')
        .style('stroke-width', 2)
        .attr('class', 'stuff1')
        .attr('x', function(d) { return xScale(d[2]) - (imageWidth/2 + 1); })
        .attr('y', function(d) { return yScale(d[3]) - (imageHeight/2 + 1); })
        .attr('opacity', function(d) {
          if ((brush.extent()[1]-1)*60050 <= d[0] ) {
            return 1;
          } else {
            return (0);
          }
        });


      var imgurl3 = scope.mostRecentMatch.participants[2].championImage;
      var player3img = svg.selectAll('image1')
        .data(data.player3)
        .enter().append('svg:image')
        .attr('xlink:href', imgurl3)
        .attr('class', 'stuff1')
        .attr('x', function(d) { return xScale(d[2]) - imageWidth/2; })
        .attr('y', function(d) { return yScale(d[3]) - imageHeight/2; })
        .attr('width', imageWidth)
        .attr('height', imageHeight)
        .attr('opacity', function(d) {
          if ((brush.extent()[1]-1)*60050 <= d[0] ) {
            return 1;
          } else {
            return ((d[0]/(brush.extent()[1] * 60000) *0.7) + 0.1);
          }
        });

      svg.selectAll('image1')
        .data(data.player3)
        .enter().append('rect')
        .attr('width', imageWidth + 2)
        .attr('height', imageHeight + 2)
        .style('fill', 'none')
        .style('stroke', '#df3b20')
        .style('stroke-width', 2)
        .attr('class', 'stuff1')
        .attr('x', function(d) { return xScale(d[2]) - (imageWidth/2 + 1); })
        .attr('y', function(d) { return yScale(d[3]) - (imageHeight/2 + 1); })
        .attr('opacity', function(d) {
          if ((brush.extent()[1]-1)*60050 <= d[0] ) {
            return 1;
          } else {
            return (0);
          }
        });


      //BEGIN TWISTED TREELINE FILTER
    if(scope.mostRecentMatch.mapId !== 10) {
      var imgurl4 = scope.mostRecentMatch.participants[3].championImage;
      var player4img = svg.selectAll('image1')
        .data(data.player4)
        .enter().append('svg:image')
        .attr('xlink:href', imgurl4)
        .attr('class', 'stuff1')
        .attr('x', function(d) { return xScale(d[2]) - imageWidth/2; })
        .attr('y', function(d) { return yScale(d[3]) - imageHeight/2; })
        .attr('width', imageWidth)
        .attr('height', imageHeight)
        .attr('opacity', function(d) {
          if ((brush.extent()[1]-1)*60050 <= d[0] ) {
            return 1;
          } else {
            return ((d[0]/(brush.extent()[1] * 60000) *0.7) + 0.1);
          }
        });


      svg.selectAll('image1')
        .data(data.player4)
        .enter().append('rect')
        .attr('width', imageWidth + 2)
        .attr('height', imageHeight + 2)
        .style('fill', 'none')
        .style('stroke', '#df3b20')
        .style('stroke-width', 2)
        .attr('class', 'stuff1')
        .attr('x', function(d) { return xScale(d[2]) - (imageWidth/2 + 1); })
        .attr('y', function(d) { return yScale(d[3]) - (imageHeight/2 + 1); })
        .attr('opacity', function(d) {
          if ((brush.extent()[1]-1)*60050 <= d[0] ) {
            return 1;
          } else {
            return (0);
          }
        });


      var imgurl5 = scope.mostRecentMatch.participants[4].championImage;
      var player5img = svg.selectAll('image1')
        .data(data.player5)
        .enter().append('svg:image')
        .attr('xlink:href', imgurl5)
        .attr('class', 'stuff1')
        .attr('x', function(d) { return xScale(d[2]) - imageWidth/2; })
        .attr('y', function(d) { return yScale(d[3]) - imageHeight/2; })
        .attr('width', imageWidth)
        .attr('height', imageHeight)
        .attr('opacity', function(d) {
          if ((brush.extent()[1]-1)*60050 <= d[0] ) {
            return 1;
          } else {
            return ((d[0]/(brush.extent()[1] * 60000) *0.7) + 0.1);
          }
        });

      svg.selectAll('image1')
        .data(data.player5)
        .enter().append('rect')
        .attr('width', imageWidth + 2)
        .attr('height', imageHeight + 2)
        .style('fill', 'none')
        .style('stroke', '#df3b20')
        .style('stroke-width', 2)
        .attr('class', 'stuff1')
        .attr('x', function(d) { return xScale(d[2]) - (imageWidth/2 + 1); })
        .attr('y', function(d) { return yScale(d[3]) - (imageHeight/2 + 1); })
        .attr('opacity', function(d) {
          if ((brush.extent()[1]-1)*60050 <= d[0] ) {
            return 1;
          } else {
            return (0);
          }
        });



      var imgurl6 = scope.mostRecentMatch.participants[5].championImage;
      var player6img = svg.selectAll('image1')
        .data(data.player6)
        .enter().append('svg:image')
        .attr('xlink:href', imgurl6)
        .attr('class', 'stuff1')
        .attr('x', function(d) { return xScale(d[2]) - imageWidth/2; })
        .attr('y', function(d) { return yScale(d[3]) - imageHeight/2; })
        .attr('width', imageWidth)
        .attr('height', imageHeight)
        .attr('opacity', function(d) {
          if ((brush.extent()[1]-1)*60050 <= d[0] ) {
            return 1;
          } else {
            return ((d[0]/(brush.extent()[1] * 60000) *0.7) + 0.1);
          }
        });

      svg.selectAll('image1')
        .data(data.player6)
        .enter().append('rect')
        .attr('width', imageWidth + 2)
        .attr('height', imageHeight + 2)
        .style('fill', 'none')
        .style('stroke', '#42C0FB')
        .style('stroke-width', 2)
        .attr('class', 'stuff1')
        .attr('x', function(d) { return xScale(d[2]) - (imageWidth/2 + 1); })
        .attr('y', function(d) { return yScale(d[3]) - (imageHeight/2 + 1); })
        .attr('opacity', function(d) {
          if ((brush.extent()[1]-1)*60050 <= d[0] ) {
            return 1;
          } else {
            return (0);
          }
        });



        var imgurl7 = scope.mostRecentMatch.participants[6].championImage;
        var player7img = svg.selectAll('image1')
          .data(data.player7)
          .enter().append('svg:image')
          .attr('xlink:href', imgurl7)
          .attr('class', 'stuff1')
          .attr('x', function (d) {
            return xScale(d[2]) - imageWidth / 2;
          })
          .attr('y', function (d) {
            return yScale(d[3]) - imageHeight / 2;
          })
          .attr('width', imageWidth)
          .attr('height', imageHeight)
          .attr('opacity', function (d) {
            if ((brush.extent()[1] - 1) * 60050 <= d[0]) {
              return 1;
            } else {
              return ((d[0] / (brush.extent()[1] * 60000) * 0.7) + 0.1);
            }
          });

        svg.selectAll('image1')
          .data(data.player7)
          .enter().append('rect')
          .attr('width', imageWidth + 2)
          .attr('height', imageHeight + 2)
          .style('fill', 'none')
          .style('stroke', '#42C0FB')
          .style('stroke-width', 2)
          .attr('class', 'stuff1')
          .attr('x', function (d) {
            return xScale(d[2]) - (imageWidth / 2 + 1);
          })
          .attr('y', function (d) {
            return yScale(d[3]) - (imageHeight / 2 + 1);
          })
          .attr('opacity', function (d) {
            if ((brush.extent()[1] - 1) * 60050 <= d[0]) {
              return 1;
            } else {
              return (0);
            }
          });


        var imgurl8 = scope.mostRecentMatch.participants[7].championImage;
        var player8img = svg.selectAll('image1')
          .data(data.player8)
          .enter().append('svg:image')
          .attr('xlink:href', imgurl8)
          .attr('class', 'stuff1')
          .attr('x', function (d) {
            return xScale(d[2]) - imageWidth / 2;
          })
          .attr('y', function (d) {
            return yScale(d[3]) - imageHeight / 2;
          })
          .attr('width', imageWidth)
          .attr('height', imageHeight)
          .attr('opacity', function (d) {
            if ((brush.extent()[1] - 1) * 60050 <= d[0]) {
              return 1;
            } else {
              return ((d[0] / (brush.extent()[1] * 60000) * 0.7) + 0.1);
            }
          });

        svg.selectAll('image1')
          .data(data.player8)
          .enter().append('rect')
          .attr('width', imageWidth + 2)
          .attr('height', imageHeight + 2)
          .style('fill', 'none')
          .style('stroke', '#42C0FB')
          .style('stroke-width', 2)
          .attr('class', 'stuff1')
          .attr('x', function (d) {
            return xScale(d[2]) - (imageWidth / 2 + 1);
          })
          .attr('y', function (d) {
            return yScale(d[3]) - (imageHeight / 2 + 1);
          })
          .attr('opacity', function (d) {
            if ((brush.extent()[1] - 1) * 60050 <= d[0]) {
              return 1;
            } else {
              return (0);
            }
          });


        var imgurl9 = scope.mostRecentMatch.participants[8].championImage;
        var player9img = svg.selectAll('image1')
          .data(data.player9)
          .enter().append('svg:image')
          .attr('xlink:href', imgurl9)
          .attr('class', 'stuff1')
          .attr('x', function (d) {
            return xScale(d[2]) - imageWidth / 2;
          })
          .attr('y', function (d) {
            return yScale(d[3]) - imageHeight / 2;
          })
          .attr('width', imageWidth)
          .attr('height', imageHeight)
          .attr('opacity', function (d) {
            if ((brush.extent()[1] - 1) * 60050 <= d[0]) {
              return 1;
            } else {
              return ((d[0] / (brush.extent()[1] * 60000) * 0.7) + 0.1);
            }
          });

        svg.selectAll('image1')
          .data(data.player9)
          .enter().append('rect')
          .attr('width', imageWidth + 2)
          .attr('height', imageHeight + 2)
          .style('fill', 'none')
          .style('stroke', '#42C0FB')
          .style('stroke-width', 2)
          .attr('class', 'stuff1')
          .attr('x', function (d) {
            return xScale(d[2]) - (imageWidth / 2 + 1);
          })
          .attr('y', function (d) {
            return yScale(d[3]) - (imageHeight / 2 + 1);
          })
          .attr('opacity', function (d) {
            if ((brush.extent()[1] - 1) * 60050 <= d[0]) {
              return 1;
            } else {
              return (0);
            }
          });


        var imgurl10 = scope.mostRecentMatch.participants[9].championImage;
        var player10img = svg.selectAll('image1')
          .data(data.player10)
          .enter().append('svg:image')
          .attr('xlink:href', imgurl10)
          .attr('class', 'stuff1')
          .attr('x', function (d) {
            return xScale(d[2]) - imageWidth / 2;
          })
          .attr('y', function (d) {
            return yScale(d[3]) - imageHeight / 2;
          })
          .attr('width', imageWidth)
          .attr('height', imageHeight)
          .attr('opacity', function (d) {
            if ((brush.extent()[1] - 1) * 60050 <= d[0]) {
              return 1;
            } else {
              return ((d[0] / (brush.extent()[1] * 60000) * 0.7) + 0.1);
            }
          });

        svg.selectAll('image1')
          .data(data.player10)
          .enter().append('rect')
          .attr('width', imageWidth + 2)
          .attr('height', imageHeight + 2)
          .style('fill', 'none')
          .style('stroke', '#42C0FB')
          .style('stroke-width', 2)
          .attr('class', 'stuff1')
          .attr('x', function (d) {
            return xScale(d[2]) - (imageWidth / 2 + 1);
          })
          .attr('y', function (d) {
            return yScale(d[3]) - (imageHeight / 2 + 1);
          })
          .attr('opacity', function (d) {
            if ((brush.extent()[1] - 1) * 60050 <= d[0]) {
              return 1;
            } else {
              return (0);
            }
          });

      //IF THE MAP IS TWISTED TREELINE


      } else if (scope.mostRecentMatch.mapId == 10) {
      var imgurl6 = scope.mostRecentMatch.participants[3].championImage;
      var player6img = svg.selectAll('image1')
        .data(data.player4)
        .enter().append('svg:image')
        .attr('xlink:href', imgurl6)
        .attr('class', 'stuff1')
        .attr('x', function(d) { return xScale(d[2]) - imageWidth/2; })
        .attr('y', function(d) { return yScale(d[3]) - imageHeight/2; })
        .attr('width', imageWidth)
        .attr('height', imageHeight)
        .attr('opacity', function(d) {
          if ((brush.extent()[1]-1)*60050 <= d[0] ) {
            return 1;
          } else {
            return ((d[0]/(brush.extent()[1] * 60000) *0.7) + 0.1);
          }
        });

      svg.selectAll('image1')
        .data(data.player4)
        .enter().append('rect')
        .attr('width', imageWidth + 2)
        .attr('height', imageHeight + 2)
        .style('fill', 'none')
        .style('stroke', '#42C0FB')
        .style('stroke-width', 2)
        .attr('class', 'stuff1')
        .attr('x', function(d) { return xScale(d[2]) - (imageWidth/2 + 1); })
        .attr('y', function(d) { return yScale(d[3]) - (imageHeight/2 + 1); })
        .attr('opacity', function(d) {
          if ((brush.extent()[1]-1)*60050 <= d[0] ) {
            return 1;
          } else {
            return (0);
          }
        });


      var imgurl7 = scope.mostRecentMatch.participants[4].championImage;
      var player7img = svg.selectAll('image1')
        .data(data.player5)
        .enter().append('svg:image')
        .attr('xlink:href', imgurl7)
        .attr('class', 'stuff1')
        .attr('x', function (d) {
          return xScale(d[2]) - imageWidth / 2;
        })
        .attr('y', function (d) {
          return yScale(d[3]) - imageHeight / 2;
        })
        .attr('width', imageWidth)
        .attr('height', imageHeight)
        .attr('opacity', function (d) {
          if ((brush.extent()[1] - 1) * 60050 <= d[0]) {
            return 1;
          } else {
            return ((d[0] / (brush.extent()[1] * 60000) * 0.7) + 0.1);
          }
        });

      svg.selectAll('image1')
        .data(data.player5)
        .enter().append('rect')
        .attr('width', imageWidth + 2)
        .attr('height', imageHeight + 2)
        .style('fill', 'none')
        .style('stroke', '#42C0FB')
        .style('stroke-width', 2)
        .attr('class', 'stuff1')
        .attr('x', function (d) {
          return xScale(d[2]) - (imageWidth / 2 + 1);
        })
        .attr('y', function (d) {
          return yScale(d[3]) - (imageHeight / 2 + 1);
        })
        .attr('opacity', function (d) {
          if ((brush.extent()[1] - 1) * 60050 <= d[0]) {
            return 1;
          } else {
            return (0);
          }
        });


      var imgurl8 = scope.mostRecentMatch.participants[5].championImage;
      var player8img = svg.selectAll('image1')
        .data(data.player6)
        .enter().append('svg:image')
        .attr('xlink:href', imgurl8)
        .attr('class', 'stuff1')
        .attr('x', function (d) {
          return xScale(d[2]) - imageWidth / 2;
        })
        .attr('y', function (d) {
          return yScale(d[3]) - imageHeight / 2;
        })
        .attr('width', imageWidth)
        .attr('height', imageHeight)
        .attr('opacity', function (d) {
          if ((brush.extent()[1] - 1) * 60050 <= d[0]) {
            return 1;
          } else {
            return ((d[0] / (brush.extent()[1] * 60000) * 0.7) + 0.1);
          }
        });

      svg.selectAll('image1')
        .data(data.player6)
        .enter().append('rect')
        .attr('width', imageWidth + 2)
        .attr('height', imageHeight + 2)
        .style('fill', 'none')
        .style('stroke', '#42C0FB')
        .style('stroke-width', 2)
        .attr('class', 'stuff1')
        .attr('x', function (d) {
          return xScale(d[2]) - (imageWidth / 2 + 1);
        })
        .attr('y', function (d) {
          return yScale(d[3]) - (imageHeight / 2 + 1);
        })
        .attr('opacity', function (d) {
          if ((brush.extent()[1] - 1) * 60050 <= d[0]) {
            return 1;
          } else {
            return (0);
          }
        });
    }

      //D3 TOOLTIPS AND COMBAT DATA

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        //console.log(d)
        var scoreImg = '<image class="tooltipScore" src="./views/images/score.png">';
        var tooltipX = '<image class="tooltipX" src="./views/images/600px-Red_X_Freehand.svg.png">';
        if(d[1] == "ChampionKilled") {
          if (d[4] !== 0) {
            var killer = '<image class="tooltip team' + scope.mostRecentMatch.participants[d[4] - 1].teamId + '" src="' + scope.mostRecentMatch.participants[d[4] - 1].championImage + '">';
          } else {
            killer = '<image class="tooltip player0" src="./views/images/RIP.jpg">';
          }
          var victim = '<image class="victim tooltip team' + scope.mostRecentMatch.participants[d[6] - 1].teamId + '" src="' + scope.mostRecentMatch.participants[d[6] - 1].championImage + '">';
          var assistImg = '';
          var assistors = '';
          if (d[5] !== null) {
            assistImg = '<image class="tooltipScore" src="./views/images/assist.png">';
            for (var i = 0; i < d[5].length; i++) {
              assistors += '<image class="tooltip assistor team' + scope.mostRecentMatch.participants[(d[5][i]) - 1].teamId + '" src="' + scope.mostRecentMatch.participants[(d[5][i]) - 1].championImage + '">'
            }
          }
        } else if (d[1] == 'MonsterKilled') {
          var assistImg = '';
          var assistors = '';
          var killer = '<image class="tooltip team' + scope.mostRecentMatch.participants[d[4] - 1].teamId + '" src="' + scope.mostRecentMatch.participants[d[4] - 1].championImage + '">';
          if(d[5] == 'DRAGON') {
            var victim = '<image class="tooltip player0" src="http://vignette3.wikia.nocookie.net/leagueoflegends/images/c/c9/DragonSquare.png/revision/latest/scale-to-width-down/48?cb=20140620025407">';
          } else if (d[5] == 'BARON_NASHOR') {
            var victim = '<image class="tooltip player0" src="http://apollo-eu-uploads.s3.amazonaws.com/1430078459025/profileIcon839.png">';
          } else if (d[5] == 'VILEMAW') {
            var victim = '<image class="tooltip player0" src="http://vignette1.wikia.nocookie.net/leagueoflegends/images/5/5d/VilemawSquare.png/revision/latest/scale-to-width-down/48?cb=20140308093146">';
          }
        }
        return killer + scoreImg + victim + tooltipX + '<br>' + assistImg + assistors;
      });

      svg.call(tip);

      var combaturl = "./views/images/score.png";
      var combatimg = svg.selectAll("image1")
        .data(data.combat)
        .enter().append('svg:image')
        .attr('class', 'stuff1')
        .attr('xlink:href', combaturl)
        .attr('x', function(d) { return xScale(d[2]) - imageWidth/2; })
        .attr('y', function(d) { return yScale(d[3]) - imageHeight/2; })
        .attr('width', 25)
        .attr('height', 25)
        .attr('opacity', function(d) {
          if ((brush.extent()[1]-1)*60050 <= d[0] ) {
            return 1;
          } else {
            return ((d[0]/(brush.extent()[1] * 60000) *0.7) + 0.1);
          }
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
    }

    update(jsonData);

  }