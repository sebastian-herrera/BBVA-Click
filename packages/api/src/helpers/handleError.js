const httpError = (res, err) => {
  console.log(err);
  return res.status(500).end();
};

export default httpError;
