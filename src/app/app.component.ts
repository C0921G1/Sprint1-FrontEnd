import { Component } from '@angular/core';
import {LoadCssService} from "./loadCss/load-css-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cinema-project';

  // constructor(private loadCssServiceService: LoadCssService) {
  //   this.loadCssServiceService.loadCss("https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap")
  //   this.loadCssServiceService.loadCss("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css")
  //   this.loadCssServiceService.loadCss("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css")
  //   this.loadCssServiceService.loadCss("../../assets/lib/animate/animate.min.css")
  //   this.loadCssServiceService.loadCss("../../assets/lib/owlcarousel/assets/owl.carousel.min.css")
  //   this.loadCssServiceService.loadCss("../../assets/css/bootstrap.min.css")
  //   this.loadCssServiceService.loadCss("../../assets/css/style.css")
  //   this.loadCssServiceService.loadCss("../../assets/css/Custom-style.css")
  //   this.loadCssServiceService.loadScript("../../assets/wow/wow.min.js")
  //   this.loadCssServiceService.loadScript("https://code.jquery.com/jquery-3.4.1.min.js")
  //   this.loadCssServiceService.loadScript("https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js")
  //   this.loadCssServiceService.loadScript("../../assets/lib/waypoints/waypoints.min.js")
  //   this.loadCssServiceService.loadScript("../../assets/lib/counterup/counterup.min.js")
  //   this.loadCssServiceService.loadScript("../../assets/lib/owlcarousel/owl.carousel.min.js")
  //   this.loadCssServiceService.loadScript("../../assets/js/main.js")
  // }

  onActivate(event){
    window.scroll(0,0);
  }
}
