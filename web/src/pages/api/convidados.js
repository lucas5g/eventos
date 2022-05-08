import sequelize, { Op } from 'sequelize'
import { auth } from '../../middleware/auth'

import { Student } from '../../model/Student'


/**
 * Order students by parents 
 */

export default async function guests(req, res) {


    auth(req, res)

    const { search } = req.query

    /**
     * : SELECT `mother`, `father`, `email_mother`, `email_father`, CONCAT('[', GROUP_CONCAT(JSON_OBJECT('ra', `ra`, 'name', `name`, 'course', `course`, 'email', `email`)), ']') AS `students` FROM `students` AS `students` WHERE (`students`.`name` LIKE '%%' OR `students`.`father` LIKE '%%' OR `students`.`mother` LIKE '%%') GROUP BY `mother` ORDER BY `students`.`mother` ASC, `students`.`course` ASC LIMIT 15;

     */



}