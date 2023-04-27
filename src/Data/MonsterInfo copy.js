const MonsterInfo = {

  Skeleton: {
    "Name": "Skeleton",
    "Description": "",
    "MoveSpeed": 2,
    "AttackRange": 1,
    "DetectRange": 3,
    "AttackCooldown": 1,
    "SkillCooldown": 3,
    "SummonCapacity": 1,
    "SpawnTime": 15,
    "Levels": [
      {
        "Level": 1,
        "Hp": 50,
        "Attack": 5,
        "LevelUpCost": 0,
        "PrefabPath": "Monster/Skeleton"
      }, {
        "Level": 2,
        "Hp": 70,
        "Attack": 7,
        "LevelUpCost": 100,
        "PrefabPath": "Monster/Skeleton"
      }, {
        "Level": 3,
        "Hp": 90,
        "Attack": 9,
        "LevelUpCost": 200,
        "PrefabPath": "Monster/Skeleton"
      }
    ]
  },
  Bat: {
    "Name": "Bat",
    "Description": "",
    "MoveSpeed": 2,
    "AttackRange": 1,
    "DetectRange": 3,
    "AttackCooldown": 1,
    "SkillCooldown": 3,
    "SummonCapacity": 1,
    "SpawnTime": 15,
    "Levels": [
      {
        "Level": 1,
        "Hp": 20,
        "Attack": 2,
        "LevelUpCost": 0,
        "PrefabPath": "Monster/Bat"
      }, {
        "Level": 2,
        "Hp": 30,
        "Attack": 3,
        "LevelUpCost": 100,
        "PrefabPath": "Monster/Bat"
      }, {
        "Level": 3,
        "Hp": 40,
        "Attack": 4,
        "LevelUpCost": 200,
        "PrefabPath": "Monster/Bat"
      }
    ]
  },
  BlackKnight: {
    "Name": "BlackKnight",
    "Description": "",
    "MoveSpeed": 2,
    "AttackRange": 1,
    "DetectRange": 3,
    "AttackCooldown": 1,
    "SkillCooldown": 3,
    "SummonCapacity": 4,
    "SpawnTime": 15,
    "Levels": [
      {
        "Level": 1,
        "Hp": 250,
        "Attack": 2,
        "LevelUpCost": 0,
        "PrefabPath": "Monster/BlackKnight"
      }, {
        "Level": 2,
        "Hp": 350,
        "Attack": 3,
        "LevelUpCost": 100,
        "PrefabPath": "Monster/BlackKnight"
      }, {
        "Level": 3,
        "Hp": 450,
        "Attack": 4,
        "LevelUpCost": 200,
        "PrefabPath": "Monster/BlackKnight"
      }
    ]
  },

  Warewolf: {
    "Name": "Werewolf",
    "Description": "",
    "MoveSpeed": 2,
    "AttackRange": 1,
    "DetectRange": 3,
    "AttackCooldown": 1,
    "SkillCooldown": 3,
    "SummonCapacity": 3,
    "SpawnTime": 15,
    "Levels": [
      {
        "Level": 1,
        "Hp": 50,
        "Attack": 5,
        "LevelUpCost": 0,
        "PrefabPath": "Monster/Werewolf"
      }, {
        "Level": 2,
        "Hp": 70,
        "Attack": 7,
        "LevelUpCost": 100,
        "PrefabPath": "Monster/Werewolf"
      }, {
        "Level": 3,
        "Hp": 90,
        "Attack": 9,
        "LevelUpCost": 200,
        "PrefabPath": "Monster/Werewolf"
      }
    ]
  },

  Mage: {
    "Name": "Mage",
    "Description": "",
    "MoveSpeed": 2,
    "AttackRange": 10,
    "DetectRange": 10,
    "AttackCooldown": 1,
    "SkillCooldown": 3,
    "SummonCapacity": 2,
    "SpawnTime": 20,
    "Levels": [
      {
        "Level": 1,
        "Hp": 30,
        "Attack": 10,
        "LevelUpCost": 0,
        "PrefabPath": "Monster/Mage"
      }, {
        "Level": 2,
        "Hp": 40,
        "Attack": 12,
        "LevelUpCost": 150,
        "PrefabPath": "Monster/Mage"
      }, {
        "Level": 3,
        "Hp": 50,
        "Attack": 15,
        "LevelUpCost": 300,
        "PrefabPath": "Monster/Mage"
      }
    ]
  }
}

export default MonsterInfo;