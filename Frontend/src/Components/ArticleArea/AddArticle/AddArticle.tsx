import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArticleModel } from "../../../Models/ArticleModel";
import { CategoryModel } from "../../../Models/CategoryModel";
import { authStore } from "../../../Redux/AuthState";
import articleService from "../../../Services/ArticlesService";
import notifyService from "../../../Services/NotifyService";
import "./AddArticle.css";

function AddArticle(): JSX.Element {

    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const { handleSubmit, register } = useForm<ArticleModel>();
    const navigate = useNavigate();

    const [headImage, setHeadImage] = useState<any>();
    const [previewImage, setPreviewImage] = useState<any>();

    // TODO: make it one function
    const handleHeadImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHeadImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePreviewImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        articleService.getAllCategories()
            .then((categories) => setCategories(categories))
            .catch((err) => notifyService.error(err));
    }, []);

    async function send(article: ArticleModel) {

        try {
            // Get the selected image files
            const headImageFile = (article.headImage as unknown as FileList)[0];
            const previewImageFile = (article.previewImage as unknown as FileList)[0];

            // Update the article object with the files
            article.headImage = headImageFile;
            article.previewImage = previewImageFile;

            // Set the authorId
            article.authorId = authStore.getState().user.userId;

            // Log for debugging
            console.log(article);

            // Send the updated article with images
            await articleService.addArticle(article);

            notifyService.success("A new article has been added!");
            navigate("/");
        } catch (err: any) {
            console.log(err);
            notifyService.error(err.message);
        }
    };

    return (
        <div className="AddArticle">
            <h3>Add a New Article</h3>
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

export default AddArticle;
