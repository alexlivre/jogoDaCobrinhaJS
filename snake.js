 window.onload = function () {
    
            let areaJogo = document.querySelector('#areaJogo');
            let context = areaJogo.getContext('2d');
            document.addEventListener('keydown', keyPush);
            setInterval(game, 120);

            const vel = 1;

            let corAreaJogo = '#2c3e50';
            let corCobra = '#e67e22';
            let corComida = '#e74c3c';
            let velocidadeX = velocidadeY = 0;
            let cabecaX = 0;
            let cabecaY = 0;
            let tamanhoPeca = 30;
            let quantidadePecas = 20;
            let comidaX = comidaY = 15;
            let rastro = [];
            let rabo = 5;
            let jogoIniciado = false;

            const posicaoAleatoria = () => Math.floor(Math.random() * quantidadePecas);



            function game() {
                cabecaX += velocidadeX;
                cabecaY += velocidadeY;

                if (cabecaX < 0) {
                    cabecaX = quantidadePecas - 1;
                }
                if (cabecaX > quantidadePecas - 1) {
                    cabecaX = 0
                }
                if (cabecaY < 0) {
                    cabecaY = quantidadePecas - 1;
                }
                if (cabecaY > quantidadePecas - 1) {
                    cabecaY = 0;
                }

                context.fillStyle = corAreaJogo;
                context.fillRect(0, 0, areaJogo.width, areaJogo.height);

                context.fillStyle = corComida;
                context.fillRect(comidaX * tamanhoPeca, comidaY * tamanhoPeca, tamanhoPeca, tamanhoPeca);

                context.fillStyle = corCobra;
                for (var i = 0; i < rastro.length; i++) {
                    context.fillRect(rastro[i].x * tamanhoPeca, rastro[i].y * tamanhoPeca, tamanhoPeca - 1, tamanhoPeca - 1);
                    if (rastro[i].x == cabecaX && rastro[i].y == cabecaY) {
                        velocidadeX = velocidadeY = 0;
                        rabo = 5;
                        if (jogoIniciado == true) {
                            cabecaX = cabecaY = posicaoAleatoria();
                            jogoIniciado = false;
                        }

                    }
                }

                rastro.push({ x: cabecaX, y: cabecaY });
                while (rastro.length > rabo) {
                    rastro.shift();
                }

                if (comidaX == cabecaX && comidaY == cabecaY) {
                    rabo++;
                    // 
                    for (var i = 0; i < rastro.length; i++) {
                    	if (rastro[i].x == comidaX && rastro[i].y == comidaY) {
                    		comidaX = posicaoAleatoria()
                    		comidaY = posicaoAleatoria()
                    	}
                    }
                    // 
                    
                }

            }

            function keyPush(evento) {

            	if (evento.keyCode == 37 && velocidadeX != vel) { // esquerda
            		velocidadeX = -vel;
                    velocidadeY = 0;
                    jogoIniciado = true;
            	}
            	else if (evento.keyCode == 38 && velocidadeY != vel) { // cima
            		velocidadeX = 0;
                    velocidadeY = -vel;
                    jogoIniciado = true;
            	}
            	else if (evento.keyCode == 39 && velocidadeX != -vel) { // direita
            		velocidadeX = vel;
                    velocidadeY = 0;
                    jogoIniciado = true;
            	}
            	else if (evento.keyCode == 40 && velocidadeY != -vel) { // baixo
            		velocidadeX = 0;
                    velocidadeY = vel;
                    jogoIniciado = true;
            	}
            }

        }