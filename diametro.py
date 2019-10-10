def bfs(G, s):
    for vertex in G:
        


def teste_bfs():
    r = 0
    s = 1
    t = 2
    u = 3 
    v = 4
    w = 5
    x = 6
    y = 7
    G = [
        [s,v],
        [r,w],
        [u,w,x,y],
        [t,x,y],
        [r],
        [s,t,x],
        [w,t,u,y],
        [u,x]]
    
    d = bfs(G, G[0])
    assert d[r] == 1
    assert d[s] == 0
    assert d[t] == 2
    assert d[u] == 3
    assert d[v] == 2
    assert d[w] == 1
    assert d[x] == 2
    assert d[y] == 3

teste_bfs()