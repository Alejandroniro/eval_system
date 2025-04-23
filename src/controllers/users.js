import usersRepository from "../repositories/users.js";
class usersController {
    async getAllUsers(req, res) {
        try {
            const users = await usersRepository.getAllUsers();
            res.status(200).json({status: "get-all-ok", data: users});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async getUserById(req, res) {
        try {
            const user = await usersRepository.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({status: "error", error: "User not found"});
            }
            res.status(200).json({status: "get-by-id-ok", data: user});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async createUser(req, res) {
        try {
            const user = await usersRepository.createUser(req.body);
            res.status(200).json({status: "create-ok", data: user});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async updateUser(req, res) {
        try {
            const user = await usersRepository.updateUser(req.params.id, req.body);
            if (!user) {
                return res.status(404).json({status: "error", error: "User not found"});
            }
            res.status(200).json({status: "update-ok", data: user});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await usersRepository.deleteUser(req.params.id);
            if (!user) {
                return res.status(404).json({status: "error", error: "User not found"});
            }
            res.status(200).json({status: "delete-ok", data: user});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }
}


export default new usersController();