import { Injector, Type, ɵComponentDef as ComponentDef, ɵComponentType as ComponentType } from '@angular/core';
import { createCustomElement } from '@angular/elements';

export function getComponentDef<T>(component: Type<T>): ComponentDef<T> {
  if ((component as ComponentType<T>).ɵcmp) {
    return (component as ComponentType<T>).ɵcmp;
  } else {
    throw new Error('this is an only ivy feature.');
  }
}

export function registerElement<T>(name: string, component: Type<T>, injector?: Injector, ): void {
  if (!customElements.get(name)) {
    const ngElement = createCustomElement(component, {
      injector: Injector.create({ providers: [], parent: injector || null , name: `${name} injector` })
    });
    customElements.define(name, ngElement);
  }
}
