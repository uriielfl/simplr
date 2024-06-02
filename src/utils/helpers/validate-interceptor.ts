import { InterceptorByEnum } from "../enums/interceptor-by.enum";
import { IResponseInterceptor, IRequestInterceptor } from "../interfaces/interceptor-options.interface";

export const validateInterceptorOptions = (options: IResponseInterceptor | IRequestInterceptor) => {
    const isByPathAndExactPath = options.by.includes(InterceptorByEnum.PATH) && options.by.includes(InterceptorByEnum.EXACT_PATH);
    const hasPathButIsNotByPathOrExactPath = options.path && !options.by.includes(InterceptorByEnum.PATH) && !options.by.includes(InterceptorByEnum.EXACT_PATH);
    const hasMethodButIsNotByMethod = !!options.methods && !options.by.includes(InterceptorByEnum.METHOD)
    const hasParamsButIsNotByPath = !!options.params && !options.by.includes(InterceptorByEnum.PATH) ;
    const hasParamsButHasNoPath = !!options.params && !options.path;
    const isNotRightFormatted = options.by.every((param) => param.startsWith('{') && param.endsWith('}'));
    

    if(isByPathAndExactPath) {
        throw new Error('Cannot have both PATH and EXACT_PATH in by array');
    }

    if(hasPathButIsNotByPathOrExactPath) {
        throw new Error('Path must be used with PATH or EXACT_PATH');
    }

    if(hasMethodButIsNotByMethod) {
        throw new Error('Method must be used with METHOD');
    }

    if(hasParamsButIsNotByPath || hasParamsButHasNoPath) {
        throw new Error('Params must be used with PATH');
    }

    if(isNotRightFormatted) {
        throw new Error('Params must be formatted like {param}');
    }
}