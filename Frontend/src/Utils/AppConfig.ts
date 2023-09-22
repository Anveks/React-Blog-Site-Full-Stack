class AppConfig {
 // auth URL's:
 public registerUrl = "http://localhost:4000/api/auth/register"
 public loginUrl = "http://localhost:4000/api/auth/login"

 // categories:
 public categoriesUrl = "http://localhost:4000/api/categories";

 // data URL's: 
 public articlesUrl = "http://localhost:4000/api/articles/";
 public comments = "http://localhost:4000/api/comments/";
 public updateViews = "http://localhost:4000/api/update-views-by-id";

 // update comment url?
 public deleteComment = "http://localhost:4000/api/delete-comment"
 public updateComment = "http://localhost:4000/api/update-comment"

 // likes URL's:
 public addLike = "http://localhost:4000/api/add-likes";
 public removeLike = "http://localhost:4000/api/delete-likes";
}

const appConfig = new AppConfig();

export default appConfig;