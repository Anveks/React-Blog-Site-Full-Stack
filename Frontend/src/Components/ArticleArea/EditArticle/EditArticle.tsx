import { useEffect, useState } from "react";
import "./EditArticle.css";
import { ArticleModel } from "../../../Models/ArticleModel";
import articleService from "../../../Services/ArticlesService";
import { useParams } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import { CategoryModel } from "../../../Models/CategoryModel";
import { useForm } from "react-hook-form";

function EditArticle(): JSX.Element {
    const [article, setArticle] = useState<ArticleModel>();
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const { handleSubmit, register, setValue } = useForm<ArticleModel>();

    const params = useParams();
    const id = +params.id;

    useEffect(() => {
        articleService.getOneArticle(id).then((data) => {
            // setValue here
            setArticle(data);
        }).catch((err: any) => {
            notifyService.error(err.message);
        });
    }, []);

    useEffect(() => {
        articleService.getAllCategories()
            .then((categories) => setCategories(categories))
            .catch((err) => notifyService.error(err));
    }, []);

    return (
        <div className="EditArticle">
            <h3>Edit Article</h3>
            <form onSubmit={handleSubmit(send)}>
                <div className="form-main">
                    <label>Category: </label>
                    <select {...register("categoryId")} defaultValue="">
                        <option value="" disabled>select a category</option>
                        {categories.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <label>Title: </label>
                    <input type="text" placeholder="Javascript is Awesome" {...register("title")} />

                    <label>Content: </label>
                    <textarea placeholder="A long time ago, in a galaxy far far away..." {...register("content")}></textarea>

                    <label>Tags: </label>
                    <input type="text" placeholder="JavaScript, JS, React" {...register("tags")} />

                    <label>Preview Text: </label>
                    <input type="text" placeholder="Javascript ES2077: what to expect?" {...register("previewText")} />
                </div>

                <div className="form-images">
                    <label>Preview Image: </label>
                    <input type="file" {...register("previewImage")} accept="image/*" onChange={handlePreviewImageChange} />
                    {previewImage && <img src={previewImage} alt="Image Preview" />}

                    <label>Head Image: </label>
                    <input type="file" {...register("headImage")} accept="image/*" onChange={handleHeadImageChange} />
                    {headImage && <img src={headImage} alt="Image Preview" />}

                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default EditArticle;
