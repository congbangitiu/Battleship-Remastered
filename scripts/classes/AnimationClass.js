////////////////////////////// ANIMATION //////////////////////////////////////////////////////////////
// Chỉnh vị trí thuyền với nền game
class animation {
    constructor() {
        this.submarineX1 = 1300;
        this.submarineY1 = 130;
        this.submarineX2 = -230;
        this.submarineY2 = 740;
        this.fishX1 = 0;
        this.fishX2 = -1200;
        this.fishY = 0;
    }

    drawShip(centerX, centerY, r, g, b) {
        var bodyLength = 72;
        var bodyHeight = 43;

        // color
        fill(r, g, b);
        // body
        rect(centerX, centerY, bodyLength, bodyHeight);

        // body - window
        fill(r - 10, g + 20, b - 15)
        ellipse(centerX + 34, centerY + 21, 25, 25);

        // head
        fill(r + 10, g - 20, b + 15);
        var tailWidth = bodyLength / 2;
        var tailHeight = bodyHeight / 2;
        triangle(centerX + bodyLength * 1.5, centerY + bodyHeight / 2,
            centerX + bodyLength / 2 + tailWidth, centerY + tailHeight + bodyHeight / 2,
            centerX + bodyLength / 2 + tailWidth, centerY - tailHeight + bodyHeight / 2);
        triangle(centerX + bodyLength / 2 - 5, centerY + bodyHeight,
            centerX + bodyLength / 2 - tailWidth, centerY + bodyLength,
            centerX + bodyLength / 2 - tailWidth, centerY + 43);
        triangle(centerX + bodyLength / 2 - 5, centerY,
            centerX + bodyLength / 2 - tailWidth, centerY,
            centerX + bodyLength / 2 - tailWidth, centerY - 32);

        // tail
        fill(b, r, g);
        rect(centerX, centerY + 5, bodyLength - 90, bodyHeight - 10);
    }

    submarineGlass(submarine_X, submarine_Y) {
        fill(1, 36, 43);
        ellipse(submarine_X + 190, submarine_Y + 37, 45, 45);
        fill(183, 226, 235);
        ellipse(submarine_X + 190, submarine_Y + 37, 35, 35);
    }

    drawShipGroup(x, y) {
        this.drawShip(x + 303, y + 20, 	79, 79, 127);
        this.drawShip(x + 164, y + 260, 54, 53, 109);
        this.drawShip(x - 150, y + 340, 230, 230, 237);
        this.drawShip(x + 450, y + 385, 104, 104, 145);
        this.drawShip(x + 264, y + 510, 180, 179, 200);
        this.drawShip(x + 65, y + 620, 130, 129, 164);
    }

    drawSubmarine(submarine_X, submarine_Y) {
        fill(130, 129, 164);
        ellipse(submarine_X + 196, submarine_Y + 36, 105, 70);
        ellipse(submarine_X + 2, submarine_Y + 36, 105, 70);
        fill(54, 53, 109);
        rect(submarine_X + 1, submarine_Y + 1, 200, 70);

        fill(29, 28, 90);
        rect(submarine_X + 93, submarine_Y + -42, 40, 45);
        fill(29, 28, 90);
        rect(submarine_X + 93, submarine_Y + 71, 40, 14);

        this.submarineGlass(submarine_X, submarine_Y);
        this.submarineGlass(submarine_X + -82, submarine_Y + 1);
        this.submarineGlass(submarine_X + -164, submarine_Y + 1);
    }

    showMessage(msg) {
        background(255, 255, 255, 60);
        fill(237, 34, 93);
        strokeWeight(10);
        rect(760, 310, 400, 150, 300);
        fill(255, 255, 255);
        textFont('Helvetica');
        textSize(40);
        text(msg, 800, 360, 400, 150);
        strokeWeight(1);
    }

    animationPlay() {
        background(22, 27, 54);
        this.submarineX1 = this.submarineX1 - 1.5;
        this.submarineX2 = this.submarineX2 + 1.5;
        this.fishX1 = this.fishX1 + 2.5;
        this.fishX2 = this.fishX2 + 2.5;

        this.drawShipGroup(this.fishX1, this.fishY);
        this.drawShipGroup(this.fishX2, this.fishY);

        if (this.submarineX1 < -100) {
            this.submarineX1 = 2000;
        }
        if (this.submarineX2 > 1900) {
            this.submarineX2 = -100;
        }
        if (this.fishX1 > 2000) {
            this.fishX1 = -300;
        }
        if (this.fishX2 > 2000) {
            this.fishX2 = -300;
        }

        this.drawSubmarine(this.submarineX1, this.submarineY1);
        this.drawSubmarine(this.submarineX2, this.submarineY2);
    }
}

