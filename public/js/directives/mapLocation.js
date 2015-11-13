/* globals
  laneApp,
  d3
*/
'use strict';
angular.module('laneApp')
  .directive('mapD', function() {
      return {
        restrict : 'E',
        link : function () {

'use strict';

  var salesData = laneApp.DataSource;
  var margin = { top : 80, bottom : 80, left : 80, right : 80 };
  var width = 600;
  var height = 500;


  // range are limits of data on 'screen space'
  // scale domain is data limits
  var x = d3.time.scale()
    .domain(
      d3.extent(salesData, function(d){
        return new Date(Date.parse(d.ordered_on));
      })
    )
    .range([ 0, width ]);

  // x, and y variables are scale functions
  var y = d3.scale.linear()
  .domain([
    0,
    d3.max(
      salesData.map(function(d){
        return d.sale;
      })
    )
  ])
  .range([ height, 0 ]);

  // axes
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .ticks(6);

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(8);

  // select and selectAll like dom selection,
  //   except selects all elements now and in the future
  var svg = d3.select('#map-d')
  .append('svg')  // create and append <svg>
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('class', 'graph')
    .attr('transform', 'translate('+margin.left+','+margin.top+')');


  // append the axes
  svg.append('g')
    .attr('class', 'y axis axisLeft')
    .call(yAxis);

  svg.append('g')
    .attr('class', 'x axis axisBottom')
    .attr('transform', 'translate(0,'+height+')')
    .call(xAxis);

    function update(data){
      var spots = svg.selectAll('.sale').data(data);

      spots.exit().remove();

      spots.enter()
        .append('circle');

      spots
        .attr('class', 'sale')
        .attr('cx', function(d){
          return x(new Date(d.ordered_on));
        })
        .attr('cy', function(d){
          return y(d.sale);
        })
        .attr('r', function(d){
          return d.age * .5;
        })
        .attr('fill', function(d){
          return d.eyeColor;
        });

    }

  var filterButtons = d3.select('#filter_buttons').append('div');

  // get all unique colors
  var uniqueColors = laneApp.DataSource.reduce(function(uniques, d){
    if(uniques.indexOf(d.eyeColor) < 0) uniques.push(d.eyeColor);
    return uniques;
  },[]);

  function filter(color){
    var newData = laneApp.DataSource.filter(function(d){
      return d.eyeColor == color;
    });

    update(newData);
  }

  filterButtons.selectAll('.buttonFilter').data(uniqueColors).enter()
    .append('button')
    .text(function(d){
      return d;
    })
    .attr('style', function(d){
      return 'background-color:'+d;
    })
    .on('click', function(d){
      filter(d);
    });

  update(salesData);
console.log('IS IT WORKING?');
        }
      }
    }
  );