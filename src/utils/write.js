const fs = require('fs')

function writeFile(writtenString) {
    fs.appendFile('./src/log.txt', writtenString, err => {
        if (err) {
          console.error(err)
          return
        }
        //done!
      })
}

module.exports={
    writeFile: writeFile,
}