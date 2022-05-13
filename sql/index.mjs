import xlsx from 'xlsx'
import fs from 'fs'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const file = process.argv[2]

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename)



// function generateInsert()

export function readExcel() {

    console.log(__dirname)
    const workbook = xlsx.readFile(`${__dirname}/excel/${file}.xlsx`)
    const sheetNameList = workbook.SheetNames
    const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]])


    let sql = ''
    xlData.map(row => {
        sql = sql + `insert into events_guests(
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
            RA,
            unity,
            alumni
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
        "${row.RA}",
        "${file}",
        "${file.endsWith('20') || file.endsWith('21') ? 'yes':'no'}"
        );\n\n\n`
    })

    // textSql = textSql + `insert into eventos_students(RESPFIN, RESPFIN_EMAIL) values('${row.RESPFIN}, ''),`

    sql = sql
        .replaceAll('RESPFIN', 'financial')
        // .replaceAll('RESPFIN_EMAIL', 'financialEmail')
        .replaceAll('RESP_ACAD', 'academic')
        // .replaceAll('RESP_ACAD_EMAIL', 'academicEmail')
        .replaceAll('PAI', 'father')
        .replaceAll('fatherVA', 'PAIVA')
        // .replaceAll('PAI_EMAIL', 'fatherEmail')
        .replaceAll('MAE', 'mother')
        // .replaceAll('MAE_EMAIL', 'mother_email')
        .replaceAll('ALUNO', 'student')
        .replaceAll('TURMA', 'course')
        .replaceAll('_EMAIL', 'Email')
        .replaceAll('Contagem20', 'Contagem')
        .replaceAll('Contagem21', 'Contagem')




    try {
        fs.writeFileSync(`${__dirname}/sql/${file}.sql`, sql)
    } catch (err) {
        console.log(err)
    }
}
readExcel()