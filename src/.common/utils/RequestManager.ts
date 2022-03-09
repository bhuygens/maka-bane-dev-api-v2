export default class RequestManager {

  static successRequest(content: string) {
    return {
      success: true,
      message: content,
    };
  }
}
