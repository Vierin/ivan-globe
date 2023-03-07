import { Globe } from "./Globe/Globe";
class Main {
    private globe: Globe;

    constructor() {
        this.init();
    }

    private init = async () => {
        this.globe = new Globe(document.querySelector('[data-globe]'));
    }
}

const app = new Main();