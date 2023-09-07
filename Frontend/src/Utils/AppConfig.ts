class AppConfig {
 // auth URL's:
 public registerUrl = "http://localhost:4000/api/auth/register"
 public loginUrl = "http://localhost:4000/api/auth/login"

 // data URL's: 
 public articlesUrl = "http://localhost:4000/api/articles/";
 public comments = "http://localhost:4000/api/comments/";

 // update comment url?
 public updateComment = "http://localhost:4000/api/update-comments/"

 // likes URL's:
 public addLike = "http://localhost:4000/api/add-likes";
 public removeLike = "http://localhost:4000/api/delete-likes";
}

const appConfig = new AppConfig();

export default appConfig;