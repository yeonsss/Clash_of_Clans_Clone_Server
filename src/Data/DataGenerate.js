import fs from "node:fs";
// Result => 폴더 이름Info.js 파일 생성.

function DataGenerate() {
    const path = "./src/Data/"
    const dirNameList = ["Building", "Monster", "Stage"];
    try {
        for (const dirName of dirNameList) {
            const dir = fs.readdirSync(path + dirName);
            if (dir.length < 1) continue;

            const fileName = `${dirName}Info.js`;
            let inputData = "";

            for (const fileName of dir) {
                const fileData = fs.readFileSync(path + dirName + `\\${fileName}`);
                const data = JSON.parse(fileData);
                inputData += `${data["Name"]} : ${fileData},`
            }

            const mergeString = `const ${dirName}Info = {${inputData}}; export default ${dirName}Info;`;
            fs.writeFileSync(path + fileName, mergeString);
        }

        return true;
    }
    catch (e) {
        console.log("Data Generate Error : ", e.stack);
        return false
    }
}

DataGenerate();