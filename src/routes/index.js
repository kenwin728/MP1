import { Router } from 'express';
import postsRouter from './postsRouter.js';
import repliesRouter from './repliesRouter.js';

const router = Router();

router.get("/", (req, res) => {
    res.render("posts", {
        title: "Homepage"
    });
});

router.get("/home", (req, res) => {
    res.redirect("/");
});

router.get("/homepage", (req, res) => {
    res.redirect("/");
});

router.use(postsRouter);
router.use(repliesRouter);

router.use((req, res) => {
    res.render("error", {
        title: "Page not Found."
    });
});

export default router;