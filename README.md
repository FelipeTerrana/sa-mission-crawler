# GTA San Andreas: Mission sequence crawler


## Overview

This is a Typescript/Node based tool built to visualize connections between the main story missions in GTA San Andreas. This way, it's possible to easily view which missions are unlocked by a specific mission, and also which ones need to be completed in order to unlock another.

The final result should look like this:

![](https://raw.githubusercontent.com/FelipeTerrana/sa-mission-crawler/main/sa-missions.svg)

Even though it's been developed and tested with San Andreas missions in mind, this crawler can also be used (given some minor tweaks) in other GTA games since the page structures don't change too much. The code is also easily adaptable to support games from other franchises, but that could require some more work.


## How it works

This tool uses the mission data available in the [GTA Wiki](https://gta.fandom.com/wiki/Main_Page). Starting by the first mission page ([Big Smoke](https://gta.fandom.com/wiki/Big_Smoke_(mission))), it visits all mission pages listed in the "Unlocks" section. This process goes on recursively for every visited mission until it runs out of pages, storing every relationship between them in a graph.

When the crawler finishes running, the relationship graph is written in a [DOT](https://graphviz.org/doc/info/lang.html) file. Using its contents it's possible to use the [Graphviz dot](https://graphviz.org/docs/layouts/dot/) tool, locally or with an online converter, to generate an image for the graph.


## Building and executing

With [Node.js](https://nodejs.org/) installed, simply run in the project root directory to install dependencies:

```sh
npm i
```

Then, to build the relationship graph:

```sh
npx ts-node src/main.ts
```

When finished, the file `sa-missions.dot` will contain the text for the relationship graph. To generate the image, you can use any online Graphviz tool or run dot on your machine.


## Improvement ideas

- Directly generate the picture as an output, instead of building only the DOT file
- Support other GTA games
    - The first mission page in `main.ts` and some minor changes to the jQuery selectors in `mission-page-tree.ts` should be enough. When executed for GTA V, for example, the crawler stops on the first heist due to some differences between heist and mission pages
- Support other game franchises
    - All or most of the selectors in `mission-page-tree.ts` would need to be rewritten, but if the game mission structure is similar to GTA in a tree-like manner, the rest of the code should still keep working
