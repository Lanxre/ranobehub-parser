import { createResponse } from '@/utils/response';
import { HttpStatus } from '@/constants/httpStatus';
import { AppError, NotFoundError } from '@/errors';
import { chapterHandler } from './chapterHandler';
import { searchHandler } from './searchHandler';
import { novelaHandler } from './novelaHandler';

export type RouteHandler = (req: Request, url: URL, params: Record<string, string>) => Promise<Response> | Response;

interface Route {
  pattern: RegExp;
  handler: RouteHandler;
}

const routes: Route[] = [
  { 
    pattern: /^GET \/$/, 
    handler: () => createResponse(HttpStatus.OK, { message: 'Ranobehub Parser Server API' })
  },
  { 
    pattern: /^GET \/api\/chapter$/, 
    handler: chapterHandler 
  },
  { 
    pattern: /^GET \/api\/search$/, 
    handler: searchHandler 
  },
  { 
    pattern: /^GET \/api\/novela\/(?<id>\d+)$/, 
    handler: novelaHandler 
  }
];

export async function fetchHandler(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);
    const routeKey = `${req.method} ${url.pathname}`;
    
    for (const route of routes) {
      const match = routeKey.match(route.pattern);
      if (match) {
        return await route.handler(req, url, match.groups || {});
      }
    }

    throw new NotFoundError();
  } catch (error) {
    if (error instanceof AppError) {
      return createResponse(error.statusCode, null, error.message);
    }
    
    console.error('Unhandled error:', error);
    return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, 'Internal Server Error');
  }
}
