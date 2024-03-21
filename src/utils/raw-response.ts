export class RawResponse {
  constructor(
    private readonly body: Record<string, any>,
    private readonly headers: Record<string, string>,
    private readonly url: string,
  ) {}
}
