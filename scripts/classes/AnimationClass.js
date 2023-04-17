class animationClass {
    constructor() {
        this.submarineX1 = 1300;
        this.submarineY1 = 230;
        this.submarineX2 = -230;
        this.submarineY2 = 140;
        this.fishX1 = 0;
        this.fishX2 = -500;
        this.fishY = 0;
    }

    // ĐANG KHÔNG BIẾT DÙNG ĐỂ LÀM GÌ !!!
    drawPebbles(x, y) {
        for (let i = 0; i < 450; i++) {
            const randomX = x + random(0, 1300);
            const randomY = y + random(670, 750);
            fill(random(0, 300), random(0, 200), random(0, 100));
            ellipse(randomX, randomY, 15, 10);
        }
    }
}