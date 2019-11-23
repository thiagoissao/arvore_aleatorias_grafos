const assert = require('assert') 
const BRANCO = 'branco'
const CINZA = 'cinza'
const PRETO = 'preto'

const r = 0
const s = 1
const t = 2
const u = 3 
const v = 4
const w = 5
const x = 6
const y = 7

const a = 0
const b = 1
const c = 2
const d = 3
const e = 4
const f = 5
const g = 6
const h = 7
const i = 8
const j = 9

const diametro = (G) => {
    const s = Math.round(Math.random() * (G.length - 1))
    const a = bfs(G, s).indexOf(bfs(G,s).reduce((number1, number2) => Math.max(number1, number2)))
    const b = bfs(G,a).reduce((number1, number2) => Math.max(number1, number2))
    return b
}

const teste_diametro = () => {
    const G = [
        [b,c],                     //       a
        [a],                       //     /   \  
        [a]                        //   b      c
    ]
    const G2 = [
        [a]                        //       a
    ]
    const G3 = [
        [b,c],                      //          a
        [a,e,d],                    //         /  \
        [a,f],                      //        b    c
        [b],                        //       / \     \
        [b],                        //      e   d     f
        [c,g],                      //                 \ 
        [f],                        //                  g
    ]                                           
    const G4 = [                           //            a
        [b,g],                             //           / \
        [a,c,d],                           //          b   g
        [b,e],                             //         / \   \
        [b,f],                             //        c   d   h
        [c],                               //       /      \   \
        [d],                                //      e        f   i
        [a,h],                              //                    \
        [g,i],                              //                     j
        [h,j],
        [i]
    ]
    const dis = diametro(G)
    const dis2 = diametro(G2)
    const dis3 = diametro(G3)
    const dis4 = diametro(G4)

    assert (dis == 2)
    assert (dis2 == 0)
    assert (dis3 == 5)
    assert (dis4 == 7)
}


const bfs = (G, s) => {
    let GAux = Object.assign({}, G)
    Object.keys(GAux).forEach( index => {
        let adj = G[index]
        GAux[index] = {
            'd': Number.POSITIVE_INFINITY,
            'pi': null,
            'cor': BRANCO,
            'adj':  adj
        }
    })
    GAux[s].d = 0
    GAux[s].pi = null
    GAux[s].cor = CINZA
    let fila = [] //Inicialização da fila
    fila.push(GAux[s])
    indexU = 0
    while (indexU != G.length) {
        let u = fila[indexU]
        indexU++
        u.adj.forEach( v => {
            if(GAux[v].cor === BRANCO) {
                GAux[v].d = u.d + 1
                GAux[v].pi = G.indexOf(u.adj)
                GAux[v].cor = CINZA
                fila.push(GAux[v])
            }
        }) 
        u.cor = PRETO
    }
    return Object.keys(GAux).map(index => GAux[index].d)
}

const teste_bfs = () => {
    const G = [
        [s,v],                
        [r,w],
        [u,w,x,y],
        [t,x,y],
        [r],
        [s,t,x],
        [w,t,u,y],
        [u,x]
    ]
    const G2 = [
        [s,v],                  //      r
        [r,t,u],                //     / \
        [w,s],                  //    v   s
        [s],                    //       / \
        [r],                    //      t   u
        [t]                     //     /
    ]                           //    w
    let d = bfs(G, 1)
    let d1 = bfs(G2, 0)

    assert (d[r] == 1)
    assert (d[s] == 0)
    assert (d[t] == 2)
    assert (d[u] == 3)
    assert (d[v] == 2)
    assert (d[w] == 1)
    assert (d[x] == 2)
    assert (d[y] == 3)
    
    assert(d1[r] == 0)
    assert(d1[s] == 1)
    assert(d1[t] == 2)
    assert(d1[u] == 2)
    assert(d1[v] == 1)
    assert(d1[w] == 3)

}

const numero_arestas = (G) => {
    let contador = 0;
    if(G.length > 1)
        for(let i = 0; i < G.length; i ++){
            for(let j = 0; j < G[i].length; j ++){
                if(G[i][j] <= i)
                    contador++;
            }
        }
    return contador;
}

const teste_aresta = () => {
    const G4 = [
        [b,c],                     //       a
        [a],                       //     /   \  
        [a]                        //   b      c
    ]
    const G = [
        [a]
    ]
    const G2 = [
        [s,v],                  //      r
        [r,t,u],                //     / \
        [w,s],                  //    v   s
        [s],                    //       / \
        [r],                    //      t   u
        [t]                     //     /
    ]                           //    w
    const G3 = [
        [b,c],                      //          a
        [a,e,d],                    //         /  \
        [a,f],                      //        b    c
        [b],                        //       / \     \
        [b],                        //      e   d     f
        [c,g],                      //                 \ 
        [f],                        //                  g
    ]                                           
    const are1 = numero_arestas(G)
    const are2 = numero_arestas(G2)
    const are3 = numero_arestas(G3)
    const are4 = numero_arestas(G4)
    assert(are1 == 0)
    assert(are2 == 5)
    assert(are3 == 6)
    assert(are4 == 2)
}

