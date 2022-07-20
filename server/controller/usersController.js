
const db = require('../conn/conn')
db.changeUser({database : "odoads_tblcompanies"})



exports.goUsers = async(req, res) => {
    db.changeUser({database : "odoads_tblcompanies"})
    db.query("SELECT * FROM tblcontacts ", function (err, result) {
      if (err) throw err;
        res.status(200).json({
        message:'success get',
        data:result
    })
})
}



exports.odoUsers = async(req, res) => {
  db.changeUser({ database: "odoads_tblcompanies" }); 
  const promises = [];
  db.query("SELECT id,name,code,contact_email, contact_phone, created FROM tblcompanies Where db_created = 'txst'", async (err, result) => {
    if (err) throw err;
    result.forEach((element) => {
      promises.push(new Promise((resolve, reject) => {
   db.changeUser({ database: "odoads_" + element.code});
  db.query("SELECT count(syncstatus) AS 'unsynced' FROM tblmedia_deails WHERE  syncstatus='unsynced' ", async (err,result) => {
    if (err) {
      res.send(reject)
    }
  
  db.query("SELECT count(syncstatus) AS 'updated' FROM tblmedia_deails WHERE syncstatus='updated' ", async (err, updated) => {
    if (err){
      res.send(reject)
    }
    // resolve(updated)
    db.query("SELECT count(syncstatus) AS 'synced' FROM tblmedia_deails WHERE syncstatus='synced' ", async (err, synced) => {
      if (err){
        res.send(reject)
      }
     
    result.forEach(element2 => {
      element2['id'] = element.id
      element2['name'] = element.name;
      element2['code'] = element.code;
      element2['email'] = element.contact_email;
      element2['phone'] = element.contact_phone;
      element2['date'] = element.created;
      element2['updated'] = updated[0]
      element2['synced'] = synced[0]
    })

  
    resolve(result);
    })
    
  })
 
  })
      }))
  })
  try{
    const result = await Promise.allSettled(promises)
    let test = [];
    result.forEach(element => {
      element.value.forEach(obj => {
        test.push(obj);
      });
    });
    // Return the result
    res.json(test);
  }catch (err){
    return err;
  }
})
}

exports.applyCard = async(req,res,next) => {
  const userid = req.body.userid;
  // Configure array to store all promises
  const promises = []
  db.changeUser({ database: "gohoardi_goh" });
  db.query("SELECT mediatype, mediaid, campaigid FROM goh_shopping_carts_item WHERE userid = ? ",[userid], async (err,result) => {
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
        // geoloc will remove for now bi=ut we have to add this on future
        // db.query("SELECT id, category_name, code, medianame, location, ftf, keyword, email, status, created FROM "+table_name+" WHERE code = ? ",[element.mediaid],(err, res) => {
        db.query("SELECT * FROM "+table_name+" WHERE code = ? ",[element.mediaid],(err, res) => {
              if (err) {
                  // If there was an error, send it to reject which will be caught in the try/catch  
               reject(err)
              }
              // Return the success response
              // resolve(res,(element.campaigid ) )
                res.forEach(obj => {
                  obj["campaigid"] = element.campaigid;
              })
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
}
  


exports.odoSwitchToggle = async(req,res) => {
   let toggle = req.body.id
   console.log(toggle);
  db.changeUser({database : "odoads_tblcompanies"})
  db.query("SELECT * from tblcompanies WHERE id = "+toggle+" ", async (err, result) => {
      if (err) throw err;
      let toggleValue = result[0].status
      if (toggleValue == 0){
          db.query("UPDATE tblcompanies SET status = 1 WHERE id = "+toggle+"", async(err,result) => {
              if (err) throw err;
              db.query('SELECT * FROM tblcompanies', async (err, result) => {
                  if (err) throw err;
                  return res.send(result);
                });
          })
      } else {
          db.query('UPDATE tblcompanies SET status = 0 WHERE id = '+toggle+'', async (err, result) => {
            if (err) throw err;
            db.query('SELECT * FROM tblcompanies', async (err, result) => {
              if (err) throw err;
              return res.send(result);
            });
          });
        }
      
  })
}

exports.goUserSwitchToggle = async(req,res) =>{
  const toggle = req.body.id
  console.log(toggle);

  db.changeUser({database : "odoads_tblcompanies"})

  db.query("SELECT * from tblcontacts WHERE id = "+toggle+" ", async (err, result) => {
      if (err) throw err;
      let toggleValue = result[0].invoice_emails
      if (toggleValue == 0){
          db.query("UPDATE tblcontacts SET invoice_emails = 1 WHERE id = "+toggle+"", async (err,result) => {
              if (err) throw err;
              db.query('SELECT * FROM tblcontacts', async (err, result) => {
                  if (err) throw err;    
                res.send(result);
                });
          })
      } else {
          db.query('UPDATE tblcontacts SET invoice_emails = 0 WHERE id = '+toggle+'', async (err, result) => {
            if (err) throw err;
            db.query('SELECT * FROM tblcontacts', async (err, result) => {
              if (err) throw err;
          
              res.send(result);
            });
          });
        }
      
  })
}