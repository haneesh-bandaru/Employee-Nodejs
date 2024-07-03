const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Access denied || Token not found" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, "1234"); 
    req.role = decoded.role;
    req.username = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
}

module.exports = verifyToken;
