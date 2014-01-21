(function(K) {
    var game,
        layer,
        btn,
        betLabel,
        rouletteLabel,
        resultLabel,
        cashLabel,
        cash = 2500,
        betAmount = 50;

    function _createStage(containerId, width, height) {
        return new K.Stage({
            container: containerId,
            width: width,
            height: height
        });
    }

    function _createLayer() {
        return new K.Layer();
    }

    function _createBetButton() {
        var button = new K.Group({
                x: 260,
                y: 30,
                width: 120,
                height: 30
            }),
            rect = new K.Rect({
                width: 120,
                height: 30,
                fill: 'green',
                stroke: 'black',
                strokeWidth: 1,
                cornerRadius: 5
            }),
            buttonLabel = new K.Text({
                text: 'Enter your bet',
                fontSize: 16,
                fontFamily: 'Calibri',
                fill: 'white',
                width: 120,
                y: 7
            }).align('center');

        button.add(rect);
        button.add(buttonLabel);

        return button;
    }

    function _createBetLabel() {
        return new K.Text({
            fontSize: 16,
            fontFamily: 'Calibri',
            fill: 'white',
            y: 70,
            width: 640
        }).align('center');
    }

    function _createRouletteLabel() {
        return new K.Text({
            fontSize: 50,
            fontFamily: 'Calibri',
            fill: 'white',
            y: 150,
            width: 640
        }).align('center');
    }

    function _createResultLabel() {
        return new K.Text({
            fontSize: 100,
            fontFamily: 'Calibri',
            fill: 'white',
            y: 300,
            width: 640
        }).align('center');
    }

    function _createCashLabel() {
        return new K.Text({
            text: 'Your cash: $' + cash,
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'white',
            width: 600,
            y: 30,
            x: 20
        }).align('right');
    }

    function initGame(containerId, width, height) {
        game          = _createStage(containerId, width, height);
        layer         = _createLayer();
        btn           = _createBetButton();
        betLabel      = _createBetLabel();
        rouletteLabel = _createRouletteLabel();
        resultLabel   = _createResultLabel();
        cashLabel     = _createCashLabel();

        btn.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });

        btn.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });

        btn.on('click', function() {
            if(cash === 0) {
                window.alert('You cannot bet, you have no more cash!');
                return false;
            }

            betLabel.setText('');
            rouletteLabel.setText('');
            resultLabel.setText('');
            layer.draw();

            var bet = window.prompt('Enter the number you want to bet on (between 0 and 36):');

            if(bet) {
                if(bet > 36) {
                    window.alert('You can only bet on numbers betwen 0 and 36! You bet on: ' + bet);
                    return false;
                }

                betLabel.setText('You are betting on: ' + bet);
                betLabel.align('center');
                layer.draw();

                var count = 0,
                    result;

                var getRandomResult = setInterval(function() {
                    if(count < 20) {
                        result = Math.round(Math.random() * 36);
                        count++;
                        rouletteLabel.setText(result);
                        rouletteLabel.align('center');
                        layer.draw();
                    } else {
                        clearInterval(getRandomResult);

                        var message = '';
                        if(result === parseInt(bet)) {
                            message = 'You won!';
                            cash += betAmount;
                        } else {
                            message = 'You lost :(';
                            cash -= betAmount;
                        }

                        resultLabel.setText(message);
                        resultLabel.align('center');
                        cashLabel.setText('Your cash: $' + cash);
                        cashLabel.align('right');
                        layer.draw();
                    }
                }, 100);
            }
        });

        // add the elements to the layer
        layer.add(cashLabel);
        layer.add(btn);
        layer.add(betLabel);
        layer.add(rouletteLabel);
        layer.add(resultLabel);

        // add the layer to the game
        game.add(layer);
    }

    initGame('game-container', 640, 480);

})(Kinetic);