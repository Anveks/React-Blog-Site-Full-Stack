import express, { NextFunction, Request, Response, request } from "express";
import dataService from "../5-services/data-service";
import { ArticleModel } from "../2-models/articles-model";
import { CommentModel } from "../2-models/comment-model";

const router = express.Router();

// GET ALL
router.get("/articles", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const articles = await dataService.getAllArticles();
        response.json(articles);
    }
    catch(err: any) {
        next(err);        
    }
});

// ADD
router.post("/articles", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const article = new ArticleModel(request.body);
        const newArticle = await dataService.addArticle(article);
        response.status(201).json(newArticle);
    }
    catch(err: any) {
        next(err);        
    }
});

// UPDATE
router.put("/articles/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.articleId = +request.params.id;
        const article = new ArticleModel(request.body);
        const updatedArticle = await dataService.updateArticle(article);
        response.json(updatedArticle);
    }
    catch(err: any) {
        next(err);        
    }
});

// DELETE
router.delete("/articles/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await dataService.deleteArticle(id);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);        
    }
});

// GET comments
router.get("/comments/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const comments = await dataService.getCommentsPerArticle(+request.params.id);
        response.json(comments);
    }
    catch(err: any) {
        next(err);        
    }
});

// ADD comment
router.post("/comments", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const comment = new CommentModel(request.body);
        const newComment = await dataService.addComment(comment);
        response.status(201).json(newComment);
    }
    catch(err: any) {
        next(err);        
    }
});

// UPDATE COMMENT
router.put("/update-comments", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const comment = new CommentModel(request.body);
        const updatedComment = await dataService.updateComment(comment);
        response.json(updatedComment);
    }
    catch(err: any) {
        next(err);        
    }
});

router.delete("/delete-comment", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.body.commentId;
        await dataService.deleteComment(id);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);        
    }
});

// ADD like/dislike
router.post("/add-likes", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { userId, commentId, likeType } = request.body;
        await dataService.addLike(+userId, +commentId, +likeType);
        response.status(204).send("Like has been added.");
    }
    catch(err: any) {
        next(err);        
    }
});

router.delete("/delete-likes", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { userId, commentId } = request.body;
        await dataService.removeLike(+userId, +commentId);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);        
    }
});

export default router;

