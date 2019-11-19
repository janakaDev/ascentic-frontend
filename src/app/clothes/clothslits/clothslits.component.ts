import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ElementRef, Inject
} from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../common/token.service';
import { DatePipe } from '@angular/common';
import { ToasterService } from '../../core/Service/toaster/toaster.service';
import {ClothsDataSourceService} from '../../core/DataSources/cloths-data-source.service';
import {ClothesService} from '../../core/Service/clothes/clothes.service';
import {ConfirmDialogComponent} from '../../components/ConfirmDialogComponent';
import {merge} from 'rxjs/internal/observable/merge';
import {tap} from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-news-list',
  templateUrl: './clothslits.component.html',
  styleUrls: ['./clothslits.component.scss']
})
export class ClothslitsComponent implements OnInit, AfterViewInit {
  initialLength: number;
  cloths: any;
  displayedColumns: string[] = [
    'product_id',
    'name',
    'product_code',
    'cost',
    'selling_price',
    'Brand',
    'color',
    'short_description',
    'Size',
    'actions'
  ];
  listData: ClothsDataSourceService;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  @ViewChild('titleFilter') titleFilter;
  constructor(
    @Inject(Router) private route: Router,
    @Inject(ChangeDetectorRef) private changeDetectorRefs: ChangeDetectorRef,
    @Inject(TokenService) private tokenService: TokenService,
    @Inject(ActivatedRoute) private router: ActivatedRoute,
    @Inject(DatePipe) private datePipe: DatePipe,
    @Inject(ToasterService) private toaster: ToasterService,
    @Inject(ClothesService) private clothsApi: ClothesService,
    @Inject(MatDialog) private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.cloths = this.router.snapshot.data.cloths;
    this.initialLength = this.router.snapshot.data.cloths.count;
    this.listData = new ClothsDataSourceService(this.clothsApi, this.sort);
    this.listData.loadCloths(
      0,
      10
    );
    this.changeDetectorRefs.detectChanges();
  }

  /**
   * delete news
   * @param  {} row
   */
  deleteItem(row) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm deletion',
        message: 'Are you sure you want to delete this item?'
      }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result === 1) {
        try {
          this.clothsApi.deleteItem(row.product_id).subscribe(
            (data: any) => {
              this.loadClothPage();
              this.changeDetectorRefs.detectChanges();
              this.route.navigate(['/clothes']);
              this.toaster.successToast('items Deleted successfully');
            },
            (error: any) => {
              this.route.navigate(['/clothes']);
              this.toaster.errorToast(error.error.message);
            }
          );
        } catch (error) {
          this.toaster.errorToast(error.error.message);
        }
      }
    });
  }


  loadClothPage() {
    this.listData.loadCloths(
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
    this.listData.length.subscribe(data => (this.initialLength = data));
  }

  editItem(row) {
    this.route.navigate(['/clothes/edit', row.product_id]);
  }

  ngAfterViewInit(): void {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          const totalCount = '1';
          this.loadClothPage();
          this.listData.length.subscribe(data => (this.initialLength = data));
        })
      )
      .subscribe();
  }

}

