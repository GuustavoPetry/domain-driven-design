# Classe AggregateRoot
1. inicialmente uma classe abstrata vazia (será utilizado com domainEvents)

# WatchedList
1. consiste em uma classe abstrata que contém como props 4 arrays (currentItems, initial, new, removed)
2. tem como objetivo fornecedor ao repositório de uma só vez todas as operações que precisam ser feitas no banco de dados

# Explicando as propriedades e métodos

## initial: T[]
1.  itens iniciais quando se cria uma instância de WatchedList (fixos)

## currentItems: T[]
1. representa o array atualizado, quando se cria a instância de WatcheList é igual a prop -> initial: T[]

## new: T[]
1. representa os itens que precisam ser inseridos no banco

## removed: T[]
1. representa os itens que precisam ser deletados do banco

## abstract compareItems(a: T, b: T): boolean
1. função abstrata utilizada para comparação de igualdade, recebe dois paramêtros do mesmo tipo e devolvem um booleano

## public getItems(): T[]
1. retorna currentItems (lista atualizada)

## public getNewItems(): T[]
1. retorna a lista 'new' (itens novos)

## public getRemovedItems(): T[]
1. retorna a lista 'removed' (itens para remoção)

## private isCurrentItem(item: T): boolean
1. função que recebe um objeto, e verifica se está na lista 'currentItems'

## private isNewItem(item: T): boolean
1. função que recebe um objeto, e verifica se está na lista 'new'

## private isRemovedItem(item: T): boolean
1. função que recebe um objeto, e verifica se está na lista 'removed'

## private removeFromNew(item: T): void
1. função que recebe um objeto, e remove ele da lista 'new'

## private removeFromCurrent(item: T): void
1. função que recebe um objeto, e remove ele da lista 'currentItems'

## private removeFromRemoved(item: T): void
1. função que recebe um objeto, e remove ele da lista 'currentItems'

## private wasAddedInitially(item: T): boolean
1. função que recebe um objeto, e verifica se foi adicionado na criação da instância WatchedList

## public exists(item: T): boolean
1. função que recebe um objeto, e chama isCurrentItem()

## public add(item: T): void
1. recebe o objeto a ser adicionado como paramêtro
2. se o objeto estiver na lista 'removed' -> chama método que remove dos removidos 😅
3. se o objeto não estiver na lista 'new' e 'não for um item initial' -> adiciona o objeto na lista 'new'
4. se o objeto não estiver na lista 'currentItems' -> adiciona o objeto na lista 'currentItems'

## public remove(item: T): void
1. remove o item da lista 'currentItems'
2. se estiver na lista 'new' -> remover da lista 'new' e retornar
3. se não estiver na lista 'removed' -> adicionar na lista 'removed'

## public update(items: T): void
1. recebe um array de objetos como parâmetro
2. define constante (newItems) que filtra todos os elementos do parâmetro que não estão na lista currentItems() e atribui como valor
3. define constante (removedItems) que filtra todos os elementos da propriedade currentItems que não foram passados no parâmetro
4. atribui o array do parâmetro como valor da propriedade -> currentItems
5. atribui a constante 'newItems' como valor da propriedade -> new
6. atribui a contantes 'removedItems' como valor da propriedade -> removed

# Funcionamento Geral (utilização)
1. o agregado principal estende AggregateRoot
2. as propriedades lista observada do agregado tem como tipo uma classe que estende WatchedList passando como tipo genérico a classe que representa o agregado
3. na classe que estende WatchedList deve ser implementado a função abstrata compareItems(a: T, b: T)

## Service
4. definir constante com uma instância de entidade aggregateRoot, inicialmente sem a lista agregada
5. definir uma constante atribuindo como valor uma lista com instâncias dos itens da lista agregada passado como parâmetro no service
6. definir valor da propriedade agregada na constante que contém aggregateRoot -> como uma instância da classe que estende WatchedList passando como parâmetro a constante que contém as instâncias da lista agregada

## Repositórios
1. deve-se criar um repositório para persistir os objetos da lista agregada
2. porém, todas as operações no repositório da lista agregada devem ser executadas a partir do repositório do agregado raiz