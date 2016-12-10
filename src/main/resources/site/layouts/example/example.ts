'use strict';
/// <reference path="../../lib/xp/global.ts" />
import { LayoutController } from '../../lib/xp/layout/controller';

const layoutName = 'example';
const viewFile = resolve(`${layoutName}.html`);

export default class ExampleLayoutController extends LayoutController {

    constructor(request: any) {
        super(request);
        this.componentName = layoutName;
        this.viewFile = viewFile;
    }

    get() {
        this.model.regions = Object.keys(this.regions).map(k=>this.regions[k]);
        return super.get();
    }

    public static handleRequest(request: any) {
        return new ExampleLayoutController(request).buildResponse().response;
    }

} // ExampleLayoutController

export const get = ExampleLayoutController.handleRequest;
