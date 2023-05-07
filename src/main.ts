import DigraphBuilder from "./digraph-builder";
import Digraph from "./digraph";
import MissionPageTree from "./mission-page-tree";

const fs = require("fs");

const FIRST_MISSION_URL = "https://gta.fandom.com/wiki/Big_Smoke_(mission)";
const DOT_FILE_NAME = "sa-missions.dot";

MissionPageTree.fromURL(FIRST_MISSION_URL).then(missionPageTree => {
    new DigraphBuilder()
        .setEmptyDigraph(new Digraph())
        .setTree(missionPageTree)
        .build()
        .then(digraph => {
            fs.writeFileSync(DOT_FILE_NAME, digraph.generateDotString());
        });
});