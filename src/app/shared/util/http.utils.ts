import { environment } from '../../../environments/environment';

export class HttpUtils {
  static getMediaFullUrl(urlSegment: string) {
    return environment.sportbookApiEndpoint + urlSegment;
  }
}
