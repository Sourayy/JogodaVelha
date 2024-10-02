import { useEffect, useState } from "react";
import './index.css'

function Velha() {
    const [jogadas, setJogadas] = useState([
        '', '', '',
        '', '', '',
        '', '', ''
    ]);
    const [jogadorDaVez, setJogadorDaVez] = useState('X')
    const [gameover, setGameover] = useState(false);
    const [status, setStatus] = useState('Vez do jogador X');

    useEffect(() => {
        verificaGanhador();
    }, [jogadas])

    function verificaQuadrado(q1, q2, q3) {
        const ganhou = (
            jogadas[q1] != '' &&
            jogadas[q2] != '' &&
            jogadas[q3] != '' &&
            jogadas[q1] == jogadas[q2] &&
            jogadas[q2] == jogadas[q3]

        );

        if (ganhou) {
            setStatus(`Jogador ${jogadas[q1]} GANHOU !!`)
        }

        return ganhou;
    }

    function verificaGanhador() {
        if (
            verificaQuadrado(0, 1, 2) ||
            verificaQuadrado(3, 4, 5) ||
            verificaQuadrado(6, 7, 8) ||

            verificaQuadrado(0, 3, 6) ||
            verificaQuadrado(1, 4, 7) ||
            verificaQuadrado(2, 5, 8) ||

            verificaQuadrado(0, 4, 8) ||
            verificaQuadrado(2, 4, 6)

        ) {
            setGameover(true);

        }
        else {

            const jogadasPreenchidas = jogadas.filter(x => x != '').length;
            if (jogadasPreenchidas == 9) {
                setStatus(`Deu velha!!`)
                setGameover(true);
            }
        }

    }


    function clickDoJogador(index) {
        if (jogadas[index] == '' && gameover == false) {

            let novasJogadas = [...jogadas]
            novasJogadas[index] = jogadorDaVez;
            setJogadas(novasJogadas)

            if (jogadorDaVez == 'X') {
                setJogadorDaVez('O')
                setStatus('Vez do jogador O')
            }
            else {
                setJogadorDaVez('X')
                setStatus('Vez do jogador X')
            }

        }
    }

    return (
        <>
            <h2>Jogo da velha</h2>
            <div id="game">
                {
                    jogadas.map((item, i) => (
                        <button
                            className="buttonGame"
                            onClick={() => { clickDoJogador(i) }}
                        >{item}</button>
                    ))
                }
            </div>
            <h2 id="status">{status}</h2>
        </>
    )
}
export default Velha;