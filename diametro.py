BRANCO = "branco"
CINZA = "cinza"
PRETO = "preto"

def bfs(G, s):
    initialState = {
        "d": float("inf"),
        "pi": None,
        "cor":BRANCO,
        "adj": []
    }
    GAux = G
    for index,vertex in enumerate(G):
        adj = vertex
        vertex = initialState
        vertex['adj'] = adj
        GAux[index] = vertex
    GAux[s]['d'] = 0
    GAux[s]['pi'] = None
    GAux[s]['cor'] = CINZA
    q = [] #Pilha Vazia
    q.append(GAux[s])
    while q != []:
        u = q.pop()
        for v in u['adj']:
            if GAux[v]['cor'] == BRANCO:
                GAux[v]['d'] = u['d'] + 1
                GAux[v]['pai'] = u #GUARDAR SOMENTE O ENDEREÇO DO PAI E NÃO O OBJETO INTEIRO
                GAux[v][cor] = CINZA
                q.append(GAux[v])
        u['cor'] = PRETO #ARRUMAR, NÃO DEVEMOS SETAR O VALOR DO u E SIM GAux[v]

    print(GAux)



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
        [u,x]
    ]
    bfs(G, 1)
    #d = bfs(G, G[1])
    #assert d[r] == 1
    #assert d[s] == 0
    #assert d[t] == 2
    #assert d[u] == 3
    #assert d[v] == 2
    #assert d[w] == 1
    #assert d[x] == 2
    #assert d[y] == 3

    
teste_bfs()