import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadCssService {

  constructor() {
  }

  loadCss(src) {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(css);
    css.href = src;
  }

  loadScript(src) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    document.getElementsByTagName('body')[0].appendChild(script);
    console.log(src);
  }

}
