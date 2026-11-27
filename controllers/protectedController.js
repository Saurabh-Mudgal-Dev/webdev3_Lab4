exports.dashboard = (req, res) => {
  res.json({ message: `Welcome ${req.user.id}, you are authenticated.` });
};

exports.adminOnly = (req, res) => {
  res.json({ message: 'Admin area accessed.', user: req.user });
};
