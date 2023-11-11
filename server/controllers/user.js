import User from '../models/User.js';
import successResponse from '../utils/successResponse.js';

export const updateUser = async (req, res, next) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.user.id,
			{
				name: req.body.name,
				email: req.body.email,
			},
			{
				new: true,
			}
		).select('name email');
		return successResponse(res, 'User updated', updatedUser);
	} catch (err) {
		return next(err);
	}
};

export const getUserInfo = async (req, res, next) => {
	try {
		const data = await User.findById(req.user.id);
		return successResponse(res, 'User information received', data);
	} catch (err) {
		return next(err);
	}
};
