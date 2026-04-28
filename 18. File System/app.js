import express from "express";
const app = express();
import fs from "fs";

app.get("/" , (req , res) => {
    res.send("Home Page")
});

// Write File
app.get("/write-file" , (req , res) => {
    fs.writeFile("./public/output.txt" , "This is written in th file." , (err) => {
        if(err){
            return res.status(500).send("Failed to write file.")
        }
        
        res.send("File Create Successfully.")
    })
})

// Append File
app.get("/append-file" , (req , res) => {
    fs.appendFile("./public/output.txt" , "\nThis is also written is the file." , (err) => {
        if(err){
            return res.status(500).send("Failed to write file.")
        }
        res.send("File Appended Successfully.")
    })
})

// Read File
app.get("/read-file" , (req , res) => {
    fs.readFile("./public/output.txt" , (err , data) => {
        if(err){
            return res.status(500).send("Failed to read file.")
        }

        res.setHeader("Content-Type", "text/plain")
        res.send(data)
    })
})

// Delete File
app.get("/delete-file" , (req , res) => {
    fs.unlink("./public/output.txt" , (err) => {
        if(err){
            return res.status(500).send("Failed to delete file.")
        }
        res.send("File deleted Successfully.")
    })
})

// Rename File
app.get("/rename-file" , (req , res) => {
    fs.rename("./public/output.txt" , "./public/newOutput.txt" , (err) => {
        if(err){
            return res.status(500).send("Failed to rename file." , err)
        }
        res.send("File renamed successfully.")
    })
})

// Streaming a File
app.get("/stream-file" , (req , res) => {
    const filestream = fs.createReadStream("./public/recipes.txt")

    filestream.on("open" , ()=> {
        filestream.pipe(res)
    })
    
    filestream.on("error" , ()=>{
        res.status(404).send("Failed to stream file.")
    })
})

// Read PDF File 
app.get('/read-pdf', (req, res) => {
  fs.readFile('./public/data.pdf', (err, data) =>{
      if(err){
        return res.status(500).send("PDF not found.", err)
      }
      
      res.setHeader('Content-Type', 'application/pdf')
      res.send(data)
  })
});

// Read JSON File 
app.get('/read-json', (req, res) => {
  fs.readFile('./public/data.json', (err, data) =>{
      if(err){
        return res.status(500).send("JSON not found.", err)
      }
      
      res.setHeader('Content-Type', 'application/json')
      res.send(data)
  })
});

// Write JSON file 
app.get('/write-json', (req, res) => {
  const filePath = './public/data.json'
  const data = { name:'Salman Khan', email: 'salman@email.com', age: 25 }

  fs.writeFile(filePath, JSON.stringify(data),(err) =>{
      if(err){
        return res.status(500).send("Failed to write JSON file.", err)
      }
      
      res.send('JSON File written successfully')
  })
});

// Write JSON file and keep existing data
app.get('/append-json', (req, res) => {
  const filePath = './public/data.json'
  const newData = { name:'Yahu Baba', email: 'yb@email.com', age: 23 }

  fs.readFile(filePath, (err, data) =>{
      if(err){
        return res.status(500).send("Failed to read JSON file.", err)
      }

      let jsonData;
      jsonData = JSON.parse(data)
      
      if(!Array.isArray(jsonData)){
        jsonData = [jsonData]
      }

      jsonData.push(newData)

      fs.writeFile(filePath, JSON.stringify(jsonData),(err) =>{
          if(err){
            return res.status(500).send("Failed to write JSON file.", err)
          }
          
          res.send('JSON File appended successfully')
      })
  })

});

// Read image file
app.get('/read-image', (req, res) => {
  fs.readFile('./public/image.jpg', (err, data) =>{
      if(err){
        return res.status(500).send("Image not found.", err)
      }
      
      res.setHeader('Content-Type', 'image/jpeg')
      res.send(data)
  })
});

// Read video file
app.get('/read-video', (req, res) => {
  fs.readFile('./public/earth.mp4', (err, data) =>{
      if(err){
        return res.status(500).send("Video not found.", err)
      }
      
      res.setHeader('Content-Type', 'video/mp4')
      res.send(data)
  })
});

// Getting information for a file
app.get('/file-info', (req, res) => {
   fs.stat('./public/earth.mp4', (err, stats) =>{
      if(err){
        return res.status(500).send("File not found.", err)
      }
      
      res.send(stats.size + 'bytes')
      console.log("File : " + stats.isFile())
      console.log("Folder : " + stats.isDirectory())
  })
}); 

// check if file exists
app.get('/file-exists', (req, res) => {
  fs.access('./public/earth123.mp4', (err) =>{
      if(err){
        res.send("File does not exist")
      }
      
      res.send("File Exists")
  })
});

// Read Folder
app.get("/read-folder" , (req , res) => {
    fs.readdir("./public" , (err , files) => {
        if(err){
            return res.status(500).send("Failed to delete file.")
        }
        console.log(files)
        res.send("Folder read successfully.")
    })
})

// Create Folder
app.get('/create-folder', (req, res) => {
  fs.mkdir('./public/myFolder',(err) =>{
      if(err){
        return res.status(500).send("Error creating folder.")
      }
      
      res.send("Folder created Successfully")
  })
});

// Rename Folder
app.get('/rename-folder', (req, res) => {
  fs.rename('./public/myFolder', './public/renamedFolder',(err) =>{
      if(err){
        return res.status(500).send("Error renaming folder.", err)
      }
      
      res.send("Folder renamed Successfully")
  })
});

// Delete Folder
app.get('/delete-folder', (req, res) => {
  fs.rmdir('./public/renamedFolder', (err) =>{
      if(err){
        return res.status(500).send("Error deleting folder.", err)
      }
      
      res.send("Folder deleted Successfully")
  })
});

app.listen(3000 , () => {
    console.log("Server Running on port 3000")
});