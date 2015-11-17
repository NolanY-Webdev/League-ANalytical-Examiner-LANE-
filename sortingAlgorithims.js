function combatParser(riotMatchData) {
    var parsedMatchData = {};
    var timeline = riotMatchData.timeline.frames;

    for (var p = 1; p < riotMatchData.participants.length + 1; p++) {
        parsedMatchData['player' + p] = [];
        for (var i = 0; i < timeline.length; i++) {//removed the -1 from timeline length, don't remember why I put it in
            if(i !== timeline.length-1) {
                var data = [];
                data.push(timeline[i].timestamp);
                data.push('Position');
                data.push(timeline[i].participantFrames[p].position.x);
                data.push(timeline[i].participantFrames[p].position.y);
                parsedMatchData['player' + p].push(data);
            }
            if (timeline[i].events !== undefined) {
                for (var j = 0; j < timeline[i].events.length; j++) {
                    var data = [];
                    var eventFrame = timeline[i].events[j];
                    if (eventFrame.eventType == 'BUILDING_KILL') {
                        if (eventFrame.killerId == p) {
                            data.push(eventFrame.timestamp);
                            data.push('Building Destroyed');
                            data.push(eventFrame.position.x);
                            data.push(eventFrame.position.y);
                            parsedMatchData['player' + p].push(data);
                        } else if ('assistingParticipantIds' in eventFrame) {
                            if (eventFrame.assistingParticipantIds.indexOf(p) !== -1) {
                                data.push(eventFrame.timestamp);
                                data.push('Building Kill Assisted');
                                data.push(eventFrame.position.x);
                                data.push(eventFrame.position.y);
                                parsedMatchData['player' + p].push(data);
                            }
                        }
                    }
                }
            }
        }
    }
    parsedMatchData.combat = [];
    parsedMatchData.deadBuildings = [];
    for (var i = 0; i < timeline.length; i++) {//removed the -1 from timeline length, don't remember why I put it in
        if (timeline[i].events !== undefined) {
            for (var j = 0; j < timeline[i].events.length; j++) {
                var eventFrame = timeline[i].events[j];
                if (eventFrame.eventType == 'CHAMPION_KILL') {
                    var data = [];
                    data.push(eventFrame.timestamp);
                    data.push('ChampionKilled');
                    data.push(eventFrame.position.x);
                    data.push(eventFrame.position.y);
                    data.push(eventFrame.killerId);
                    data.push(eventFrame.assistingParticipantIds);
                    data.push(eventFrame.victimId);
                    parsedMatchData['combat'].push(data);
                } else if (eventFrame.eventType == 'BUILDING_KILL') {
                    var data = [];
                    var type = '';
                    var position = '';
                    var lane = '';
                    var team = '';
                    if(eventFrame.buildingType == "TOWER_BUILDING") {
                        type = 'Tower';
                    } else if (eventFrame.buildingType == "INHIBITOR_BUILDING") {
                        type = "Inhib";
                    }
                    if(eventFrame.towerType == "OUTER_TURRET") {
                        position = 'Outer';
                    } else if(eventFrame.towerType == "INNER_TURRET") {
                        position = 'Inner';
                    } else if(eventFrame.towerType == "BASE_TURRET") {
                        position = 'Base';
                    } else if(eventFrame.towerType == "NEXUS_TURRET") {
                        if(eventFrame.position.x < eventFrame.position.y) {
                            position = 'NexusTop';
                        } else if (eventFrame.position.x > eventFrame.position.y) {
                            position = 'NexusBot';
                        }
                    }
                    if(eventFrame.laneType == "BOT_LANE") {
                        lane = 'Bot';
                    } else if(eventFrame.laneType == "TOP_LANE") {
                        lane = 'Top';
                    } else if(eventFrame.laneType == "MID_LANE") {
                        lane = 'Mid';
                    }
                    if(eventFrame.teamId == 100) {
                        team = 'A';
                    } else if(eventFrame.teamId == 200) {
                        team = 'B';
                    }
                    data.push(eventFrame.timestamp);
                    data.push(type + position + lane + team);
                    parsedMatchData.deadBuildings.push(data);
                    if (eventFrame.buildingType == "INHIBITOR_BUILDING") {
                        var respawn = []
                        respawn.push(data[0] + 300000);
                        respawn.push(data[1] + 'Respawned');
                        parsedMatchData.deadBuildings.push(respawn);
                    }
                }
            }
        }
        if(i == timeline.length-1) {
            parsedMatchData.gameLength = timeline[i].timestamp;
        }
    }

    return parsedMatchData;
}


module.exports = combatParser;