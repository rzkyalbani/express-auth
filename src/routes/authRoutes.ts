import { Router } from "express";
import { registerHandler } from "../controllers/authController";

const router = Router();

router.post('/register', registerHandler)
router.get('/tes', (req, res) => {
    res.send('halo tes');
})

export default router;