'use strict';

export abstract class Controller {
    public static get(request: Object) {};
    response: Object;
}

export default class PagePagesController extends Controller {

    constructor(request) {
        super();
        this.response = {
            body: '<html><body><h1>Hello, world!</h1></body></html>'
        };
    }

    static get(request: Object) {
        const controller = new PagePagesController(request);
        return controller.response;
    }

} // PagePagesController

export const get = PagePagesController.get;
