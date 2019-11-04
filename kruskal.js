// const createEdges = (start, end) => {
//     let e = Array()
//     for(let i=0; i < end; i++){
//         if(i != start) e.push(i)
//     }
//     return e
// }

// const createWeights = (start, end) => {
//     let w = Array()
//     for(let i=0; i < end; i++){
//         if(i != start) w.push(Math.random())
//     }
//     return w
// }

// const randomTreeKruskal = n => {
//     let G = Object.assign({}, Array.apply(null, Array(n)))
//     Object.keys(G).forEach( i => {
//         G[i] = {
//             E: createEdges(i, n),
//             w: createWeights(i, n)
//         }
//     })
//     return G
// }

const kruskal_graph_test = () => {
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
        [b, h],       //a
        [a, c, h],      //b
        [b, d, i ,f],   //c
        [c, e, f],      //d
        [d, f],         //e
        [c, d, e, g],   //f
        [f, i, h],  //g
        [a, b, i, g],   //h
        [c, g, h],  //i
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

    mst_kruskal(G, w)
}

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
    let A = []
    console.log(G)
    Object.keys(G).forEach( v => G[v] = make_set(v, G[v]))
    console.log()
    console.log(G)
    const wTemp = Object.assign({}, w) 
    Object.keys(w).forEach( v => {
        w[v].sort((a,b) => {
            if(b < a){
                const iA = wTemp[v].indexOf(a)
                let iB = wTemp[v].indexOf(b)
                iB = iB == -1 ? iA + 1 : iB
                const aux = G[v].E[iB]
                G[v].E[iB] = G[v].E[iA]
                G[v].E[iA] = aux
            }
           return a - b
        })
    })
    console.log()
    console.log(G)
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
            A.push([arestaOrdenada[i][1], arestaOrdenada[i][2]])
            union(arestaOrdenada[i][1], arestaOrdenada[i][2], G)
        }
    }

    console.log()
    console.log(G)
    console.log("\nRetorno: (ÁRVORE)")
    console.log(A)
    return A
}

kruskal_graph_test()