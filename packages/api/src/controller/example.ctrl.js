import { httpError } from '../helpers';

const getExample = async (req, res) => {
  try {
    return res.end();
  } catch (err) {
    return httpError(res, err);
  }
};

const createExample = async ({ body }, res) => {
  try {
    const { example } = body;
    console.log(example);

    return res.status(201).end();
  } catch (err) {
    return httpError(res, err);
  }
};

export { getExample, createExample };
