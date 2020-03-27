module.exports = (err, req, res, next) => {

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(v => v.message)
    return res.status(400).json({error: messages.toString()})
  }

  if (err.code === 11000) {
    return res.status(400).json({error: 'duplicate key error'})
  }
  
  res.status(500).json({ error: err });
}