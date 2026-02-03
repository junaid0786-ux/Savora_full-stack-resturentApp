export const ResturentAddMenuItem = async (req, res) => {
  try {
    const {
      name,
      cuisine,
      servingSize,
      preparationTime,
      type,
      description,
      price,
    } = req.body;

    if(
        !name ||
        !cuisine ||
        !servingSize ||
        !preparationTime ||
        !type ||
        !description ||
        !price
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
  } catch (error) {
    next(error);
  }
};
