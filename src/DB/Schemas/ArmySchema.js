import mongoose from "mongoose"

const ArmySchema = mongoose.Schema({
    userId : {
        type: mongoose.Types.ObjectId,
        ref: "USER",
        required : true
    },
    // 홀 레벨에 따라 올라감. 최대 수니까 80마리
    monsterProdMaxCount: {
        type: Number,
        default: 0,
        required: true
    },
    // 부대에 넣지 않은 녀석들까지 총 합친 수 => 맥스 80마리
    monsterProdCurCount: {
        type: Number,
        default: 0,
        required: true
    },
    // 홀 레벨에 따라 올라감. 최대 수니까 80마리
    magicProdMaxCount: {
        type: Number,
        default: 0,
        required: true
    },
    magicProdCurCount: {
        type: Number,
        default: 0,
        required: true
    },
    // 최대 수 기반 맵
    monsterCountMap: {
        type: Map,
        of : Number,
        required: true
    },
    // 몬스터 래벨 맵
    monsterLevelMap: {
        type: Map,
        of : Number,
        required: true
    },
    magicCountMap : {
        type: Map,
        of : Number,
        required: true
    },
    magicLevelMap: {
        type: Map,
        of : Number,
        required: true
    },
    // 부대에 배치된 마법 맵
    selectMagicMap : {
        type: Map,
        of : Number,
        required: true
    },
    // 부대에 배치된 마법 수 // 절반
    selectMagicCount : {
        type: Number,
        required: true,
        default: 0
    },
    selectMonsterMap: {
        type: Map,
        of : Number,
        required: true
    },
    // 절반
    selectMonsterCount : {
        type: Number,
        required: true,
        default: 0
    }
});

const ArmyModel = mongoose.model("Army", ArmySchema);

export default ArmyModel;


