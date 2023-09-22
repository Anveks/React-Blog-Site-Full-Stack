import { useEffect, useState } from "react";
import "./AddArticle.css";
import { CategoryModel } from "../../../Models/CategoryModel";
import articleService from "../../../Services/ArticlesService";
import notifyService from "../../../Services/NotifyService";

function AddArticle(): JSX.Element {

    const [categories, setCategories] = useState<CategoryModel[]>([]);

    useEffect(() => {
        articleService.getAllCategories()
            .then((categories) => setCategories(categories))
            .catch((err) => notifyService.error(err));
    }, []);

    function addArticle() {
        //
    };

    return (
        <div className="AddArticle">
            <h3>Add a New Article</h3>
            <form>
                <div className="form-main">
                    <label>Category: </label>
                    <select>
                        <option disabled>select a category</option>
                        {categories.map((category) => <option>{category.name}</option>)}
                    </select>

                    <label>Title: </label>
                    <input type="text" placeholder="Javascript is Awesome" />

                    <label>Content: </label>
                    <textarea placeholder="A long time ago, in a galaxy far far away..."></textarea>

                    <label>Tags: </label>
                    <input type="text" placeholder="JavaScript, JS, React" />

                    <label>Preview Text: </label>
                    <input type="text" placeholder="Javascript ES7: what to expect?" />
                </div>

                <div className="form-images">
                    <label>Preview Image: </label>
                    <input type="file" />

                    <label>Head Image: </label>
                    <input type="file" />
                </div>

            </form>
        </div>
    );
}

export default AddArticle;
