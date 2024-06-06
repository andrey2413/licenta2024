import { CurrencyPipe, NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import { ChartConfiguration, ChartData } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { tap } from "rxjs";
import { CompanyData } from "../shared/models/company-data";
import { CompanyDataService } from "../shared/services/company-data.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgIf,
    BaseChartDirective,
    NgbPagination
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  companyData: Array<CompanyData> = [];
  chartData: ChartData<'bar'> | undefined;
  page: number = 1;
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  constructor(public companyDataService: CompanyDataService) {
  }

  ngOnInit(): void {
    this.getCompanyData(this.page - 1);
  }

  handlePageChange(page: any) {
    this.getCompanyData(page - 1);
  }

  private getCompanyData(page: number) {
    this.companyDataService.getCompanyData(page)
      .pipe(tap((companyData: Array<CompanyData>) => {
        this.chartData = companyData.reduce((chartData: ChartData<'bar'>, company: CompanyData) => {
          chartData.labels?.push(company.shortName);
          chartData.datasets[0].data.push(company.totalCash);
          return chartData;
        }, {labels: [], datasets: [{data: []}]});
      }))
      .subscribe((companyData: Array<CompanyData>) => this.companyData = companyData);
  }
}
