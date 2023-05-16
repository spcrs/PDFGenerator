import PDFDocument from "pdfkit-table";
import fs from 'fs'
import fsa from "fs/promises";

import { createTable } from "./table.js";

async function read_const(){
  const data = await fsa.readFile("constant_data.json")
  return JSON.parse(data.toString())
}


async function main(header,rows) {
  const doc = new PDFDocument();

  //read constant values
  const constants =await read_const()


  doc.pipe(fs.createWriteStream("example.pdf"));
  doc.font("font_family/Arial_Bold.TTF");
  doc.fontSize(11);

  let [x,y] = [doc.x,doc.y]
  doc.page.margins.top = 0
  //header
  doc.image(constants.img, x, y, {
    width: 70,
    height: 60,
  })
  .text(
    "CENTRE FOR STUDENT AFFAIRS \nANNA UNIVERSITY\nCHENNAI - 600 025\n", x, y+10, {
      align: "center",
    }
  );

  [x,y] = [doc.x,doc.y]
 
  doc.text(`${constants.name}\n${constants.position}`, x, y + 25, {
    align: "left",
  })

  doc.font("font_family/arial.TTF");

  doc
  .text(
    `Ph :   ${constants.phone_no}\nEmail : ${constants.email1}\n${constants.email2}`,
    x, y + 20, {
      align : "right",
    }
  );

  //body
  doc.moveDown(1);

  [x,y] = [doc.x,doc.y]
  doc
    .moveTo(x, y)
    .lineTo(x + 470, y)
    .lineWidth(1)
    .stroke();

  doc.moveDown(1);

  [x,y] = [doc.x,doc.y]

  doc
    .text(`Letter No. ${header.letter_no}`, x, y, {
      align: "left",
    })
    .text(`Date : ${header.date}`, x, y, {
      align: "right",
    });

  doc
    .moveDown(1)
    .text("To\n\n");

  for(let i of header.to){
    doc
    .text(`${i}`);
  }
  doc
    .moveDown(2)
    .text("Sir / Madam,")
    .moveDown(1);
  

  [x,y] = [doc.x,doc.y]

  doc
    .text(`Sub : Anna University – Student Affairs – Transfer of students (Full Time)  – \n         ${header.sub_ug_or_pg} Degree course (2022-23) – Approval accorded – Reg.`, x, y)

  doc.moveDown(1);
  
  doc.text(`Ref  : ${header.Ref}`);
  doc.text('********',{align:'center'})

  doc.text('With reference to the above, I am to inform that the transfer approval, in respect of the following student, is accorded for the academic year 2022-2023.',{indent:30,lineGap:1})
  
  doc.addPage()
  doc.moveDown(3);
  
  await createTable(doc,rows)

  if(doc.y > 550)
    doc.addPage()
  doc.fontSize(11)
  
  doc.text("Yours faithfully\n\n\n",70,550 ,{align:'right'}); 

  doc.font("font_family/Arial_Bold.TTF");
  doc.text("\n\nDirector   \n\n\n" ,{align:'right'}); 
  doc.text("Copy to:\n\n");

  doc.font("font_family/arial.TTF");
  doc.text("1. The Controller of Examinations,\nAnna University, Chennai – 25.\n2. Stock File")
  
  doc.end();
}

let header = {
  letter_no : 'ODD/UG/UG(PT)/PG - TR,RCT/SA2-2/2022-2023',
  date : '09.09.2022',
  to : ['The Principal,','5119 - Priyadarshini Engineering college.'],   // to array
  sub_ug_or_pg : 'UG',
  Ref : 'D.T.E’s Letter No. 22100 / J4 / 2022, dated: 25.08.2022.'  // array

  //copy to array
}


let rows = [["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"],["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"],["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"],["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"],["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"],["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"],["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"],["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"],["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"],["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"],["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"],["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"],["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"],["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"],["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"],["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"],["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"],["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"],["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"],["1","V.RAJARAJESHWARI","923820105029",	"V",	"B.E (ELECTRICAL & ELECTRONICSENGINEERING)","MANGAYARKARASI COLLEGE OF ENGINEERING","PRIYADARSHINI ENGINEERING COLLEGE"]];
// sno auto

main(header,rows)


