const express = require('express')

const router = express.Router()

const db = require('../conn/conn')


router.post("/cart", async (req, res) => {
  db.changeUser({ database: "odoads_tblcompanies" });
    db.query(
      "SELECT * FROM tblcontacts WHERE userid IS NOT NULL ",
       (err, result) => {
        if (err) throw err;
        return  res.send(result);
        // console.log(result);

      }
    );
  });

  router.put('/applycart', (req,res) => {
    const userid = req.body.userid;
    // Configure array to store all promises
    const promises = []
    db.changeUser({ database: "gohoardi_goh" });
    db.query("SELECT mediatype, mediaid FROM goh_shopping_carts_item WHERE userid = ? ",[userid], async (err,result) => {
      if (err) throw err;
    // Iterate through each item (this probably takes 0.001 seconds)
    // console.log(result);
    result.forEach(element => {
      switch (element.mediatype) {
        case  "digital-media":
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
        case "traditional-ooh-media":
        table_name = "goh_media";
        break;
        case "inflight_media":
        table_name = "goh_media_inflight";
        break;
        case "office-media":
        table_name = "goh_media_office";
        break;
        default:
        res.json({message : "No DataBase Gound"});
        break;
    }
//         // Run the query and store the ongoing request in the promises array
        promises.push(new Promise( async (resolve, reject) => {
          db.query("SELECT id, category_name, code, medianame, location, ftf, page_title, keyword, meta_title, email, geoloc FROM "+table_name+" WHERE code = ? ",[element.mediaid],  (err, res) => {
                if (err) {
                    // If there was an error, send it to reject which will be caught in the try/catch  
                 reject(err)
                }
                // Return the success response
                resolve(res)    
            })
        }))
      })
  try {
    // wait for all ongoing requests to finish and return either a response or error
    const result = await Promise.allSettled(promises)
    let test = [];
    result.forEach(element => {
      element.value.forEach(obj => {
        test.push(obj);
      });
    });
    // Return the result
   return res.send(test)
} catch (err) {
    console.log(err)
    // Send any error instead
    res.status(500).send(err)
}
})
  })




  module.exports = router;