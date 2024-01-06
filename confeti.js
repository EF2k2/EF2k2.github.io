// Añade la referencia a anime.js
var scriptAnime = document.createElement('script');
scriptAnime.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
document.head.appendChild(scriptAnime);

// Espera a que anime.js se cargue antes de ejecutar el código
scriptAnime.onload = function() {
    // Coloca el código de confeti y burbujas aquí
    (function() {
        function getRandomColor() {
            var colors = ["#FF66B2", "#66CCFF", "#FFD700", "#FF8C00", "#FF1493", "#8A2BE2"];
            var idx = Math.floor(colors.length * Math.random());
            return colors[idx];
        }

        function animateIt(el, dur, delay) {
            var animateEl = el.animate(
                [
                    {
                        opacity: 0,
                        transform: "translate(-50%, -50%) scale(0)"
                    },
                    {
                        opacity: 1,
                        transform: "translate(-50%, -50%) scale(1)"
                    },
                    {
                        opacity: 0,
                        transform: "translate(-50%, -50%) scale(1.1)"
                    }
                ],
                {
                    duration: dur,
                    easing: "ease-out",
                    fill: "forwards",
                    delay: delay || 0
                }
            );

            return animateEl;
        }

        function createBubble() {
            var ns = "http://www.w3.org/2000/svg",
                bubble = document.createElement("div"),
                bubbleDummy = document.createElement("div"),
                heart = document.createElementNS(ns, "svg"),
                heartPath = document.createElementNS(ns, "path");

            heart.setAttribute("viewBox", "0 0 600 500");
            heartPath.setAttribute("d", "M300,150 C500,10 600,300 300,400 C0,300 100,10 300,150");
            bubble.classList.add("bubble");
            bubble.style.color = getRandomColor();
            bubbleDummy.classList.add("bubble-dummy");
            heart.classList.add("heart");

            heart.appendChild(heartPath);
            bubble.appendChild(bubbleDummy);
            bubble.appendChild(heart);

            document.body.appendChild(bubble);

            // Establecer el temporizador para eliminar la burbuja después de la animación
            setTimeout(function() {
                bubble.remove();
            }, 3200); // Ajusta según la duración de la animación

            return {
                setPosition: function(x, y) {
                    bubble.style.left = x + "px";
                    bubble.style.top = y + "px";
                },
                _animate: function() {
                    var animateBubble = animateIt(bubbleDummy, 1200),
                        animateHeart = animateIt(heart, 2000);

                    return {
                        bubbleDur: 1200,
                        heartDur: 2000
                    };
                }
            };
        }

        function bubbleUp() {
            var w = window.innerWidth;
            var h = window.innerHeight;

            var de = {
                pageX: Math.random() * w,
                pageY: Math.random() * h
            };

            var bubble = createBubble();

            bubble.setPosition(de.pageX, de.pageY);
            var animation = bubble._animate();
        }

        // Generar burbujas automáticamente
        setInterval(bubbleUp, 200);

        // Crea un canvas para el confeti
        var canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        var ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Configuración del confeti
        var confettiPieces = [];
        var numConfetti = 100;

        // Función para crear una pieza de confeti
        function createConfettiPiece() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: (Math.random() * 2) + 1,
                color: getRandomColor(),
                tilt: Math.floor(Math.random() * 360),
                tiltAngleIncremental: (Math.random() * 0.1) + 0.05,
                tiltAngle: 0,
                gravity: 0.1,
                velocity: {
                    x: (Math.random() * 4) - 2,
                    y: (Math.random() * 4) + 2
                }
            };
        }

        // Función para animar el confeti
        function animateConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < numConfetti; i++) {
                var confetti = confettiPieces[i];

                confetti.tiltAngle += confetti.tiltAngleIncremental;
                confetti.velocity.y += confetti.gravity;
                confetti.x += confetti.velocity.x;
                confetti.y += confetti.velocity.y;

                ctx.fillStyle = confetti.color;
                ctx.beginPath();
                ctx.lineWidth = confetti.size;
                ctx.strokeStyle = confetti.color;
                ctx.moveTo(confetti.x + (confetti.size * Math.cos(confetti.tiltAngle - 45)), confetti.y + (confetti.size * Math.sin(confetti.tiltAngle - 45)));
                ctx.lineTo(confetti.x - (confetti.size * Math.cos(confetti.tiltAngle + 45)), confetti.y + (confetti.size * Math.sin(confetti.tiltAngle + 45)));
                ctx.stroke();

                if (confetti.y >= canvas.height) {
                    confetti.y = canvas.height;
                    confetti.velocity.y = -confetti.velocity.y;
                }
            }

            requestAnimationFrame(animateConfetti);
        }

        // Inicializa el confeti
        for (var i = 0; i < numConfetti; i++) {
            confettiPieces.push(createConfettiPiece());
        }

        // Llama a la función de animación del confeti
        animateConfetti();
    })();
};


