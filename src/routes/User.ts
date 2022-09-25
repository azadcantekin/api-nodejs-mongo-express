import express from 'express';
import controller from '../controllers/User';

const router = express.Router();

router.post('/create', controller.createUser);
router.get('/get/:userId', controller.geteUser);
router.get('/get-all', controller.getAlleUser);
router.patch('/update/:userId', controller.updateUser);
router.delete('/delete/:userId', controller.deleteUser);

export = router;
