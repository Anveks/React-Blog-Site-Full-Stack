import express, { NextFunction, Request, Response, request } from "express";
import dataService from "../5-services/data-service";
import { ArticleModel } from "../2-models/articles-model";

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



export default router;