const random_tree_random_walk = n => {
    let GAux = Object.assign({}, Array.apply(null, Array(n)))
    Object.keys(GAux).forEach((index) => {
        GAux[index] = {visitado: false, adj:Array()}
    })
    let u = Math.round(Math.random() * (n - 1))
    GAux[u].visitado = true
    let arestas = 0
    while( arestas < n - 1){
        let v = Math.round(Math.random() * (n -1))
        if(!GAux[v].visitado){
            GAux[v].adj.push(u)
            GAux[u].adj.push(v)
            GAux[v].visitado = true
            arestas++
        }
        u = v
    }
    return Object.keys(GAux).map(index => GAux[index].adj)
}

const eh_arvore = G => {
    const arestas = numero_arestas(G)
    if(arestas != (G.length - 1)){
        return false
    }
    const aux = bfs(G, 0)
    for(let i = 0; i < G.length; i ++){
        if(aux[i] === Number.POSITIVE_INFINITY)
            return false
    }
    return true
}

const teste_arvore = () => {
    const n = [250, 500, 750, 1000, 1250, 1500, 1750, 2000]
    n.forEach(number => {
        let soma_diametro = 0
        for(let i=0; i<500; i++) {
            let G = random_tree_random_walk(number)
            assert(eh_arvore(G))
            soma_diametro = soma_diametro + diametro(G)
        }
        let media = soma_diametro/500
        console.log(number + ' ' + media)
    })
}

const teste_arvore_prim = () => {
    const n = [250, 500, 750, 1000, 1250, 1500, 1750, 2000]
    n.forEach(number => {
        let soma_diametro = 0
        for(let i=0; i<500; i++) {
            let G = random_tree_prim(number)
            assert(eh_arvore(G))
            soma_diametro = soma_diametro + diametro(G)
        }
        let media = soma_diametro/500
        console.log(number + ' ' + media)
    })
}



//AQUI COMECA PRIM
//-----------------------
//-----------------------
//-----------------------
//-----------------------
//-----------------------

const extract_min = (Q, G) => {
    let menor = Number.POSITIVE_INFINITY
    let index = -1
    Q.forEach( (v, i) => {
        if(G[v].chave < menor ){
            menor = v
            index = i
        }
    })
    Q.splice(index, 1)
    return menor
}

const belongsTo = (v, Q) => {
    for(let i=0; i<Q.length; i++)
        if(Q[i] == v) return true
    return false
}

const mst_prim = (G, w, r) => {
    Object.keys(G).forEach(u => {
        G[u] = {
            adj: G[u],
            chave: Number.POSITIVE_INFINITY,
            pi: null
        }
    })
    G[r].chave = 0
    let Q = Object.keys(G)
    while(Q.length != 0){
        const u = extract_min(Q, G)
        G[u].adj.forEach((v, index) => {
            if(belongsTo(v, Q) && w[u][index] < G[v].chave){
                G[v].pi = u
                G[v].chave = w[u][index]
            }
        })
    }
    let A = []
    for(let i = 0; i<G.length; i++) A[i] = []
    G.map( (v, index) => {
        if(v.pi != null){
            A[v.pi].push(index) 
            A[index].push(Number(v.pi))
        }
    })
    return A
}

const createEdges = (current, n) => {
    let e = Array()
    for(let i=0; i < n; i++)
        if(i != current) e.push(i)
    return e
}

const createWeights = (end) => {
    let w = Array()
    for(let i=0; i < end - 1; i++) 
        w.push(Math.random())
    return w
}

const random_tree_prim = n => {
    const G = Array(n).fill(null)
    G.forEach((element,i) => G[i] = createEdges(i, n))
    const w = Array(n).fill(null)
    w.forEach((element, i) => w[i] = createWeights(n))
    let u = Math.round(Math.random() * (n - 1))
    return mst_prim(G, w, u)
}


const test_mst_prim = () => {
    const a = 0
    const b = 1
    const c = 2
    const d = 3
    const e = 4
    const f = 5
    const g = 6
    const h = 7
    const i = 8
    
    const G = [
        [b, h],         //a
        [a, c, h],      //b
        [b, d, i ,f],   //c
        [c, e, f],      //d
        [d, f],         //e
        [c, d, e, g],   //f
        [f, i, h],      //g
        [a, b, i, g],   //h
        [c, g, h],      //i
    ]

    const w = [
        [4, 8],
        [4, 8, 11],
        [8, 7, 2, 4],
        [7, 9, 14],
        [9, 10],
        [4, 14, 10, 2],
        [2, 6, 1],
        [8, 11, 7, 1],
        [2, 6, 7]
    ]
    // console.log(mst_prim(G, w, 0))
    console.log(mst_prim(G, w, Math.round(Math.random()*(w.length - 1))))
}





// teste_bfs()
// teste_diametro()
// teste_aresta()
// test_mst_prim()
teste_arvore_prim()