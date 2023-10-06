import { useState } from "react";
import "./Slider.css";
import { ArticleModel } from "../../../Models/ArticleModel";

function Slider(props: any): JSX.Element {

    let indexArr = props.articles.map((article: ArticleModel) => { return article.articleId });

    const [current, setCurrent] = useState(0);

    const slideLeft = () => {
        if (current === 0) {
            setCurrent(indexArr.length - 1);
        } else {
            setCurrent(current - 1);
        }
    }

    const slideRight = () => {
        if (current === indexArr.length - 1) {
            setCurrent(0)
        } else {
            setCurrent(current + 1)
        }
    }


    return (
        <div className="Slider">

            <div className="slider-wrapper">
                {props.articles.map((article: any) =>
                    <div
                        className={
                            article.articleId === indexArr[current]
                                ? "slider-card slider-card-active"
                                : "slider-card"}
                        key={article.articleId}>

                        <img className="slider-image" src={article.previewImageUrl} alt="slider-image" />

                        <div className="card-overlay">
                            <h2 className="card-title">{article.title}</h2>
                        </div>

                    </div>)}

                {/* left arrow */}
                <div className="slider-arrow-left" onClick={slideLeft}>
                    &lsaquo;
                </div>
                {/* right arrow */}
                <div className="slider-arrow-right" onClick={slideRight}>
                    &rsaquo;
                </div>

            </div>

        </div>
    );
}

export default Slider;
