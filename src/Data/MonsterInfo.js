const MonsterInfo = {
    Bat : {
        "Name" : "Bat",
        "Description" : "",
        "MoveSpeed" : 2,
        "AttackRange" : 1,
        "DetectRange" : 3,
        "AttackCooldown": 1,
        "SkillCooldown": 3,
        "SummonCapacity": 1,
        "SpawnTime": 15,
        "Levels" : [
          {
            "Level" : 1,
            "Hp" : 50,
            "Attack" : 5,
            "PrefabPath" : "Monster/Bat"
          }, {
            "Level" : 2,
            "Hp" : 70,
            "Attack" : 7,
            "PrefabPath" : "Monster/Bat"
          }, {
            "Level" : 3,
            "Hp" : 90,
            "Attack" : 9,
            "PrefabPath" : "Monster/Bat"
          }
        ]
    },
    Mage : {
        "Name" : "Mage",
        "Description" : "",
        "MoveSpeed" : 2,
        "AttackRange" : 10,
        "DetectRange" : 10,
        "AttackCooldown": 1,
        "SkillCooldown": 3,
        "SummonCapacity": 2,
        "SpawnTime": 60,
        "Levels" : [
        {
            "Level" : 1,
            "Hp" : 30,
            "Attack" : 10,
            "PrefabPath" : "Monster/Mage"
        }, {
            "Level" : 2,
            "Hp" : 40,
            "Attack" : 12,
            "PrefabPath" : "Monster/Mage"
        }, {
            "Level" : 3,
            "Hp" : 50,
            "Attack" : 15,
            "PrefabPath" : "Monster/Mage"
        }
        ]
    }
}

export default MonsterInfo;