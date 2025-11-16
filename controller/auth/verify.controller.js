export const verifyUser = (req, res) => {
  if (req.user) {
    return res.json({ authenticated: true });
  }
  return res.json({ authenticated: false });
};
