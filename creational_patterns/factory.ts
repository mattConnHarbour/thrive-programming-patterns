// Learning:
// ---------
// - Factory pattern
// - TypeScript type safety

// compile and run from cli:
// tsc factory.ts --lib dom,es6 && node factory.js

interface TokenConstructorParams {
    name: string;
    ticker: string;
    id: string;
    owner: string | null;
}

// all tokens will have this shape
class Token {
    readonly name: string;
    readonly ticker: string;
    readonly id: string;
    owner: string | null;

    constructor(params: TokenConstructorParams) {
        Object.assign(this, params);
    }
}

const generateId = () => Math.random().toString(36).slice(2);

// tokens often have silly names
class FoobarToken {
    static readonly tokenName: string = "Foobar";
    static readonly ticker: string = "FOO";
    static supply: number = 0;

    readonly id: string;
    owner: string | null;

    constructor(owner = null) {
        this.owner = owner;
        this.id = 'MN_'+generateId();

        FoobarToken.supply++;
    }
}

// one wallet per token
class Wallet<Token> {
    readonly id: string;
    private tokens: Array<Token> = [];

    get balance() {
        return this.tokens.length;
    }

    addToken(token) { // TODO - make this type safe
        token.owner = this.id;
        this.tokens.push(token);
    }

    constructor() {
        this.id = 'W_'+generateId();
    }
}

const myWallet = new Wallet<FoobarToken>();
// generate 3 tokens with random ids
const tokensForSale = [...Array.from({ length: 3 }, () => new FoobarToken())]
// buy all tokens
tokensForSale.forEach(token => myWallet.addToken(token));

console.log("Foobar token data:", FoobarToken);
console.log("Wallet data:", myWallet);