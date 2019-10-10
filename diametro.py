# -*- coding: utf-8 -*-
BRANCO = "branco"
CINZA = "cinza"
PRETO = "preto"

def bfs(G, s):
    initialState = {
        'd': float("inf"),
        'pi': None,
        'cor':BRANCO,
        'adj': None
    }
    GAux = G
    for index,vertex in enumerate(G):
        adj = vertex
        print(adj)
        GAux[index] = initialState
        GAux[index]['adj'] = adj
    GAux[s]['d'] = 0
    GAux[s]['pi'] = None
    GAux[s]['cor'] = CINZA
    ############## TÁ COLOCANDO O ÚLTIMO VALOR DE G EM TODOS OS ELEMENTOS DE GAUX E EU NÃO SEI PQ TNC
    print(GAux[0])
    print(GAux[1])
    print(GAux[2])
    print(GAux[3])
    print(GAux[4])
    print(GAux[5])
    print(GAux[6])
    print(GAux[7])
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