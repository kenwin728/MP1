import { Router } from 'express';
import postsRouter from './postsRouter.js';
import repliesRouter from './repliesRouter.js';
import userRouter from './userRouter.js';
import registerRouter from './registerRouter.js';
import loginRouter from './loginRouter.js';

const router = Router();

router.get("/", (req, res) => {
    res.redirect("/posts");
});

router.get("/home", (req, res) => {
    res.redirect("/posts");
});

router.get("/homepage", (req, res) => {
    res.redirect("/posts");
});

router.get("/back", (req, res) => {
    res.redirect("/posts");
});

router.use(postsRouter);
router.use(repliesRouter);
router.use(userRouter);
router.use(registerRouter);
router.use(loginRouter);

router.use((req, res) => {
    res.render("error", {
        title: "Page not Found."
    });
});

export default router;