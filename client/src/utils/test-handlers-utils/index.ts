import { ResponseTransformer, rest, RestContext } from "msw";

export let json = (ctx: RestContext, obj: any): ResponseTransformer<any, any> => ctx.json(obj)

export const headers = (ctx: RestContext): Array<ResponseTransformer<any, any>> => {
    return [
        ctx.status(200),
        ctx.set("access-control-allow-origin", "*"),
        ctx.set("Accept", "application/json"),
        ctx.set("Content-Type", "application/json")
    ]
}

export const _rest = rest;