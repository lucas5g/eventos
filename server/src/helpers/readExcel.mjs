import xlsx from 'xlsx'
import path from 'path'
import fs from 'fs'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename)

// function generateInsert()

export function readExcel() {

    // console.log(__dirname)
    const workbook = xlsx.readFile(`${__dirname}/../assets/dadosgerais_contagem.XLSX`)
    const sheetNameList = workbook.SheetNames
    const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]])

    let sql = `
    CREATE TABLE if not exists eventos_responsibles(
        id int not null primary key auto_increment,
        RESPFIN varchar(100),
        RESPFIN_EMAIL varchar(100), 
        RESP_ACAD varchar(100),
        RESP_ACAD_EMAIL varchar(100), 
        PAI varchar(100),
        PAI_EMAIL varchar(100),
        MAE varchar(100),
        MAE_EMAIL varchar(100), 
        ALUNO varchar(100), 
        ALUNO_EMAIL varchar(100),
        TURMA varchar(100),
        RA varchar(100) unique,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    `

    sql = ''
    xlData.map(row => {
        sql = sql + `insert into events_responsibles(
            RESPFIN,
            RESPFIN_EMAIL, 
            RESP_ACAD,
            RESP_ACAD_EMAIL, 
            PAI,
            PAI_EMAIL,
            MAE,
            MAE_EMAIL, 
            ALUNO, 
            ALUNO_EMAIL,
            TURMA,
            RA
        )
        values(
        "${row.RESPFIN}",
        "${row.RESPFIN_EMAIL}", 
        "${row.RESP_ACAD}",
        "${row.RESP_ACAD_EMAIL}", 
        "${row.PAI}",
        "${row.PAI_EMAIL}",
        "${row.MAE}",
        "${row.MAE_EMAIL}", 
        "${row.ALUNO}", 
        "${row.ALUNO_EMAIL}",
        "${row.TURMA}",
        "${row.RA}"
        );\n\n\n`
    })

    // textSql = textSql + `insert into eventos_students(RESPFIN, RESPFIN_EMAIL) values('${row.RESPFIN}, ''),`

    sql = sql
        .replaceAll('RESPFIN', 'financial')
        // .replaceAll('RESPFIN_EMAIL', 'financialEmail')
        .replaceAll('RESP_ACAD', 'academic')
        // .replaceAll('RESP_ACAD_EMAIL', 'academicEmail')
        .replaceAll('PAI', 'father')
        // .replaceAll('PAI_EMAIL', 'fatherEmail')
        .replaceAll('MAE', 'mother')
        // .replaceAll('MAE_EMAIL', 'mother_email')
        .replaceAll('ALUNO', 'student')
        .replaceAll('TURMA', 'course')
        .replaceAll('_EMAIL', 'Email')




    try {
        fs.writeFileSync(`${__dirname}/../assets/test.sql`, sql)
    } catch (err) {
        console.log(err)
    }
}
readExcel()

// function generateInsert(
//     RESPFIN, RESPFIN_EMAIL, RESP_ACAD, RESP_ACAD_EMAIL
// ) {
//     return
// }