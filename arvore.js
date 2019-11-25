const assert = require('assert') 
const BRANCO = 'branco'
const CINZA = 'cinza'
const PRETO = 'preto'
const NUMBER_TESTS = [250, 500, 750, 1000, 1250, 1500, 1750, 2000]

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

//AQUI COMECA PRIM
const extract_min = (Q, key, visit) => {
    let aux = key
    // console.log(key)
    let i = 0
    let menor = Number.POSITIVE_INFINITY
    // console. log(aux)
    while(i < aux.length){
        Q.forEach( (v, i) => {
            if(key[v] < menor ){
                menor = v
            }
        })
        let onde = menor
        // console.log(onde)
        if(visit[onde] == -1){
            return onde
        }
        i++
        aux[onde] = Number.POSITIVE_INFINITY
    }
}

const mst_prim = (G, w, r) => {
    let key = [], parent = [], visit = []
    Object.keys(G).forEach(u => {
        G[u] = {
            adj: G[u],
        //     chave: Number.POSITIVE_INFINITY,
        //     pi: null,
        //     pertenceQ: true
        }   
        key[u] = Number.POSITIVE_INFINITY
        parent[u] = -1
        visit[u] = -1
    })
    key[r] = 0
    // G[r].chave = 0
    let Q = Object.keys(G)
    let A = []
    for(let i = 0; i<G.length; i++) A[i] = []
    while(Q.length != 0){
        const u = extract_min(Q, key, visit)
        Q.splice(Q.indexOf(u), 1)
        visit[u] = 0
        console.log(parent[u])
        if(parent[u] != -1){
            A[parent[u]].push(Number(u))
            A[u].push(parent[u])
        }
        G[u].adj.forEach((v) => {
            if(visit[v] == -1 && w[u][v] < key[v]){
                parent[v] = u
                key[v] = w[u][v]
            }
        })
    }
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


const teste_mst_prim = () => {
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
    const t = mst_prim(G, w, Math.round(Math.random()*(w.length - 1)))
    assert(t[0].includes(1) || (t[0].includes(1) && t[0].includes(0)))
    assert((t[1].includes(2) && t[1].includes(0)) || t[1].includes(0))
    assert((t[2].includes(1) && t[2].includes(3) && t[2].includes(5) && t[2].includes(8)) || (t[2].includes(3) && t[2].includes(8)))
    assert(t[3].includes(2) && t[3].includes(4))
    assert(t[4].includes(3))
    assert(t[5].includes(6) || (t[5].includes(2) && t[5].includes(6)))
    assert((t[6].includes(5) && t[6].includes(7) && t[6].includes(8)) || (t[6].includes(5) && t[6].includes(7)))
    assert((t[7].includes(0) && t[7].includes(6)) || t[7].includes(6))
    assert((t[3].includes(2) && t[7].includes(6)) || t[3].includes(2))
}


// AQUI COMECA O KRUSKAL
const make_set = (v, adj) => {
    return {
        E: adj,
        rank: 0,
        p: v
    }
}

const union = (x, y, G) => {
    link(find_set(G, x), find_set(G, y), G)
}

const find_set = (G,v) => {
    if(v != G[v].p) G[v].p = find_set(G, G[v].p)
    return G[v].p
}

const link = (x, y, G) => {
    if(G[x].rank  > G[y].rank){
        G[y].p = x
    } else{
        G[x].p = y
        if(G[x].rank == G[y].rank){
            G[y].rank += 1
        }
    }
}

const mst_kruskal = (G, w) => {
    let A = Array(G.length)
    for(let i = 0; i<G.length; i++){
        A[i] = []
    }
    Object.keys(G).forEach( v => G[v] = make_set(v, G[v]))
    let arestaOrdenada = []
    Object.keys(G).forEach(u => {
        G[u].E.forEach(v => {
            u = parseInt(u)
            if(u > v){
                arestaOrdenada.push([w[u][G[u].E.indexOf(v)], u, v])
            }
        })
    })
    arestaOrdenada.sort((a,b) => {
        return a[0] - b[0]
    })
    for(let i = 0; i < arestaOrdenada.length; i ++){
        if(find_set(G, arestaOrdenada[i][1]) != find_set(G, arestaOrdenada[i][2])){
            A[[arestaOrdenada[i][1]]].push(arestaOrdenada[i][2])
            A[[arestaOrdenada[i][2]]].push(arestaOrdenada[i][1])
            union(arestaOrdenada[i][1], arestaOrdenada[i][2], G)
        }
    }
    return A
}

const teste_mst_kruskal = () => {
    
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
    const A = mst_kruskal(G, w)                     
        assert (A[0][0] == 1)
        assert (A[1][0] == 0)
        assert (A[1][1] == 2)
        assert (A[2][0] == 8)
        assert (A[2][1] == 5)
        assert (A[2][2] == 3)
        assert (A[2][3] == 1)
        assert (A[3][0] == 2)
        assert (A[3][1] == 4)
        assert (A[4][0] == 3)
        assert (A[5][0] == 6)
        assert (A[5][1] == 2)
        assert (A[6][0] == 7)
        assert (A[6][1] == 5)
        assert (A[7][0] == 6)
        assert (A[8][0] == 2)      
}

const random_tree_kruskal = n => {
    const G = Array(n).fill(null)
    G.forEach((element,i) => G[i] = createEdges(i, n))

    const w = Array(n).fill(null)
    w.forEach((element, i) => w[i] = createWeights(n))

    return mst_kruskal(G, w)
}

const teste_arvore = randomTree => {
    const n = NUMBER_TESTS
    n.forEach(number => {
        let soma_diametro = 0
        for(let i=0; i<500; i++) {
            let G = randomTree(number)
            assert(eh_arvore(G))
            soma_diametro = soma_diametro + diametro(G)
        }
        let media = soma_diametro/500
        console.log(number + ' ' + media)
    })
}
/* TESTES */

// teste_arvore(random_tree_prim)
// teste_arvore(random_tree_kruskal)
// teste_arvore(random_tree_random_walk)

// teste_bfs()
// teste_diametro()
// teste_aresta()
// teste_mst_kruskal()
teste_mst_prim()