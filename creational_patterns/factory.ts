// take for granted that all tokens will have this shape
interface Token {
    readonly name: string;
    readonly ticker: string;
    readonly id: string;
}

class MainNetwork {
    readonly name: string;
    readonly ticker: string;
    readonly id: string;

    static supply: number = 0;  
    owner: string;

    constructor(owner: string) {
        this.owner = owner;
        this.id = 'MN_'+Math.random().toString(36).slice(2);

        this.name = 'MainNet'
        this.ticker = 'MN';

        MainNetwork.supply++;
    }

}

const MainNetToken = new MainNetwork('0x123');
console.log("Individual token", MainNetToken);
console.log("Network with supply", MainNetwork);