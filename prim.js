const extract_min = (Q, G) => {
    let menor = Number.POSITIVE_INFINITY
    Q.forEach( v => {
        if(G[v].chave < menor ){
            menor = v
        }
    })
    Q.splice(G[menor], 1)
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
                console.log('('+ u + ',' + v+ ')' + ' => w = ' + w[u][index])
                G[v].pi = u
                G[v].chave = w[u][index]
            }
        })
        console.log(G)
    }

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
    mst_prim(G, w, 0)
    // mst_prim(G, w, Math.round(Math.random()*(w.length - 1)))
}
test_mst_prim()