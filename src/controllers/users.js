import usersRepository from "../repositories/users.js";
import NotFoundError from "../utils/error/NotFoundError.js";
import DatabaseError from "../utils/error/DatabaseError.js";

class usersController {
    async getAllUsers(req, res, next) {
        try {
            const users = await usersRepository.getAllUsers();
            res.status(200).json(users);
        } catch (e) {
            next(e instanceof DatabaseError ? e : new DatabaseError("Error fetching all users", e));
        }
    }

    async getUserById(req, res, next) {
        try {
            const user = await usersRepository.getUserById(req.params.id);
            if (!user) {
                throw new NotFoundError("User not found");
            }
            res.status(200).json(user);
        } catch (e) {
            next(e instanceof NotFoundError ? e : new DatabaseError("Error fetching user by ID", e));
        }
    }

    async createUser(req, res, next) {
        try {
            const user = await usersRepository.createUser(req.body);
            
            res.status(201).json(user);
        } catch (e) {
            next(new DatabaseError("Error creating user", e));
        }
    }

    async updateUser(req, res, next) {
        try {
            const user = await usersRepository.updateUser(req.params.id, req.body);
            if (!user) {
                throw new NotFoundError("User not found");
            }
            res.status(200).json(user);
        } catch (e) {
            next(e instanceof NotFoundError ? e : new DatabaseError("Error updating user", e));
        }
    }

    async deleteUser(req, res, next) {
        try {
            const user = await usersRepository.deleteUser(req.params.id);
            if (!user) {
                throw new NotFoundError("User not found");
            }
            res.status(200).json(user);
        } catch (e) {
            next(e instanceof NotFoundError ? e : new DatabaseError("Error deleting user", e));
        }
    }
}

export default new usersController();
