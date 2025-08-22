import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { SubscribeComponent } from './pages/subscribe/subscribe.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { MilkProductComponent  } from './pages/milk-product/milk-product.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'testimonials', component:TestimonialsComponent},
  { path: 'gallery', component:GalleryComponent},
  { path: 'milk-product', component:MilkProductComponent},
];
