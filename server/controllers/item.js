import Item from '../models/Item.js';
import createError from '../utils/createError.js';

export const createItem = async (req, res, next) => {
	const newItem = new Item({
		name: req.body.name,
		apiID: req.body.id,
		backdrop_path: req.body.backdrop_path,
		season: req.body.season,
		episode: req.body.episode,
		user: req.user.id,
	});
	try {
		const savedItem = await newItem.save();
		return res.status(200).json(savedItem);
	} catch (error) {
		return next(error);
	}
};

export const updateItem = async (req, res, next) => {
	try {
		const item = await Item.findById(req.params.itemId).exec();
		if (!item)
			return next(createError({ status: 404, message: 'TV Show not found' }));

		const updatedItem = await Item.findByIdAndUpdate(
			req.params.itemId,
			{
				season: req.body.season,
				episode: req.body.episode,
			},
			{ new: true }
		);
		return res.status(200).json(updatedItem);
	} catch (error) {
		return next(error);
	}
};

export const deleteItem = async (req, res, next) => {
	try {
		await Item.findByIdAndDelete(req.params.itemId);
		return res.json('Deleted Successfully');
		}
	 catch (error) {
		return next(error);
	}
};

export const getCurrentUserItems = async (req, res, next) => {
	try {
	  const items = await Item.find({ user: req.user.id });
	  return res.status(200).json(items);
	} catch (err) {
	  return next(err);
	}
  };