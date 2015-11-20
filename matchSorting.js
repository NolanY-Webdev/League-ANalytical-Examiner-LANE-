var champion = require('./championSelect');

function sort(data) {
  var sorted = [];
  function matchChampion(data) {
    for (var k = 0; k < data.length; k++) {
      // loops through championSelect
      for (var c = 0; c < champion.length; c++) {
        // reassigns championId into a image
        if (data[k] == champion[c].key) {
          data[k] = champion[c].image;
        }
      }
    }
    return data;
  }

  for (var i = 0; i < data.games.length; i++) {
    var currentGame = data.games[i];
    var gameData = [];
    var team100 = currentGame.fellowPlayers.filter(function (c, i, a) {
      return c.teamId == 100
    });
    var team200 = currentGame.fellowPlayers.filter(function (c, i, a) {
      return c.teamId == 200
    });
    var team100ids = team100.map(function (c, i, a) {
      return c.championId;
    });
    var team200ids = team200.map(function (c, i, a) {
      return c.championId;
    });

    gameData = {
      'gameId' : currentGame.gameId,
      'gameMode' : currentGame.gameMode,
      'subType' : currentGame.subType,
      'mapId' : currentGame.mapId,
      'createDate' : currentGame.createDate,
      'gameLength' : currentGame.stats.timePlayed
    };

    if (currentGame.teamId == 100) {
      team100ids.unshift(currentGame.championId);
      gameData.myTeam = matchChampion(team100ids);
      gameData.enemyTeam = matchChampion(team200ids);
    } else if (currentGame.teamId == 200) {
      team200ids.unshift(currentGame.championId);
      gameData.myTeam = matchChampion(team200ids);
      gameData.enemyTeam = matchChampion(team100ids);
    }

    sorted.push(gameData);
  }

  return sorted;
}

module.exports = sort;

// var champion = require('./championSelect');

// 'use strict';
// function sort(data) {
//   var sorted = [];

//   for (var i = 0; i < data.games.length; i++) {
//     var currentGame = data.games[i];
//     var gameData = [];
//     var team100 = currentGame.fellowPlayers.filter(function(c, i, a) {
//       return c.teamId == 100
//     });
//     var team200 = currentGame.fellowPlayers.filter(function(c, i, a) {
//       return c.teamId == 200
//     });
//     var team100ids = team100.map(function(c, i, a) {
//       return c.championId;
//     });
//     var team200ids = team200.map(function(c, i, a) {
//       return c.championId;
//     });

//     if (currentGame.teamId == 100) {
//       team100ids.unshift(currentGame.championId);
//       gameData.push(team100ids);
//       gameData.push(team200ids);
//     } else if (currentGame.teamId == 200) {
//       team200ids.unshift(currentGame.championId);
//       gameData.push(team200ids);
//       gameData.push(team100ids);
//     }

//     var almostSorted = matchChampion(sorted);

//     gameData[2] = {
//       'gameMode' : currentGame.gameMode,
//       'subType' : currentGame.subType,
//       'mapId' : currentGame.mapId,
//       'createDate' : currentGame.createDate,
//       'gameTime' : currentGame.stats.timePlayed
//     };
//     almostSorted.push(gameData);
//     almostSorted.unshift(currentGame.gameId);
//   }
//   return almostSorted;
// }

// function matchChampion(data) {
//   // loops through 10 games
//   for (var i = 0; i < data.length; i++) {
//     // outter array
//     for (var j = 0; j < data[i].length; j++) {
//       // loops throsught team 100 and 200
//       for (var k = 0; k < data[i][j].length; k++) {
//             // console.log('data[i][j] haloooo!', data[i][j]);
//         // loops through championSelect
//         for (var c = 0; c < champion.length; c++) {
//           // reassigns championId into a image
//           if (data[i][j][k] == champion[c].key) {
//             data[i][j][k] = champion[c].image;
//             // console.log('works!');
//           }
//         }
//       }
//     }
//   }
//   // console.log('your champion:', data);
//   return data;
// }

// module.exports = sort;