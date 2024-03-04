import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{

  constructor( 
    private activatedRouter: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router){}

    public country?: Country;

  ngOnInit(): void {

    this.activatedRouter.params.
    pipe(
      switchMap(({id }) => this.countriesService.searchCountryByAlphaCode(id)) // se encarga de filtrar antes
    )
    .subscribe(
      country =>{
        
       if(!country)return this.router.navigateByUrl('')
      
       return this.country = country;
      })

  }


}
