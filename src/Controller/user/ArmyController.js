class ArmyController {
    static GetMyArmy = async ({UserId}) => {
        try {
            // TODO: 

            return {
                state: true,
                message : "GetMyArmy success"
            }
        } catch(e) {
            return {
                state: false,
                message: "GetMyArmy fail"
            }
        }
    }

    static GetMySelectArmy = async({UserId}) => {
        try {

            return {
                state: true,
                message : "GetMySelectArmy success"
            }
        } catch(e) {
            return {
                state: false,
                message: "GetMySelectArmy fail"
            }
        }
    }

    // 부대 만들기 => 유닛 추가
    static AddMonster = async ({UserId, Name, Type, Count}) => {
        try {

            return {
                state: true,
                message : "AddMonster success"
            }
        } catch(e) {
            return {
                state: false,
                message: "AddMonster fail"
            }
        }
    }

    // 부대 만들기 => 마법 추가
    static AddMagic = async ({UserId, Name, Type, Count}) => {
        try {

            return {
                state: true,
                message : "AddMagic success"
            }
        } catch(e) {
            return {
                state: false,
                message: "AddMagic fail"
            }
        }
    }

    static UseMonster = async ({UserId, Name, Type, Count}) => {
        try {

            return {
                state: true,
                message : "UseMonster success"
            }
        } catch(e) {
            return {
                state: false,
                message: "UseMonster fail"
            }
        }
    }
    

    static UseMagic = async ({UserId, Name, Type, Count}) => {
        try {

            return {
                state: true,
                message : "UseMagic success"
            }
        } catch(e) {
            return {
                state: false,
                message: "UseMagic fail"
            }
        }
    }
}

export default ArmyController;