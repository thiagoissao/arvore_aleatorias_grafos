const assert = require('assert') 
const BRANCO = 'branco'
const CINZA = 'cinza'
const PRETO = 'preto'

const bfs = (G, s) => {
    let GAux = G
    GAux.forEach((vertex, i) => {
        let adj = vertex
        GAux[i] = {
            'd': Number.POSITIVE_INFINITY,
            'pi': null,
            'cor': BRANCO,
            'adj':  adj
        }
    })
    GAux[s].d = 0
    GAux[s].pi = null
    GAux[s].cor = CINZA 
    let pilha = [] //Inicialização da pilha
    pilha.push(GAux[s])
    while (pilha.length != 0) {
        let u = pilha.pop()
        u.adj.forEach( v => {
            if(GAux[v].cor === BRANCO) {
                GAux[v].d = u.d + 1
                GAux[v].pi = GAux.indexOf(u)
                GAux[v].cor = CINZA
                pilha.push(GAux[v])
            }
        }) 
        u.cor = PRETO
    }

    return GAux.map(vertex => vertex = vertex.d)
}

const teste_bfs = () => {
    let r = 0
    let s = 1
    let t = 2
    let u = 3 
    let v = 4
    let w = 5
    let x = 6
    let y = 7
    let G = [
        [s,v],
        [r,w],
        [u,w,x,y],
        [t,x,y],
        [r],
        [s,t,x],
        [w,t,u,y],
        [u,x]
    ]
    let d = bfs(G, 1)
    assert (d[r] == 1)
    assert (d[s] == 0)
    assert (d[t] == 2)
    assert (d[u] == 3)
    assert (d[v] == 2)
    assert (d[w] == 1)
    assert (d[x] == 2)
    assert (d[y] == 3)
    
}
teste_bfs()