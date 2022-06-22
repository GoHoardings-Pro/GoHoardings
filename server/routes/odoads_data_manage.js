const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("../conn/conn");


router.get("/updateSync", async (req, res) => {
  let promises = [];
  db.changeUser({ database: "odoads_tblcompanies" }); 
    db.query("SELECT * FROM tblcompanies Where db_created = 'txst'", async (err, result) => {
        if (err) throw err;
        result.forEach((element) => {
            promises.push(new Promise((resolve, reject) => {
        db.changeUser({ database: "odoads_" + element.code });
        //  dbaccept["acceptted_database"] = element.code
        db.query(
        "SELECT * FROM tblmedia_deails WHERE syncstatus= 'added' OR syncstatus='updated'",
        (err, result) => {
            if (err) {
            reject(err)
            } 
            result.forEach(element2 => {
              element2['clientCode'] = element.code;
            })

            resolve(result);
        }
        );
            }))  
        })
         try {
             const result = await Promise.allSettled(promises)
             let test = [];
             result.forEach(element => {
               element.value.forEach(obj => {
                 test.push(obj);
               });
             });
             return  res.send(test);
         } catch (err) {
             return (err)
    }
    });
});

router.put("/rejected", (req, res) => {
  const id = req.body.id;
  const promises = [];
  db.changeUser({ database: "odoads_tblcompanies" }); 
  db.query("SELECT * FROM tblcompanies Where db_created = 'txst'", async (err, result) => {
    if (err) throw err;
    result.forEach((element) => {
        promises.push(new Promise((resolve, reject) => {
    db.changeUser({ database: "odoads_" + element.code });
  db.query(
    "UPDATE tblmedia_deails SET syncstatus = 'rejected' WHERE id = ?",
    [id],
    
    (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    }
  );
}))   
}) 
try{
  const result = await Promise.all(promises)
  return  res.send(result);
}catch (err){
  return err;
}
})
})


router.get("/rejectaccepted", cors(), (req, res) => {
  // Configure array to store all promises
  const promises = [];
  db.changeUser({ database: "odoads_tblcompanies" });
  db.query(
    'SELECT * FROM tblcompanies WHERE db_created = "txst"',
    async (err, result) => {
      if (err) throw err;
      // Iterate through each item (this probably takes 0.001 seconds)
      result.forEach((obj) => {
        // Run the query and store the ongoing request in the promises array
        promises.push(
          new Promise((resolve, reject) => {
            db.changeUser({ database: "odoads_" + obj.code});
            db.query(
              'select * from tblmedia_deails WHERE syncstatus = "rejected"',
              (err, result) => {
                if (err) {
                  // If there was an error, send it to reject which will be caught in the try/catch
                  return reject(err);
                }
                // Return the success response
                result.forEach(element2 => {
                  element2['clientCode'] = obj.code;
                })
                resolve(result);
              }
            );
          })
        );
      });
      // try/catch to handle any issues.
      try {
        // wait for all ongoing requests to finish and return either a response or error
        const result = await Promise.allSettled(promises);
        let test = [];
        result.forEach(element => {
          element.value.forEach(obj => {
            test.push(obj);
          });
        });
        // Return the result
        res.json(test);
      } catch (err) {
        console.log(err);
        // Send any error instead
        res.status(500).send(err);
      }
    }
  );
});


// router.get("/testing",(req,res) => {
//   let newdata = [];
//   const alldata = [
//     {
//       email : "gmail.com",
//       mail : "yahoo.com"
//     },
//     {
//       email : "gmail1.com",
//       mail : "yahoo2.com"
//     }
//   ]
//   // console.log(alldata);
//   db.changeUser({ database: "odoads_tblcompanies" });
//     db.query(
//       'SELECT name,id FROM tblcompanies WHERE code = "9_media"',(err,result) => {
//         if(err) throw err;
//         // console.log(result.name);
//        result.forEach((obj) =>{
//          newdata.push(obj)
//          console.log(typeof(newdata));
//        })
//         })
     
//       })
// // })



router.put("/accept",async (req,res) =>{
const allData = req.body;
const  codeData =  req.body.category_id;
const clientData = req.body.clientCode
const promises = [];
const newdata = [allData]

const keyValue = ("mediaownercompanyname,email,companyaddress,created,phonenumber,main_media_id,mediaownername")
const keyData = ("name,contact_email,contact_address,created,contact_phone,mediano,contact_firstname,contact_lastname")
 promises.push(new Promise  (async(reject, resolve) => {
  db.changeUser({ database: "odoads_tblcompanies" });
    db.query(
      'SELECT '+keyData+' FROM tblcompanies WHERE code =  "'+clientData+'"',  (err,result) => {
        if (err){
           reject(err);
        }
        newdata.forEach(obj => {
          result.forEach(res => {
            obj['mediaownercompanyname'] = res.name;
            obj['email'] = res.contact_email;
            obj['companyaddress'] = res.contact_address;
            obj['created'] = res.created;
            obj['phonenumber'] = res.contact_phone;
            obj['main_media_id'] = res.mediano;
            // obj['status'] = res.status;
            obj['mediaownername'] = res.contact_firstname  ;
          
          })
        })
        resolve(newdata)
      })
 }))
 
    try {
      const result = await Promise.all(promises);
        // result
    } catch (err) {
      console.log(err);
    }
db.changeUser({ database: "gohoardi_goh" }); 

  $tblnm = "";

  switch(codeData){
  case 3  : $tblnm = 'goh_media_mall'; break;
  case 20 : $tblnm = 'goh_media'; break;
  case 100: $tblnm = 'goh_media_digital'; break;
  case 104: $tblnm = 'goh_media_airport'; break;
  case 105: $tblnm = 'goh_media_office'; break;
  case 106: $tblnm = 'goh_media_inflight'; break;
  case 107: $tblnm = 'goh_media_transit'; break;
  }
const valueData = ("areadescription,block_limit,category_id,city,code,foot_fall,ftf,geolocation,height,heightunit,illumination,lhs_rhs,location,medianame,price,pricetype,slot_duration,slot_per_day,state,status,thumbnail,width,widthunit")
  db.query('INSERT INTO  '+$tblnm+'  ('+valueData+','+keyValue+') VALUES ("'+allData.areadescription+'","'+allData.block_limit+'","'+allData.category_id+'","'+allData.city+'","'+allData.code+'","'+allData.foot_fall+'","'+allData.ftf+'","'+allData.geolocation+'","'+allData.height+'","'+allData.heightunit+'","'+allData.illumination+'","'+allData.lhs_rhs+'","'+allData.location+'","'+allData.medianame+'","'+allData.price+'","'+allData.pricetype+'","'+allData.slot_duration+'","'+allData.slot_per_day+'","'+allData.state+'","'+allData.status+'","'+allData.thumbnail+'","'+allData.width+'","'+allData.widthunit+'","'+newdata[0].name+'","'+newdata[0].contact_email+'","'+newdata[0].contact_address+'","'+newdata[0].created+'","'+newdata[0].contact_phone+'","'+newdata[0].mediano+'","'+newdata[0].contact_firstname+'")',[valueData],(err, result)=>{
    if(err) throw err;
    db.changeUser({ database: "odoads_"+clientData+"" });
    db.query('UPDATE tblmedia_deails SET syncstatus = "synced"',(err,result) => {
      if(err) throw err;
      res.send(result);
    })
  })
})    




module.exports = router;