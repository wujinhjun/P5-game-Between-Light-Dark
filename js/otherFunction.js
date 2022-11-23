function borderDraw(size) {
    push();
        translate(mapSize / 2, mapSize / 2);
        rectMode(CENTER);
        noFill();
        strokeWeight(10);
        stroke(0);
        rect(0,0, size, size);
    pop();
}

function viewPort() {
    let playerLocation = createVector(player.location.x, player.location.y);
    let viewSize = 200;
    push();
        let distLeftWidth = playerLocation.x - viewSize;
        let distRightWidth = mapSize - viewSize - playerLocation.x ;
        let distTopHeight = playerLocation.y - viewSize;
        let lengthMap = mapSize;

        noStroke();
        fill(100, 100, 100);
        rect(0, 0, distLeftWidth, lengthMap);
        rect(distLeftWidth, 0, 2 * viewSize + distRightWidth, distTopHeight);
        rect(distLeftWidth + 2 * viewSize, 0, distRightWidth, lengthMap);
        rect(distLeftWidth, distTopHeight + 2 * viewSize, lengthMap, lengthMap);
    pop();
}