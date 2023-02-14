const BuildingInfo = {
    GoldMine : {
        "Name" : "GoldMine",
        "XSize" : 3,
        "YSize" : 3,
        "Description" : "",
        "BuildCost" : 150,
        "BuildTime" : 60,
        "BuildType" : "Resource",
        "Levels" : [
          {
            "Level" : 1,
            "StorageCapacity" : 100,
            "Hp" : 100,
            "UpgradeCost" : 0,
            "PrefabPath" : "Building/GoldBuilding"
          }, {
            "Level" : 2,
            "StorageCapacity" : 200,
            "Hp" : 150,
            "UpgradeCost" : 100,
            "PrefabPath" : "Building/GoldBuilding"
          }, {
            "Level" : 3,
            "StorageCapacity" : 300,
            "Hp" : 200,
            "UpgradeCost" : 200,
            "PrefabPath" : "Building/GoldBuilding"
          }
        ]
    },
    DefenceTower : {
        "Name" : "DefenceTower",
        "XSize" : 2,
        "YSize" : 2,
        "Description" : "",
        "AttackCooldown": 1,
        "BuildType" : "Defence",
        "BuildCost" : 100,
        "BuildTime" : 30,
        "Levels" : [
          {
            "Level" : 1,
            "Hp" : 100,
            "Attack" : 10,
            "UpgradeCost" : 0,
            "PrefabPath" : "Building/DefenceTower"
          }, {
            "Level" : 2,
            "Hp" : 150,
            "Attack" : 10,
            "UpgradeCost" : 100,
            "PrefabPath" : "Building/DefenceTower"
          }, {
            "Level" : 3,
            "Hp" : 200,
            "Attack" : 10,
            "UpgradeCost" : 200,
            "PrefabPath" : "Building/DefenceTower"
          }
        ]
    },
    Hall : {
        "Name" : "Hall",
        "XSize" : 5,
        "YSize" : 5,
        "Description" : "",
        "BuildType" : "Utility",
        "Levels" : [
          {
            "Level" : 1,
            "Hp" : 500,
            "UpgradeCost" : 0,
            "PrefabPath" : "Building/Hall"
          }, {
            "Level" : 2,
            "Hp" : 600,
            "UpgradeCost" : 100,
            "PrefabPath" : "Building/Hall"
          }, {
            "Level" : 3,
            "Hp" : 700,
            "UpgradeCost" : 200,
            "PrefabPath" : "Building/Hall"
          }
        ]
    },
    Wall : {
        "Name" : "Wall",
        "XSize" : 1,
        "YSize" : 1,
        "Description" : "",
        "BuildType" : "Wall",
        "BuildCost" : 50,
        "BuildTime" : 10,
        "Levels" : [
          {
            "Level" : 1,
            "Hp" : 100,
            "UpgradeCost" : 0,
            "PrefabPath" : "Building/Wall"
          }, {
            "Level" : 2,
            "Hp" : 150,
            "UpgradeCost" : 20,
            "PrefabPath" : "Building/Wall"
          }, {
            "Level" : 3,
            "Hp" : 200,
            "UpgradeCost" : 40,
            "PrefabPath" : "Building/Wall"
          }
        ]
    }
}

export default BuildingInfo;