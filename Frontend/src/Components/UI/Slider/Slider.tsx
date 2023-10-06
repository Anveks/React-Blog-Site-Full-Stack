import "./Slider.css";

function Slider(props: any): JSX.Element {

    return (
        <div className="Slider">

            <div className="slider-wrapper">
                {props.articles.map((article: any) =>
                    <div className="slider-card" key={article.articleId}>

                        <img className="slider-image" src={article.previewImageUrl} alt="slider-image" />

                        <div className="card-overlay">
                            <h2 className="card-title">{article.title}</h2>
                        </div>

                    </div>)}
            </div>

        </div>
    );
}

export default Slider;
