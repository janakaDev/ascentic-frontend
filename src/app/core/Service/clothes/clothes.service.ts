import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as CONST from '../../../../common/Constants';
import { AuthService } from '../auth/auth.service';
import * as rxjs from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClothesService {
  constructor(private http: HttpClient, private auth: AuthService) {
  }
  getClothesForDataSource(
    pageNumber = 0,
    pageSize = 10
  ): rxjs.Observable<any[]> {
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json'
      Authorization: 'Bearer ' + this.auth.currentUserAuthenticationToken$.value
    });
    const options = { headers };

    return this.http
      .post(
        CONST.CLOTH_LIST,
        {
          currentPage: pageNumber.toString(),
          pageSize: pageSize.toString(),
          totalCount: true
        },
        options
      )
      .pipe(
        map((res: any) => {
          res.payload = res;
          let count = 0;
          if (res.payload.data.totalCount === null) {
            count = res.payload.data.count;
          } else {
            count = res.payload.data.count;
          }
          res.payload.data.data.data.count = count;
          return res.payload.data.data.data;
        })
      );
  }

  createCloth(data) {
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json'
      Authorization: 'Bearer ' + this.auth.currentUserAuthenticationToken$.value
    });
    const options = { headers };
    return this.http.post(CONST.CREATE_CLOTH, data, options);
  }

  /**
   * Delete particular news
   * @param  {} id
   */
  deleteItem(id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.auth.currentUserAuthenticationToken$.value
    });
    const options = { headers };
    return this.http.post(CONST.DELETE_ITEM + 'delete/' + id, {}, options);
  }

  /**
   * Delete particular news
   * @param  {} id
   */
  async getById(id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.auth.currentUserAuthenticationToken$.value
    });
    const res = await this.http
      .post(CONST.CLOTH_BYID + id, {}, { headers })
      .toPromise();
    return res;
  }


  /**
   * Delete particular news
   * @param  {} id
   */
   updateClothe(data, id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.auth.currentUserAuthenticationToken$.value
    });
    const options = { headers };
    return this.http.post(CONST.UPDATE_ITEM + id, {data}, options);
  }
}
