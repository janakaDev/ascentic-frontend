import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../../common/token.service';
import {ClothesService} from '../Service/clothes/clothes.service';

@Injectable()
export class ClothsResolver implements Resolve<any[]> {

  token: any = '';
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private clothService: ClothesService) {
    this.token = tokenService.getToken();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.clothService.getClothesForDataSource(0, 10);
  }

}
