import { parseRanobeChapter } from '@/parsers/ranobehub';
import { createResponse } from '@/utils/response';
import { HttpStatus } from '@/constants/httpStatus';
import { ValidationError } from '@/errors';

export async function chapterHandler(req: Request, url: URL): Promise<Response> {
  const targetUrl = url.searchParams.get('url');
  
  if (!targetUrl) {
    throw new ValidationError('The "url" query parameter is required');
  }

  const data = await parseRanobeChapter(targetUrl);
  return createResponse(HttpStatus.OK, data);
}
