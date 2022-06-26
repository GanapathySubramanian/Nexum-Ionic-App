enum Visibility{
  private,
  public
};
export interface Post {
  postUrl: string;
  description: string;
  user: string;
  comments: [];
  likes: [];
  accessibility: Visibility;
}
