import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AnimationsService {
    private static routeAnimationType: RouteAnimationType = 'NONE';

    constructor() {
        AnimationsService.routeAnimationType = 'NONE';
    }

    // tslint:disable-next-line:typedef
    static isRouteAnimationsType(type: RouteAnimationType) {
        return AnimationsService.routeAnimationType === type;
    }

    // tslint:disable-next-line:typedef
    updateRouteAnimationType(
        pageAnimations: boolean,
        elementsAnimations: boolean
    ) {
        AnimationsService.routeAnimationType =
            pageAnimations && elementsAnimations
                ? 'ALL'
                : pageAnimations
                    ? 'PAGE'
                    : elementsAnimations
                        ? 'ELEMENTS'
                        : 'NONE';
    }
}

export type RouteAnimationType = 'ALL' | 'PAGE' | 'ELEMENTS' | 'NONE';