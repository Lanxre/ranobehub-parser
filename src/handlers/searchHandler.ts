import { searchRanobeHub } from '@/parsers/ranobehub';
import { createResponse } from '@/utils/response';
import { HttpStatus } from '@/constants/httpStatus';

export async function searchHandler(req: Request, url: URL): Promise<Response> {
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const take = parseInt(url.searchParams.get('take') || '40', 10);
  
  const data = await searchRanobeHub(page, take);
  return createResponse(HttpStatus.OK, data);
}
