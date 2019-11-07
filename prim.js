const mst_prim = (G, w, r) => {
    Object.keys(G).forEach(u => {
        console.log(u)
        G[u] = {
            adj: u,
            chave: Number.POSITIVE_INFINITY,
            pi: null
        }
    })
    console.log(G)
    r.chave = 0
    let Q = Object.keys(G)
    console.log(Q)
    
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
    mst_prim(G, w, Math.round(Math.random()*w.length))
}
test_mst_prim()