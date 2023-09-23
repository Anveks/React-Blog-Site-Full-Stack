import express, { NextFunction, Request, Response, request } from "express";
import dataService from "../5-services/articles-service";
import { ArticleModel } from "../2-models/articles-model";
import { CommentModel } from "../2-models/comment-model";
import imageHandler from "../4-utils/image-handler";

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

// GET ALL CATEGORIES
router.get("/categories", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categories = await dataService.getAllCategories();
        response.json(categories);
    }
    catch(err: any) {
        next(err);        
    }
});

// GET ONE
router.get("/articles/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const article = await dataService.getOneArticle(id);
        response.json(article);
    }
    catch(err: any) {
        next(err);        
    }
});

// ADD
router.post("/articles", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.previewImage = request.files?.previewImage;
        request.body.headImage = request.files?.headImage;
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
        console.log(comment);
        const newComment = await dataService.addComment(comment);
        response.status(201).json(newComment);
    }
    catch(err: any) {
        next(err);        
    }
});

// UPDATE COMMENT
router.put("/update-comment", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const updatedData = request.body.data;
        console.log(updatedData);
        await dataService.updateComment(updatedData.id, updatedData.content);
        response.json("updated!");
    }
    catch(err: any) {
        next(err);        
    }
});

// DELETE COMMENT
router.delete("/delete-comment", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.body.id;
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

// update views
router.put("/update-views-by-id", async (request: Request, response: Response, next: NextFunction) => {
    try {  
        const id = +request.body.id;
        await dataService.updateViews(id);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);        
    }
});

// get image url
router.get("/articles/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const imagePath = imageHandler.getImagePath(imageName);
        response.sendFile(imagePath);
    }
    catch(err: any) {
        next(err);
    }
});

export default router;

