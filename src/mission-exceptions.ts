interface MissionException {
    "name": string,
    "isInvalid"?: boolean,
    "childrenURLs"?: string[]
}

export const missionExceptions: MissionException[] = [
    {
        "name": "First Date",
        "childrenURLs": [
            "https://gta.fandom.com/wiki/Body_Harvest"
        ]
    },
    {
        "name": "Loco Syndicate Drug Courier",
        "isInvalid": true
    },
    {
        "name": "Big Smoke's Cash",
        "isInvalid": true
    }
];