const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      '<form action="/message" method="POST"><label for="message">Enter your message:</label><input type="text" id="message" name="message" required><button type="submit">Submit</button></form>'
    );
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const data = Buffer.concat(body).toString();
      message = data.split("=")[1];
      fs.writeFile("./message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>Home Page</h1>");
  return res.end();
};
module.exports = requestHandler;
