'use strict';
/// <reference path="../../lib/xp/global.ts" />
import { PageController } from '../../lib/xp/page/controller';

const pageName = 'page';
const viewFile = resolve(`${pageName}.html`);
//const viewFile = `./${pageName}.html`;

export default class PagePageController extends PageController {

    constructor(request: any) {
        super(request);
        this.componentName = pageName;
        this.viewFile = viewFile;
    }

    get() {
        this.model.lang = 'nb-no';
        this.model.title = 'Title';
        return super.get();
    }

    public static handleRequest(request: any) {
        return new PagePageController(request).buildResponse().response;
    }

} // PagePageController

export const get = PagePageController.handleRequest;
