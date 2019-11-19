import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToasterService} from '../../core/Service/toaster/toaster.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ClothesService} from '../../core/Service/clothes/clothes.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-clothsaddedit',
  templateUrl: './clothsaddedit.component.html',
  styleUrls: ['./clothsaddedit.component.scss']
})
export class ClothsaddeditComponent implements OnInit {
  addClothsForm: FormGroup;
  private todaydate: Date;
  private editAccountId: any;
  private editAccountMode: boolean;
  private existingUserAccount: any;
  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private toaster: ToasterService,
    private clothApi: ClothesService,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.addClothsForm = this.formBuilder.group({
      name: ['', Validators.required],
      productCode: ['', Validators.required],
      color: [''],
      size: [''],
      cost: ['',  Validators.required],
      sd: [''],
      brand: ['', Validators.required],
    });

    this.todaydate = new Date();

    this.activeRoute.params.subscribe(
      async (data: any) => {
        if (data.id) {
          this.editAccountMode = true;
          this.editAccountId = data.id;

          try {
            const datas = await this.clothApi.getById(
              this.editAccountId
            );

            this.addClothsForm.setValue({
              name: (datas as any).data[0].productName,
              productCode: (datas as any).data[0].product_code,
              color: (datas as any).data[0].color,
              size: (datas as any).data[0].size,
              cost: (datas as any).data[0].cost,
              sd: (datas as any).data[0].short_description,
              brand: (datas as any).data[0].brand_id
            });
          } catch (error) {
            console.log(error);
            this.toaster.errorToast(error);
          }
        }
      },
      (error: any) => {
        console.log(error);
        this.toaster.errorToast(error);
      });
  }


  addClothItem() {
    if (this.addClothsForm.invalid) {
      this.toaster.errorToast('The Form is invalid');
      return;
    }
    if (this.editAccountMode) {
      if (this.addClothsForm.valid) {
        const dataArray = this.addClothsForm.value;
        dataArray.id = this.editAccountId;

        this.clothApi.updateClothe(dataArray,  this.editAccountId).subscribe(
          (data: any) => {
            this.changeDetectorRefs.detectChanges();
            this.toaster.successToast((data as any).message);
            this.router.navigate(['/news']);
          },
          (error: any) => {
            this.toaster.errorToast(error.error.message);
          }
        );
      }
    } else {
      if (this.addClothsForm.valid) {
        const dataArray = this.addClothsForm.value;

        this.clothApi.createCloth(dataArray).subscribe(
          (data: any) => {
            this.changeDetectorRefs.detectChanges();
            this.toaster.successToast((data as any).message);
            this.router.navigate(['/news']);
          },
          (error: any) => {
            this.toaster.errorToast(error.error.message);
          }
        );
      }
    }
  }
}
