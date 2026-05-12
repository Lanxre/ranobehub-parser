import { fetchFullNovela } from '@/parsers/ranobehub';
import { createResponse } from '@/utils/response';
import { HttpStatus } from '@/constants/httpStatus';

export async function novelaHandler(req: Request, url: URL, params: Record<string, string>): Promise<Response> {
  const id = parseInt(params['id'] || '0', 10);
  const fullNovela = await fetchFullNovela(id);
  return createResponse(HttpStatus.OK, fullNovela);
}
