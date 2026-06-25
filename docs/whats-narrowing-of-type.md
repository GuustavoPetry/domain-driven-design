# Narrowing no TypeScript

**Narrowing** é o processo de reduzir um tipo mais genérico para um mais específico após uma verificação.

## Exemplo simples

```ts
let value: string | number = "Olá";

if (typeof value === "string") {
    // value: string
    value.toUpperCase();
}
```

Antes do `if`:

```ts
string | number
```

Dentro do `if`:

```ts
string
```

## Exemplo com classes

```ts
class Dog {
    bark() {}
}

class Cat {
    meow() {}
}

type Animal = Dog | Cat;

const animal: Animal = new Dog();

if (animal instanceof Dog) {
    // animal: Dog
    animal.bark();
}
```

## Exemplo com Type Predicate

```ts
class Rigth {
    isRigth(): this is Rigth {
        return true;
    }
}

class Left {
    isRigth(): this is Rigth {
        return false;
    }
}

type Either = Left | Rigth;

const result: Either = new Rigth();

if (result.isRigth()) {
    // result: Rigth
}
```

## O que faz `this is Rigth`?

```ts
isRigth(): this is Rigth
```

Significa:

> Se esta função retornar `true`, o TypeScript pode considerar que `this` é um `Rigth`.

O retorno real continua sendo um `boolean`; o `this is` existe apenas para permitir o narrowing.
