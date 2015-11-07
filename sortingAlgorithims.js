var riotMatchData = {}; //insert Riot's Match Data here
var parsedMatchData = {};

for (var p = 1; p < riotMatchData.participants.length + 1; p++) {
    parsedMatchData['player'+p] = [];
    var timeline = riotMatchData.timeline.frames;
    for (var i = 0; i < timeline.length -1; i++) {
        var data = [];
        data.push(timeline[i].timestamp);
        data.push('Position');
        data.push(timeline[i].participantFrames[p].position.x);
        data.push(timeline[i].participantFrames[p].position.y);
        parsedMatchData['player'+p].push(data);
        if(timeline[i].events !== undefined) {
            for (var j = 0; j < timeline[i].events.length; j++) {
                var data = [];
                var eventFrame = timeline[i].events[j];
                if (eventFrame.eventType == 'CHAMPION_KILL') {
                    if (eventFrame.killerId == p) {
                        data.push(eventFrame.timestamp);
                        data.push('Enemy Slain');
                        data.push(eventFrame.position.x);
                        data.push(eventFrame.position.y);
                        parsedMatchData['player'+p].push(data);
                    } else if (eventFrame.victimId == p) {
                        data.push(eventFrame.timestamp);
                        data.push('Player Slain');
                        data.push(eventFrame.position.x);
                        data.push(eventFrame.position.y);
                        parsedMatchData['player'+p].push(data);
                    } else if ('assistingParticipantIds' in eventFrame) {
                        if (eventFrame.assistingParticipantIds.indexOf(p) !== -1) {
                            data.push(eventFrame.timestamp);
                            data.push('Kill Assisted');
                            data.push(eventFrame.position.x);
                            data.push(eventFrame.position.y);
                            parsedMatchData['player' + p].push(data);
                        }
                    }
                } else if (eventFrame.eventType == 'BUILDING_KILL') {
                    if (eventFrame.killerId == p) {
                        data.push(eventFrame.timestamp);
                        data.push('Building Destroyed');
                        data.push(eventFrame.position.x);
                        data.push(eventFrame.position.y);
                        parsedMatchData['player'+p].push(data);
                    } else if ('assistingParticipantIds' in eventFrame) {
                        if (eventFrame.assistingParticipantIds.indexOf(p) !== -1) {
                            data.push(eventFrame.timestamp);
                            data.push('Kill Assisted');
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

console.log(parsedMatchData.player1[1]);

