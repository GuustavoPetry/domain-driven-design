# Classes Left & Rigth

1. propriedade 'value' do tipo genérico passado
2. construtor recebe um valor e atribui a prop 'value'
3. métodos isRigth() & isLeft() que retornam true ou false

# Type Either<L, R>
1. pode receber valores de Left ou Rigth

# Constantes left e rigth
1. função que recebe tipos genéricos, recebe parametro do tipo genérico, e devolve Either
2. retorna instancia de Left ou Rigth

# Classe doSomething para testes
1. recebe parametro boolean e devolve Either<>
2. if parametro for true devolve rigth, se não left
3. criar testes 'success' e 'error'

# Utilização
1. os responses dos services são types que recebem Either<>
2. primeiro tipo genérico representa erro (Left)
3. segunda tipo genérico representa sucess (Rigth) 
4. durante execução da service se erro, retornar -> left(new instancia do erro)
5. durante execução da service se success, retornar -> rigth(objeto de retorno)
