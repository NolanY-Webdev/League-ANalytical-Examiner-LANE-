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

    var computedGameLength = Math.floor(currentGame.stats.timePlayed / 60);
    var subGameType = currentGame.subType;

    if (subGameType === "ARAM_UNRANKED_5x5") {
      subGameType = '5x5';
    }

    gameData = {
      'gameId' : currentGame.gameId,
      'gameMode' : currentGame.gameMode,
      'subType' : subGameType,
      'mapId' : currentGame.mapId,
      'createDate' : currentGame.createDate,
      'gameLength' : computedGameLength
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