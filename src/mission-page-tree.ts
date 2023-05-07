import AsyncTree from "./async-tree";

const jquery = require("jquery");
const axios = require("axios");
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const BASE_URL = "https://gta.fandom.com";

export default class MissionPageTree implements AsyncTree {
    private _name: string;
    private _childrenURLs: string[];

    private constructor(htmlString: string) {
        const htmlJquery = jquery(new JSDOM(htmlString).window);

        if(!MissionPageTree.isMissionPage(htmlJquery)) {
            throw new NotMissionPageError();
        }

        this._name = MissionPageTree.getNameFromJquery(htmlJquery);
        this._childrenURLs = MissionPageTree.getChildrenURLsFromJquery(htmlJquery);
    }

    get name(): string {
        return this._name;
    }

    loadChildren(): Promise<MissionPageTree[]> {
        return Promise.all(this._childrenURLs.map(MissionPageTree.fromURL))
                .then(missionPageTrees => missionPageTrees.filter(tree => tree));
    }



    static fromURL(url: string): Promise<MissionPageTree> {
        if(url[0] === "/") {
            url = BASE_URL + url;
        }

        return axios.get(url).then((response: any) => {
            try {
                return new MissionPageTree(response.data);
            } catch(e) {
                if(e instanceof NotMissionPageError) {
                    return null;
                }

                throw e;
            }
        });
    }

    private static isMissionPage(htmlJquery: Function): boolean {
        const SELECTOR = "div.pi-item > div:contains('MISSION')";
        const missionElement = htmlJquery(SELECTOR)[0];

        return missionElement && missionElement.textContent.trim() === "MISSION";
    }

    private static getNameFromJquery(htmlJquery: Function): string {
        const SELECTOR = "h2.pi-item:nth-child(2)";
        return htmlJquery(SELECTOR)[0].textContent || "";
    }

    private static getChildrenURLsFromJquery(htmlJquery: Function): string[] {
        const UNLOCKS_SELECTOR = "div.pi-item > h3:contains('Unlocks')";
        const unlocksElements = htmlJquery(UNLOCKS_SELECTOR).next();

        let childrenURLs = [];
        if(unlocksElements.length > 0) {
            childrenURLs.push(MissionPageTree.getFirstChildHref(unlocksElements[0]));
        }

        const childrenLineBreaks = unlocksElements.find("br");
        (Array.from(childrenLineBreaks)).forEach((lineBreak: Node) => {
            childrenURLs.push(MissionPageTree.getFirstChildHref(lineBreak.nextSibling));
        });

        return childrenURLs.filter(url => url);
    }

    private static getFirstChildHref(node: Node): string | null {
        while(node !== null && node.constructor.name !== "HTMLAnchorElement") {
            node = node.firstChild;
        }

        if(node) {
            return (node as HTMLAnchorElement).href;
        } else {
            return null;
        }
    }
}



class NotMissionPageError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, NotMissionPageError.prototype);
    }
}