
const db = require("../conn/conn");

exports.inventory = async(req,res) => {
    console.log(req.body);
    db.changeUser({ database: "gohoardi_goh" });
    (code = req.body.code),
      (city = req.body.city),
      (location = req.body.location),
      (category = req.body.category),
      (subcategory = req.body.subcategory),
      (illumination = req.body.illumination),
      (company = req.body.company);
    var table_name = "";
      let where = [];
    if (city) {
      where.push(' city_name = "' + city + '"');
    }
    if (location) {
      where.push(' location = "' + location + '"');
    }
    if (category) {
      switch (category) {
        case "traditional-ooh-media":
          table_name = "goh_media";
          break;
        case "digital-media":
          table_name = "goh_media_digital";
          break;
        case "transit-media":
          table_name = "goh_media_transit";
          break;
        case "mall-media":
          table_name = "goh_media_mall";
          break;
        case "airport-media":
          table_name = "goh_media_airport";
          break;
        case "inflight_media":
          table_name = "goh_media_inflight";
          break;
        case "office-media":
          table_name = "goh_media_office";
          break;
      }
    }
  
    if (subcategory) {
      where.push(' subcategory = "' + subcategory + '"');
    }
    if (illumination) {
      where.push(' illumination = "' + illumination + '"');
    }
  
    var sql = "SELECT * FROM " + table_name + "";
  
    if (city || location || subcategory || illumination) {
      sql += " WHERE";
    }
  
    const conditionstring = "" + where + "";
    var allconditions = conditionstring.replace(/,/g, " AND");
    const sqlquery = "" + sql + allconditions + "";
  
    if (code || company) {
      if (code) {
        where.push('code = "' + code + '"');
      }
      if (company) {
        where.push('mediaownercompanyname = "' + company + '"');
      }
      let alldata =
        "code, city_name, location, subcategory, illumination, mediaownercompanyname, email, phonenumber, thumb, category_name,price";
  
      const newquery =
        "SELECT " +
        alldata +
        " FROM goh_media  WHERE " +
        where +
        " UNION SELECT " +
        alldata +
        " FROM goh_media_digital WHERE " +
        where +
        " UNION SELECT " +
        alldata +
        " FROM goh_media_transit WHERE " +
        where +
        "  UNION SELECT " +
        alldata +
        " FROM goh_media_mall WHERE " +
        where +
        "  UNION SELECT " +
        alldata +
        " FROM goh_media_airport WHERE " +
        where +
        " UNION SELECT " +
        alldata +
        " FROM goh_media_inflight WHERE " +
        where +
        " UNION SELECT " +
        alldata +
        " FROM goh_media_office WHERE " +
        where +
        "";
      db.query(newquery, async (err, result) => {
        if (err) throw err;
        return res.json({ status: "success", length: result.length, res: result });
      });
    } else {
      if (
        !city == "" ||
        !location == "" ||
        !category == "" ||
        !subcategory == "" ||
        !illumination == ""
      ) {
        db.query(sqlquery, (err, result) => {
          if (err) {
            return res.send({ status: "sqlerror", error: err });
          } else if (result.length < 0) {
            return res.send({ status: "error", error: "Media Not Found" });
          } else {
            return res.send({ status: "success", res: result });
          }
        });
      } else {
        res.json({ status: "error", error: "Media Not Found" });
      }
    }
  }






exports.city = async(req,res)=>{
    db.changeUser({ database: "gohoardi_goh" });
    db.query("SELECT * FROM goh_cities", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        return res.send(result);
      }
    });
  }



  
exports.company = async(req,res)=>{
    db.changeUser({ database: "odoads_tblcompanies" });
    db.query(
      "SELECT name FROM tblcompanies WHERE name IS NOT NULL",
      (err, result) => {
        if (err) throw err;
        return res.send(result);
      }
    );
  }