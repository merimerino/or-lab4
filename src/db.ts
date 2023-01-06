import { json } from "body-parser";

const { Pool } = require("pg");
const dotenv = require("dotenv");
var fs = require("fs");
const { writeToPath } = require("@fast-csv/format");
dotenv.config();

export const connectDb = async () => {
  try {
    const pool = new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    });

    const client = await pool.connect();
    let owners = (await pool.query("SELECT * FROM owner")).rows;
    let horses = (await pool.query("SELECT * FROM horse")).rows;
    //console.log(horses);
    let for_csv = (
      await client.query(
        "SELECT horse.*, owner.owner_name as owner_name, owner.owner_surname as owner_surname FROM horse JOIN owner ON owner.id_owner = horse.id_owner"
      )
    ).rows;
    //console.log("printam ovo bitno", for_csv);

    for (let i = 0; i < horses.length; i++) {
      for (let j = 0; j < owners.length; j++) {
        if (horses[i].id_owner == owners[j].id_owner) {
          horses[i].owner = {
            owner_name: owners[j].owner_name,
            owner_surname: owners[j].owner_surname,
          };
        }
      }
      delete horses[i].id_owner;
    }

    var jsonH = JSON.stringify(horses, null, 2);

    fs.writeFile("src/static/data/horses.json", jsonH, function () {});

    writeToPath("src/static/data/horses.csv", for_csv, {
      headers: true,
    });
    client.release();
    await pool.end();
    return jsonH;
  } catch (error) {
    console.log(error);
  }
};
