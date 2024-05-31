import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewChild, inject } from '@angular/core';
import { Sale } from '../../interfaces/sales.type';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from '../../interfaces/chart.type';
import { InventoriesService } from 'src/app/core/services/inventories.service';
import { Subscription } from 'rxjs';
import { InventoryItem } from '../../interfaces/inventory.type';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnChanges {
  @Input() sales: Sale[] = [];
  @ViewChild("chart", { static: true }) chart?: ChartComponent;
  inventory: InventoryItem[] = []

  inventoryservice = inject(InventoriesService)
  cdr = inject(ChangeDetectorRef)
  subscription: Subscription;

  public chartOptions: Partial<ChartOptions> = {
    chart: {
      type: "bar",
      height: 450
    }
  };

  constructor() {
    this.subscription = this.inventoryservice.getItemObs().subscribe(res => {
      this.inventory = res
      this.updateChartOptions()
    })
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['sales'] && changes['sales'].currentValue) {
      this.updateChartOptions();
    }
  }

  private updateChartOptions() {
    const label: string[] = [];
    const total: number[] = [];
    const colors: string[] = [];

    this.sales.forEach(item => {
      label.push(this.inventory.find(inv => inv.id.includes(item.itemId))?.name!);
      total.push(item.total);
    });

    const minTotalIndex = total.indexOf(Math.min(...total));
    const maxTotalIndex = total.indexOf(Math.max(...total));

    total.forEach((t, index) => {
      if (index === minTotalIndex) {
        colors.push('#FF5733'); // Example color for minimum total
      } else if (index === maxTotalIndex) {
        colors.push('#33FF57'); // Example color for maximum total
      } else {
        colors.push('#337DFF'); // Default color for other bars
      }
    });

    this.chartOptions = {
      series: [
        {
          name: "Total",
          data: total
        }
      ],
      chart: {
        type: "bar",
        height: 450
      },
      plotOptions: {
        bar: {
          horizontal: true,
          colors: {
            ranges: [
              {
                from: -10000,
                to: 10000,
                color: '#337DFF' // Default color for bars
              },
              {
                from: total[minTotalIndex],
                to: total[minTotalIndex],
                color: '#FF5733' // Color for minimum total
              },
              {
                from: total[maxTotalIndex],
                to: total[maxTotalIndex],
                color: '#33FF57' // Color for maximum total
              }
            ]
          }
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: label
      }
    };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
