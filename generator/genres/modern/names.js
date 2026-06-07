// genres/modern/names.js
// First/last name pools keyed by ethnicity broad label.
// Used by buildSkeleton to generate character and cast names.

export const NAME_POOLS = {
  'Black': {
    masc:    ['Darius','DeShawn','Marcus','Andre','Terrence','Calvin','Isaiah','Devonte','Jalen','Malik','Brandon','Curtis','Elijah','Kendrick','Trevon','Xavier','Lamar','Jamal','Quincy','Jerome'],
    fem:     ['Keisha','Simone','Tamara','Yolanda','Renee','Aaliyah','Destiny','Imani','Jasmine','Latoya','Monique','Shanice','Tiara','Ebony','Nakia','Tierra','Chantel','Alicia','Brianna','Niecy'],
    neutral: ['Jordan','Morgan','Cameron','Alexis','Reese','Taylor','Jaylen','Kendall','Teagan','Devyn'],
    last:    ['Washington','Williams','Jackson','Harris','Johnson','Robinson','Davis','Thompson','Carter','Mitchell','Brooks','Coleman','Reed','Warren','Holt','Mosley','Payne','Owens','Simmons','Grant'],
  },
  'Latino': {
    masc:    ['Carlos','Miguel','Javier','Rafael','Santiago','Diego','Alejandro','Luis','Marco','Andrés','Eduardo','Fernando','Hector','Jorge','Ricardo','Sergio','Tomás','Víctor','Emilio','Ignacio'],
    fem:     ['Carmen','Valentina','Marisol','Rosa','Lorena','Angie','Claudia','Gabriela','Isabella','Lucia','Mariela','Natalia','Paola','Sofia','Ximena','Adriana','Daniela','Elena','Gloria','Yesenia'],
    neutral: ['Alex','Jordan','Leslie','Remi','Taylor','Morgan'],
    last:    ['Reyes','Diaz','Cruz','Vega','Flores','Morales','Ortega','Ramirez','Rivera','Torres','Castillo','Delgado','Gutierrez','Herrera','Lopez','Mendez','Nunez','Perez','Sanchez','Vargas'],
  },
  'White': {
    masc:    ['Liam','Brendan','Patrick','Cole','Ethan','Connor','Ryan','Sean','Kyle','Derek','Tyler','Jason','Kevin','Brian','Scott','Evan','Nathan','Trevor','Austin','Dylan'],
    fem:     ['Dana','Cassidy','Bridget','Megan','Kira','Ashley','Lauren','Kelsey','Amber','Lindsay','Shannon','Stephanie','Brittany','Heather','Molly','Chelsea','Kayla','Nicole','Rachel','Tiffany'],
    neutral: ['Avery','Quinn','Riley','Reese','Skyler','Alex','Morgan','Cameron','Taylor','Jordan'],
    last:    ['Flynn','Walsh','Holt','Mercer','Garrett','Caldwell','Novak','Kowalski','Russo','Moran','Spencer','Barrett','Brennan','Callahan','Donovan','Murphy','Sullivan','Brady','Collins','Burke'],
  },
  'Asian': {
    masc:    ['Kevin','Jason','Brian','Daniel','Michael','James','Eric','David','Ryan','Andrew','Justin','Steven','Tony','Chris','Patrick','Raymond','Vincent','Richard','Henry','Alex'],
    fem:     ['Jessica','Michelle','Jennifer','Amy','Christine','Angela','Linda','Helen','Cindy','Grace','Lisa','Karen','Alice','Wendy','Vivian','Diana','Annie','Emily','Jenny','Melissa'],
    neutral: ['Alex','Jordan','Taylor','Casey','Cameron','Morgan','Riley','Quinn','Avery','Reese'],
    last:    ['Park','Kim','Lee','Tran','Nguyen','Patel','Shah','Chen','Wang','Liu','Zhang','Wu','Yang','Lin','Nakamura','Tanaka','Suzuki','Watanabe','Sato','Singh'],
  },
  'Middle Eastern / North African': {
    masc:    ['Omar','Hassan','Tariq','Samir','Karim','Khalid','Youssef','Amir','Nasser','Faisal','Bilal','Rami','Ziad','Walid','Tarek','Hamid','Ali','Mohamed','Sami','Adam'],
    fem:     ['Leila','Nadia','Yasmin','Fatima','Layla','Rania','Dina','Hana','Lina','Maha','Nour','Reem','Sahar','Salma','Sara','Sana','Dalia','Mariam','Rana','Zainab'],
    neutral: ['Sam','Alex','Remi','Jordan','Sasha'],
    last:    ['Hassan','Ali','Ahmed','Khalil','Mansour','Nasser','Rahman','Saleh','Ibrahim','Qureshi','Farhan','Karimi','Rostami','Aziz','Bakr','Hamad','Jaber','Saad','Osman','Haddad'],
  },
  'Indigenous / Native American': {
    masc:    ['Cody','Tyler','Nathan','Jesse','Marcus','Levi','Aaron','Raymond','Tommy','Victor','Daniel','James','Robert','Michael','Anthony','Joseph','Kevin','Brian','George','Dennis'],
    fem:     ['Crystal','Amber','Tanya','Melissa','Angela','Donna','Lisa','Tammy','Sandra','Karen','Brenda','Patricia','Barbara','Linda','Sharon','Susan','Deborah','Mary','Diane','Paula'],
    neutral: ['Jordan','Alex','Casey','Taylor','Morgan','Riley','Quinn','Avery','Jamie','River'],
    last:    ['Runningwater','Eagleheart','Whitehorse','Redcloud','Littlefeather','Greyhorse','Twofeathers','Clearwater','Swiftwind','Longbow','Nighthorse','Redwing','Sunwalker','Whitecloud','Blackbird','Yellowhorse','Coldwater','Ironwood','Swiftfoot','Redsky'],
  },
  'Multiracial': {
    masc:    ['Jordan','Marcus','Andre','Kai','Miles','Damon','Leon','Devon','Cole','Eli','Jalen','Tyler','Derek','Xavier','Brendan','Isaiah','Cameron','Devin','Tristan','Chris'],
    fem:     ['Maya','Simone','Kira','Leila','Cassidy','Renata','Soleil','Yara','Dana','Nadia','Bria','Camille','Deja','Jade','Talia','Zoe','Bianca','Serena','Nia','Lena'],
    neutral: ['Sage','River','Quinn','Avery','Jordan','Rowan','Emery','Remy','Marlowe','Lennox'],
    last:    ['Mercer','Vance','Park','Russo','Adeyemi','Caldwell','Diaz','Tran','Okafor','Nakamura','Hassan','Patel','Reed','Grant','Flynn','Osei','Shaw','Kim','Boyd','Hayes'],
  },
  'default': {
    masc:    ['Alex','Chris','Sam','Pat','Jamie','Casey','Jordan','Morgan','Logan','Blake','Charlie','Reese','Jesse','Corey','Lane','Drew','Brett','Dale','Robin','Lee'],
    fem:     ['Alex','Chris','Sam','Pat','Jamie','Casey','Jordan','Morgan','Logan','Blake','Charlie','Reese','Jesse','Corey','Lane','Drew','Brett','Dale','Robin','Lee'],
    neutral: ['Alex','Jordan','Quinn','Avery','Riley','Sage','River','Emery','Remy','Morgan'],
    last:    ['Reed','Shaw','Grant','Boyd','Hayes','Moss','Bell','Lane','Gray','Cole','West','Stone','Ford','Ross','Hunt','Ward','Wood','Price','Long','Hill'],
  },
};
