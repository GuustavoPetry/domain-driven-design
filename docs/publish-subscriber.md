# Classe DomainEvents:

# Props
- handlersMap: Record<string, DomainEventCallback[]>
- markedAggregates: AggregateRoot<any>[]
- obs: type DomainEventCallback = (event: DomainEvent) => void

# Métodos

## markAggregateForDispatch() 
1. recebe um AggregateRoot como parâmetro
2. executa metódo que buscar o aggregate na lista markedAggregates pelo ID (transformando em Boolean)
3. se o resultado for 'false' adiciona o aggregate na lista markedAggregates

## dispatchAggregateEvents()
1. recebe AggregateRoot como parâmetro
2. percorre todos os itens da propriedade domainEvents do aggregate
3. executa a função 'dispatch' em cada item da lista

## removeAggregateFromMarkedDispatchList()
1. recebe AggregateRoot como parâmetro
2. busca o indice do item na lista markedAggregates que seja igual ao aggregate do parâmetro
3. remove o indice encontrado da lista

## findMarkedAggregateByID()
1. recebe um UniqueEntityID como parâmetro
2. busca na lista markedAggregates o aggregate que tem o mesmo ID do parâmetro

## dispatchEventsForAggregate()
1. recebe um UniqueEntityID como parâmetro
2. executa o método 'findMarkedAggregateByID' passando o ID do parâmetro
3. verifica se encontrou um aggregate
4. executa 'dispatchAggregateEvents' passando o aggregate encontrado
5. executa o método 'clearEvents' do aggregate
6. executa 'removeAggregateFromMarkedDispatchList'

## register()
1. recebe um DomainEventCallback, e um eventClassName como parâmetro
2. cria constante booleana que verifica se o eventClassName existe em 'handlersMap'
3. se a constante for falsa, atribui [] a handlerMap na chave eventClassName
4. adiciona DomainEventCallback a handlerMap na chave eventClassName

## clearHandlers()
1. atribui {} a handlersMap

## clearMarkedAggregates()
1. atribui [] a markedAggregates

## dispatch()
1. recebe DomainEvent como parâmetro
2. cria constante para guardar o nome da classe do evento do parâmetro
3. cria constante booleana que verifica se o nome da classe está em handlersMap
4. se estiver no handlersMap percorre e executa todos os callbacks de handlersMap na chave nome da classe

# Interface DomainEvent
- recebe ocurredAt, getAggregateId()
- obs: implementado nas classes que representam o evento

# Interface EventHandler
- recebe setupSubscriptions(): void
- implementado nas classes que representam o subscriber

# Funcionamento Geral
1. todos os subscribers são inicializados para escutar eventos 
2. quando ocorre alteração relevante no domínio, é chamado addDomainEvent do aggregate, que chama 'markAggregateForDispatch'
3. quando o banco de dados executa ação é chamado 'dispatchEventsForAggregate' que executa o restante das ações
