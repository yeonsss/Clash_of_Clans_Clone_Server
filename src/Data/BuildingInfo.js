const BuildingInfo = {DefenceCanon : {
    "Name" : "DefenceCanon",
    "Type" : "Defence",
    "XSize" : 3,
    "YSize" : 3,
    "Description" : "",
    "AttackCooldown": 4,
    "MinDistance" : 3,
    "MaxDistance" : 12,
    "Levels" : [
        {
            "Hp" : 400,
            "Attack" : 20,
            "TownLevel" : 3,
            "UpgradeCool" : 10800,
            "UpgradeCost" : 500,
            "PrefabPath" : "Building/DefenceCanon"
        }, {
            "Hp" : 450,
            "Attack" : 25,
            "TownLevel" : 4,
            "UpgradeCool" : 21600,
            "UpgradeCost" : 25000,
            "PrefabPath" : "Building/DefenceCanon"
        }
    ]
},DefenceTower : {
    "Name" : "DefenceTower",
    "Type" : "Defence",
    "XSize" : 2,
    "YSize" : 2,
    "Description" : "",
    "AttackCooldown": 0.5,
    "MinDistance" : 0,
    "MaxDistance" : 8,
    "Levels" : [
        {
            "Hp" : 385,
            "Attack" : 5.5,
            "TownLevel" : 1,
            "UpgradeCool" : 60,
            "UpgradeCost" : 1000,
            "PrefabPath" : "Building/DefenceTower"
        }, {
            "Hp" : 420,
            "Attack" : 7.5,
            "TownLevel" : 2,
            "UpgradeCool" : 900,
            "UpgradeCost" : 2000,
            "PrefabPath" : "Building/DefenceTower"
        }, {
            "Hp" : 460,
            "Attack" : 9.5,
            "TownLevel" : 3,
            "UpgradeCool" : 2700,
            "UpgradeCost" : 5000,
            "PrefabPath" : "Building/DefenceTower"
        }, {
            "Hp" : 500,
            "Attack" : 12.5,
            "TownLevel" : 4,
            "UpgradeCool" : 10800,
            "UpgradeCost" : 20000,
            "PrefabPath" : "Building/DefenceTower"
        }
    ]
},GoldMine : {
    "Name" : "GoldMine",
    "Type" : "Resource",
    "XSize" : 3,
    "YSize" : 3,
    "Description" : "",
    "Levels" : [
        {
            "Hp" : 400,
            "TownLevel" : 1,
            "UpgradeCool" : 10,
            "UpgradeCost" : 150,
            "MinCapacity" : 6,
            "MaxCapacity" : 1000,
            "OutputPerHour" : 200,
            "PrefabPath" : "Building/GoldBuilding"
        }, {
            "Hp" : 440,
            "TownLevel" : 1,
            "UpgradeCool" : 60,
            "UpgradeCost" : 300,
            "MinCapacity" : 15,
            "MaxCapacity" : 2000,
            "OutputPerHour" : 400,
            "PrefabPath" : "Building/GoldBuilding"
        }, {
            "Hp" : 480,
            "TownLevel" : 2,
            "UpgradeCool" : 240,
            "UpgradeCost" : 700,
            "MinCapacity" : 25,
            "MaxCapacity" : 3000,
            "OutputPerHour" : 600,
            "PrefabPath" : "Building/GoldBuilding"
        }, {
            "Hp" : 520,
            "TownLevel" : 2,
            "UpgradeCool" : 600,
            "UpgradeCost" : 1400,
            "MinCapacity" : 40,
            "MaxCapacity" : 5000,
            "OutputPerHour" : 800,
            "PrefabPath" : "Building/GoldBuilding"
        }, {
            "Hp" : 560,
            "TownLevel" : 3,
            "UpgradeCool" : 2400,
            "UpgradeCost" : 3000,
            "MinCapacity" : 60,
            "MaxCapacity" : 10000,
            "OutputPerHour" : 1000,
            "PrefabPath" : "Building/GoldBuilding"
        }, {
            "Hp" : 600,
            "TownLevel" : 3,
            "UpgradeCool" : 10800,
            "UpgradeCost" : 7000,
            "MinCapacity" : 100,
            "MaxCapacity" : 20000,
            "OutputPerHour" : 1300,
            "PrefabPath" : "Building/GoldBuilding"
        }, {
            "Hp" : 640,
            "TownLevel" : 4,
            "UpgradeCool" : 21600,
            "UpgradeCost" : 14000,
            "MinCapacity" : 160,
            "MaxCapacity" : 30000,
            "OutputPerHour" : 1600,
            "PrefabPath" : "Building/GoldBuilding"
        }, {
            "Hp" : 680,
            "TownLevel" : 4,
            "UpgradeCool" : 28800,
            "UpgradeCost" : 28000,
            "MinCapacity" : 220,
            "MaxCapacity" : 50000,
            "OutputPerHour" : 1900,
            "PrefabPath" : "Building/GoldBuilding"
        }
    ]
  },Hall : {
    "Name" : "Hall",
    "Type" : "None",
    "XSize" : 5,
    "YSize" : 5,
    "Description" : "",
    "Levels" : [
        {
            "Hp" : 450,
            "Master" : 1,
            "UpgradeCool" : 0,
            "UpgradeCost" : 0,
            "PrefabPath" : "Building/Hall",
            "LvCondition" : {
                "Wall" : 25,
                "DefenceTower" : 1,
                "GoldMine" : 1
            },
            "BuildPossible" : {
                "Wall" : 25,
                "DefenceTower" : 1,
                "DefenceCanon" : 0,
                "TrainingStation" : 0,
                "GoldMine" : 2
            }
        }, {
            "Hp" : 1600,
            "Master" : 1,
            "UpgradeCool" : 10,
            "UpgradeCost" : 1000,
            "PrefabPath" : "Building/Hall",
            "LvCondition" : {
                "Wall" : 50,
                "DefenceTower" : 2,
                "GoldMine" : 2
            },
            "BuildPossible" : {
                "Wall" : 50,
                "DefenceTower" : 2,
                "DefenceCanon" : 0,
                "TrainingStation" : 0,
                "GoldMine" : 2
            }
        }, {
            "Hp" : 1850,
            "Master" : 2,
            "UpgradeCool" : 3600,
            "UpgradeCost" : 4000,
            "PrefabPath" : "Building/Hall",
            "LvCondition" : {
                "Wall" : 75,
                "DefenceTower" : 3,
                "DefenceCanon" : 1,
                "TrainingStation" : 1,
                "GoldMine" : 3
            },
            "BuildPossible" : {
                "Wall" : 75,
                "DefenceTower" : 3,
                "DefenceCanon" : 1,
                "TrainingStation" : 1,
                "GoldMine" : 3
            }
        }, {
            "Hp" : 2100,
            "Master" : 2,
            "UpgradeCool" : 10800,
            "UpgradeCost" : 25000,
            "PrefabPath" : "Building/Hall",
            "LvCondition" : {
                "Wall" : 100,
                "DefenceTower" : 4,
                "DefenceCanon" : 1,
                "TrainingStation" : 1,
                "GoldMine" : 4
            },
            "BuildPossible" : {
                "Wall" : 100,
                "DefenceTower" : 4,
                "DefenceCanon" : 1,
                "TrainingStation" : 1,
                "GoldMine" : 4
            }
        }
    ]
  },TrainingStation : {
    "Name" : "TrainingStation",
    "Type" : "Util",
    "XSize" : 2,
    "YSize" : 2,
    "Description" : "",
    "Levels" : [
        {
            "Hp" : 500,
            "TownLevel" : 3,
            "UpgradeCool" : 60,
            "UpgradeCost" : 5000,
            "PrefabPath" : "Building/Wall"
        }, {
            "Hp" : 550,
            "TownLevel" : 4,
            "UpgradeCool" : 3600,
            "UpgradeCost" : 25000,
            "PrefabPath" : "Building/Wall"
        }
      ]
},Wall : {
    "Name" : "Wall",
    "Type" : "Defence",
    "XSize" : 1,
    "YSize" : 1,
    "Description" : "",
    "Levels" : [
        {
            "Hp" : 300,
            "TownLevel" : 1,
            "UpgradeCost" : 50,
            "PrefabPath" : "Building/Wall"
        }, {
            "Hp" : 500,
            "TownLevel" : 2,
            "UpgradeCost" : 1000,
            "PrefabPath" : "Building/Wall"
        }, {
            "Hp" : 700,
            "TownLevel" : 3,
            "UpgradeCost" : 5000,
            "PrefabPath" : "Building/Wall"
        }, {
            "Hp" : 900,
            "TownLevel" : 4,
            "UpgradeCost" : 10000,
            "PrefabPath" : "Building/Wall"
        }
    ]
  },}; export default BuildingInfo;