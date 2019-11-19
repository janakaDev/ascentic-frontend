import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {MatSort} from '@angular/material';
import {ClothesService} from '../Service/clothes/clothes.service';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {catchError, finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClothsDataSourceService implements DataSource<any> {
  private clothsSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private lengthSubject = new BehaviorSubject<number>(null);
  public length = this.lengthSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  private filter$ = new BehaviorSubject({ criteria: null, searchTerm: null });

  get data(): any[] {
    return this.clothsSubject.value;
  }

  constructor(
    private clothService: ClothesService,
    private sort: MatSort
  ) { }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.clothsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.clothsSubject.complete();
    this.clothsSubject.complete();
  }

  loadCloths(
    pageIndex = 0,
    pageSize = 10
  ) {
    this.loadingSubject.next(true);
    this.clothService
      .getClothesForDataSource( pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((data: any) => {
        this.clothsSubject.next(data);
        this.lengthSubject.next(data.count);
      });
  }
}
